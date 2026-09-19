
import React from 'react';
import { 
  Zap, 
  ShieldAlert, 
  Clock, 
  Fingerprint, 
  Settings, 
  Video 
} from 'lucide-react';
import { ServiceItem, ContactInfo, Language, CartItem, Product } from './types';

export const getServices = (lang: Language): ServiceItem[] => {
  if (lang === 'zh') {
    return [
      {
        id: 'wiring',
        title: '电气接线',
        description: '在槟城和北赖提供专业的住宅和工业接线方案。',
        icon: 'zap',
        details: ['新安装项目', '故障排除', '配电箱 (DB) 升级', '灯光与插座安装']
      },
      {
        id: 'cctv',
        title: 'CCTV 与报警系统',
        description: '通过高清监控和智能报警系统保护您的财产。',
        icon: 'video',
        details: ['高清/IP 监控系统', '智能安全报警', '远程监控', '系统维护']
      },
      {
        id: 'hr-attendance',
        title: 'HR 考勤系统',
        description: '现代 HR 管理系统，高效跟踪员工出勤情况。',
        icon: 'clock',
        details: ['云端解决方案', '薪资集成', '实时报告', '移动跟踪']
      },
      {
        id: 'biometric',
        title: '生物识别门禁',
        description: '使用先进的生物识别门禁控制系统确保您的场所安全。',
        icon: 'fingerprint',
        details: ['指纹扫描仪', '面部识别', '读卡门禁', '门禁联动']
      },
      {
        id: 'autogate',
        title: '自动门方案',
        description: '为住宅和工厂提供可靠耐用的自动门系统。',
        icon: 'settings',
        details: ['平开臂系统', '平移门电机', '维修与服务', '备用电池安装']
      }
    ];
  }
  return [
    {
      id: 'wiring',
      title: 'Electrical Wiring',
      description: 'Expert residential and industrial wiring solutions in Penang & Prai.',
      icon: 'zap',
      details: ['New Installation', 'Troubleshooting', 'DB Box Upgrade', 'Lighting & Power Points']
    },
    {
      id: 'cctv',
      title: 'CCTV & Alarms',
      description: 'Protect your property with high-definition surveillance and smart alarm systems.',
      icon: 'video',
      details: ['HD/IP CCTV Systems', 'Smart Security Alarms', 'Remote Monitoring', 'System Maintenance']
    },
    {
      id: 'hr-attendance',
      title: 'HR Attendance',
      description: 'Modern HR management systems for tracking staff attendance efficiently.',
      icon: 'clock',
      details: ['Cloud-based Solutions', 'Payroll Integration', 'Real-time Reporting', 'Mobile Tracking']
    },
    {
      id: 'biometric',
      title: 'Biometric Access',
      description: 'Secure your premises with advanced biometric door access control systems.',
      icon: 'fingerprint',
      details: ['Fingerprint Scanners', 'Face Recognition', 'Card Access Systems', 'Door Interlock']
    },
    {
      id: 'autogate',
      title: 'Autogate Solutions',
      description: 'Reliable and durable automatic gate systems for homes and factories.',
      icon: 'settings',
      details: ['Swing Arm Systems', 'Sliding Gate Motors', 'Repair & Service', 'Backup Battery Installation']
    }
  ];
};

export const CONTACT: ContactInfo = {
  phone: ['04-5880616', '017-5162938'],
  address: 'Penang / Prai Region, Malaysia',
  blog: 'https://hdcctvs.blogspot.com/',
  facebook: 'https://www.facebook.com/myintsolutions',
  youtube: 'http://youtube.com/@Penangcctvguy'
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ds-k1t323-face-recognition',
    name: 'DS-k1T323 Series Face Recognition Terminal',
    price: 460.00,
    description: '2.4" LCD Touchscreen Display. IP65 Weatherproof Rating. Fast & Secure Face Recognition. Fingerprint & Mifare Card Support. Reliable Value Series Performance.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXdozt9DTR9JkbDAUH1LeVCRgiChbrxEJuVFljPbkPsIJz1u2Ikg8Psb8cva4NzRrCGx-PF0I3OtAV0H-z7PBT3X11NhO6R3L0xU8H1IEJL6Pi8FwoHH5DlqihKf62cq2HLsIEJ2TYEJ_WcFxNpEQqAq5apvquJth8HIc4dK9IaCa6aSHs_pHNR-_CVUk/s1280-rw/maxresdefault.jpg'
  }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'zap': return <Zap className="w-8 h-8 text-cyan-600" />;
    case 'video': return <Video className="w-8 h-8 text-cyan-600" />;
    case 'clock': return <Clock className="w-8 h-8 text-cyan-600" />;
    case 'fingerprint': return <Fingerprint className="w-8 h-8 text-cyan-600" />;
    case 'settings': return <Settings className="w-8 h-8 text-cyan-600" />;
    default: return <ShieldAlert className="w-8 h-8 text-cyan-600" />;
  }
};

export interface GalleryBannerImage {
  src: string;
  title?: string;
  caption?: string;
  link?: string;
  hidden?: boolean;
}

export const GALLERY_BANNER_IMAGES: GalleryBannerImage[] = [
  {
    src: '/images/Caltex station surveillance system.WEBP.webp',
    title: 'Caltex Lunas CCTV & Surveillance',
    caption: 'Full multi-camera deployment & remote live-view monitoring complete',
    link: '#projects'
  },
  {
    src: '/images/caltex stations electrical works.png',
    title: 'Industrial Electrical Installation',
    caption: 'Sub-switchboard rewiring and compliant industrial distribution works',
    link: '#projects'
  },
  {
    src: '/images/Hikvision Biometric access control system.jpg',
    title: 'Hikvision Biometric Access Control',
    caption: 'Secure multi-door facial recognition & time attendance deployment',
    link: '#projects'
  },
  {
    src: '/images/dcmoto.webp',
    title: 'Autogate Automation Solutions',
    caption: 'Heavy-duty DCMoto gate motor and backup battery installation',
    link: '#projects'
  }
];
