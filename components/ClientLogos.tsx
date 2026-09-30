import React from 'react';

interface ClientLogo {
  alt: string;
  src: string;
}

const clientLogos: ClientLogo[] = [
  {
    alt: 'Uni Klinik',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFGtb85P8N7jty4AG_eNZVXbgS0Fxi9ouZW8nZFuzdKvUqjbX3wKBlfvowhWgfD0rtHzGjkP6MIqueyIBxSylaYijr8mOmfp3xuPRteE0_qCyVkjJumyKfFidGbAeTNheSJ-4wB5MWgFL_mIAoFLj_Qss5Kp2bFwTq9Q19UrbTVp4xUB7VEMm6JrWVOX0/s320/logo-uniklinik.webp',
  },
  {
    alt: 'Main Client',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMytUVG9pVgOVkDVBACXB8cD_qZFLW3dj9ViVvpRoMvKy6V-WlIzEbIRhG7TrXHEmTjEvBBxprRI2b740BBxUWplQyyU5VEJQq94_4Cs6afzaGjtdczzYf-QxN7wxVK0rZFAKYTMA1YWKzoq4hiFRrBYiYgRJZOw6nBnUjCSnBX-OUmiwnPyppWyj89RE/s320/Logo-Main.png',
  },
  {
    alt: 'Inno Logo Green',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAZev7AqPr709Ux-MP5bTa_p_6C295qgXmdDDaPfEYrKogw2YjLsnZAu9jnhw7rZXpBjFzLEVlhDBCvQl_oFUgHGjY1P7Ze2qK16E9Y-sJ80t6ByDBzfdTNfcoxG8tQL7OodctNIXEmpRE8sM1nY3wAZdDH1vpFINW42lFjfuayJxm-oBaqFAADv2srts/s320/INNO-LOGO-GREEN.png',
  },
  {
    alt: 'Client 4',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2OPPRJciBWyqYCm1klmjOup8nucmG3BDbKjTCNx2hoBrKVtNUhwJ8Eux8DGVu8kwEKr0WBzlTYaLnW3XGvcHEUqkUxNzSAToMAy4QNGxoMiGKbIBGLhhfSrcQUXEDTLZqCcYDNEZlnDhnrGgJxi7nGxRn27_oUsaWLGbVh3qoivpum7Z-WA3Vzd5eo8k/s320/images.png',
  },
  {
    alt: 'Client 5',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijWCateL4YnZjHo3OcFNGN5Uy2ZOiUlcfx3XczJ9nDMfeiZwisJKfYt9Do6vc6cgXgR8pzlka7sTnL1EA-0S2_sY_72w9b3C9SZzecE9LwYr7majek9uac9_k7JeBTdeI5sPGsdkJpq8TdJUEFRLGeW8H2NhrL9eTvkx7nxlEm1P3iZAw6wIHU6OeN2W0/s320/images.jpg',
  },
  {
    alt: 'Wonway Cleanroom Solution Partner',
    src: '/images/cropped-Wonway-300px-1-300x101.png',
  },
  {
    alt: 'Client 7',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHqyVn5Yay6dtFk6LZXavZxZRGpng-6moKTWNyL285oYaD0AfR42xmMkssL2otRKEW7FmMF7MCw3tOXnX01Oq1P5wOPAMYNIDQEWgHNo-sxcD1TuoiPN3j0sXYCew5hvWJp7OdxDn_v84dOz5o2yV8K1XIkwRMtvQoACTooCDEQboJQ6oEEmAmRKw0qfg/s1600/images%20(2).png',
  },
  {
    alt: 'TOC Client',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimPXezRnJQzk3MmrxVIPRcRXSdzscyqQWB_kKfGHS5BKLOjjQn6n86XvDiSOXcao7xJjV043XjE9coH5b1RbvsK_q8WqG5_sBvGPXtK6dIjSDPyVx5X0lKzGKNSgmaJU5TPK1TN7f6Ievebd_lELFLHCN3zGENsAz7mZPmVsPz8CLH0rFcnI6JVsha2-s/s1600/toc.jpg',
  },
  {
    alt: 'Client 9',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrXGsENwXzRCDfITpVVITusRstiskCk82etdLeGfTwcx0VMbbW67TUN6yE2yhgEdEBlQTG8HtjCpa6amANvrzX9FDLvpoDFRpwpCqWJyFLnefNjTcCPVHrLK38YaSwhMRBb6Z5oJ_YHM0beKriJXw265NZMF2JrrT3JYTXw8Yj5FQ7QssVkm-hd3klPRs/s1600/images%20(3).png',
  },
  {
    alt: 'Pen Petroleum',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhErpFWo2C8hvXIiAYbn4xTOTolALipX2hLH5g0LMtq6JwblhmA5CidOrBTNqRb3GQ_o9mcY_yPldlmPc5wjzH1HW9ZrbXvzuKYX8V15m0rmFdgwOc22xT_bpmFuybJYBIuqRmc8m2C1GEbImn14UBHjj_Wq4LCfvmUUpZpQXJ7jjPWSdRBrMV-llGfOhE/s1600/penpetroluem.jpg',
  },
  {
    alt: 'Client 11',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7QKw050zjCTCGYehtkAii4mGPZ6yq8x1tDUbN6iUDSnn-JiF7Aex-Bkr8KdDeLbkqI7QYBTFTKGoXqaKANhDR5A8WD9JbOazywbDJoZISNyeU8-qW1eHc7S7AE1cwux1cnaXKzlPMHVXlcoJejDzQW8cRINdh1NZMDKtEN26v06AvaHVbzMkcTWqIx7U/s1600/images%20(4).png',
  },
  {
    alt: 'Pillar Clean Safety Frontier',
    src: '/images/Nippon-Pillar-Social-1.webp',
  },
  {
    alt: 'Client 13',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjsiIz99D3Jpn2rDV28ReWgA2wkrL4Q_hQtSPxNVWNIIjTu2Ey3R2RUP5CKVuMlY-21Zn81N_u2B8PbpnOOEvdpT6SIS3NuTxUwYMOnKNvzR54TeNe69YGSQcA_UH0pBa-JMd5Vz5kxDzcp-CepGGTyYnbDmlYRzQK7YvFtg_8NYVh_lkStZDh92eZRd8/s1600/images%20(1).jpg',
  },
  {
    alt: 'Client 14',
    src: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCvzv9wFmxJvxJ8iWnjA4LVLoGbZ_rKd1tbF2x2Fy39FDni6DHTAjxhJ6EDMixUTP2527eSBV-L9OYCyoRK8m9MaEhZdMB0EdS9qJPppTOWi3VRi4-9dy1Pxe07fYXDZx2zQNG_6wi2CIVwI4VHPch8NReFM7mVBndu8tUmT0zTyvqlcYtRdBxpE0Lc28/s1600/images%20(5).png',
  },
  {
    alt: 'Client 15',
    src: '/images/images (2).jpg',
  },
  {
    alt: 'Client 16',
    src: '/images/images.jpg',
  },
  {
    alt: 'Client 17',
    src: '/images/images (1).jpg',
  },
  {
    alt: 'Client 18',
    src: '/images/279903880_1457550891364789_8008919804337999575_n.jpg',
  },
];

export const ClientLogos: React.FC = () => {
  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-2xl font-bold text-gray-800 mb-8 tracking-tight">
          Our Trusted Clients
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="p-3 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-w-full h-auto max-h-[100px] object-contain transition-transform duration-200 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
