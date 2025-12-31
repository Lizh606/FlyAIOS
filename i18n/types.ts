
export type Language = 'zh' | 'en';

export interface TranslationModule {
  [key: string]: {
    [key in Language]: string;
  };
}
