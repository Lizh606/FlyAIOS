
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getAntdTheme } from './design-system/antdTheme';
import ProjectsPage from './pages/ProjectsPage';
import MissionControlPage from './pages/MissionControlPage';
import ExecutionPlaybackPage from './pages/ExecutionPlaybackPage';
import ExecutionsListPage from './pages/ExecutionsListPage';
import FAAppShell from './layouts/FAAppShell';
import { I18nProvider } from './i18n';

// Root App component using standard React Router v6 components
const App: React.FC = () => {
  return (
    <ConfigProvider theme={getAntdTheme()}>
      <I18nProvider>
        <HashRouter>
          <FAAppShell>
            <Routes>
              <Route path="/" element={<ProjectsPage />} />
              <Route path="/project/:id/missions" element={<MissionControlPage />} />
              <Route path="/project/history/:id" element={<ExecutionsListPage />} />
              <Route path="/execution/:id" element={<ExecutionPlaybackPage />} />
            </Routes>
          </FAAppShell>
        </HashRouter>
      </I18nProvider>
    </ConfigProvider>
  );
};

export default App;
