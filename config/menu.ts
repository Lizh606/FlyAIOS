
import { 
  Layout, 
  Activity, 
  FileText, 
  ShoppingBag,
  Cpu,
  Boxes,
  Zap,
  ShieldCheck,
  Store,
  Webhook
} from 'lucide-react';

export const NAV_GROUPS = (t: any) => [
  {
    title: t('nav.group.ops'), // 现场运营
    icon: Layout,
    items: [
      { icon: Layout, label: t('nav.projects'), path: '/' },
      { icon: Activity, label: t('nav.executions'), path: '/executions' },
    ]
  },
  {
    title: t('nav.group.build'), // 编排与构建
    icon: Zap,
    items: [
      { icon: Zap, label: t('nav.workflows'), path: '/workflows' },
      { icon: FileText, label: t('nav.deployments'), path: '/deployments' },
    ]
  },
  {
    title: t('nav.group.data'), // 证据链数据
    icon: FileText,
    items: [
      { icon: FileText, label: t('nav.runs'), path: '/runs' },
    ]
  },
  {
    title: t('nav.group.assets'), // 物理资产
    icon: ShieldCheck,
    items: [
      { icon: Cpu, label: t('nav.devices'), path: '/devices' },
      { icon: Boxes, label: t('nav.docks'), path: '/docks' },
    ]
  },
  {
    title: t('nav.group.market'), // 应用与集成
    icon: Store,
    items: [
      { icon: ShoppingBag, label: t('nav.marketplace'), path: '/marketplace' },
      { icon: Webhook, label: t('nav.integrations'), path: '/integrations' },
    ]
  }
];
