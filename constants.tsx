
import React from 'react';
import { 
  Zap, 
  ShieldAlert, 
  Clock, 
  Fingerprint, 
  Settings, 
  Video 
} from 'lucide-react';
import { ServiceItem, ContactInfo, Language } from './types';

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
  youtube: 'https://www.youtube.com/@Penangthecctvguy'
};

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
