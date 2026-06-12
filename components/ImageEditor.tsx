
import React, { useState, useRef } from 'react';
import { Upload, Wand2, RefreshCw, Download, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { editImage } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

const ImageEditor: React.FC = () => {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setImage(readerEvent.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    setError(null);
    try {
      const editedImageUrl = await editImage(prompt, image, mimeType);
      setResult(editedImageUrl);
    } catch (err) {
      setError(t.aiEditor.error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = 'pakmike-edited-image.png';
    link.click();
  };

  return (
    <section id="ai-editor" className="py-24 bg-blue-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-3">{t.aiEditor.badge}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.aiEditor.title}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.aiEditor.description}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-blue-200/50 border border-blue-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Upload Area */}
            <div className="p-8 border-r border-gray-100">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all aspect-square flex flex-col items-center justify-center gap-4 ${image ? 'border-cyan-200 bg-gray-50' : 'border-gray-200 hover:border-cyan-400 bg-gray-50/50'}`}
              >
                {image ? (
                  <img src={image} alt="Original" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="text-cyan-600" size={28} />
                    </div>
                    <p className="text-gray-500 font-medium">{t.aiEditor.uploadLabel}</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            </div>

            {/* Prompt Area */}
            <div className="p-8 flex flex-col justify-center">
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-tight">{t.aiEditor.promptLabel}</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t.aiEditor.placeholder}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:bg-white outline-none transition-all resize-none h-32"
                />
              </div>

              <button 
                onClick={handleEdit}
                disabled={!image || !prompt || loading}
                className="w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-200 disabled:bg-gray-200 disabled:shadow-none"
              >
                {loading ? <RefreshCw className="animate-spin" /> : <Wand2 size={20} />}
                {loading ? t.aiEditor.btnLoading : t.aiEditor.btnAction}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Result Area */}
          {result && (
            <div className="p-8 bg-cyan-50 border-t border-cyan-100 animate-in zoom-in-95 duration-500">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
                <h4 className="text-xl font-bold text-cyan-900 flex items-center gap-2">
                  <ImageIcon size={24} />
                  {t.aiEditor.resultTitle}
                </h4>
                <button 
                  onClick={downloadImage}
                  className="px-6 py-2 bg-white text-cyan-600 border border-cyan-200 rounded-xl font-bold flex items-center gap-2 hover:bg-cyan-100 transition-all"
                >
                  <Download size={18} />
                  {t.aiEditor.download}
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={result} alt="Edited Result" className="w-full max-h-[600px] object-contain" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageEditor;
