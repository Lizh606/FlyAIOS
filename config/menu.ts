
import { 
  Layout, 
  Activity, 
  FileText, 
  GitBranch, 
  Calendar, 
  ShoppingBag,
  Cpu,
  Boxes,
  Settings,
  HelpCircle,
  LogOut,
  Webhook,
  Briefcase,
  Zap,
  ShieldCheck,
  Store
} from 'lucide-react';

export const NAV_GROUPS = (t: any) => [
  {
    title: t('nav.group.ops'),
    icon: Briefcase,
    items: [
      { icon: Layout, label: t('nav.projects'), path: '/' },
      { icon: Activity, label: t('nav.executions'), path: '/executions' },
    ]
  },
  {
    title: t('nav.group.automation'),
    icon: Zap,
    items: [
      { icon: GitBranch, label: t('nav.workflows'), path: '/workflows' },
      { icon: Calendar, label: t('nav.deployments'), path: '/deployments' },
      { icon: FileText, label: t('nav.runs'), path: '/runs' },
    ]
  },
  {
    title: t('nav.group.assets'),
    icon: ShieldCheck,
    items: [
      { icon: Cpu, label: t('nav.devices'), path: '/devices' },
      { icon: Boxes, label: t('nav.docks'), path: '/docks' },
    ]
  },
  {
    title: t('nav.group.market'),
    icon: Store,
    items: [
      { icon: ShoppingBag, label: t('nav.marketplace'), path: '/marketplace' },
      { icon: Webhook, label: t('nav.integrations'), path: '/integrations' },
    ]
  }
];

export const BOTTOM_ITEMS = (t: any, onSettings: () => void) => [
  { icon: Settings, label: t('nav.settings'), action: onSettings },
  { icon: HelpCircle, label: t('nav.help'), path: '/help' },
  { icon: LogOut, label: t('nav.logout'), path: '/logout' },
];
