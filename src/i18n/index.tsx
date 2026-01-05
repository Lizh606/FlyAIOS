
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from './types';
import { common } from './modules/common';
import { nav } from './modules/nav';
import { status } from './modules/status';
import { projects } from './modules/projects';
import { mission } from './modules/mission';
import { playback } from './modules/playback';
import { settings } from './modules/settings';
import { history } from './modules/history';
import { marketplace } from './modules/marketplace';
import { workflows } from './modules/workflows';
import { deployments } from './modules/deployments';
import { devices } from './modules/devices';
import { docks } from './modules/docks';
import { executions } from './modules/executions';
import { runs } from './modules/runs';
import { integrations } from './modules/integrations';

const translations = {
  ...common,
  ...nav,
  ...status,
  ...projects,
  ...mission,
  ...playback,
  ...settings,
  ...history,
  ...marketplace,
  ...workflows,
  ...deployments,
  ...devices,
  ...docks,
  ...executions,
  ...runs,
  ...integrations,
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('zh');

  const t = (key: string, params?: Record<string, any>) => {
    let text = (translations as any)[key]?.[lang] || key;
    if (params) {
      Object.keys(params).forEach((p) => {
        text = text.replace(`{${p}}`, params[p]);
      });
    }
    return text;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
