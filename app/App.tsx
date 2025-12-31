
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getAntdTheme } from '../design-system/antdTheme';
import { I18nProvider } from '../i18n';
import FAAppShell from '../layouts/FAAppShell';

// Pages
import ProjectsPage from '../pages/ProjectsPage';
import MissionControlPage from '../pages/MissionControlPage';
import ExecutionsListPage from '../pages/Executions/ListPage';
import ExecutionDetailPage from '../pages/Executions/DetailPage';
import MarketplacePage from '../pages/MarketplacePage';
import TemplatesPage from '../pages/Workflows/TemplatesPage';
import WorkflowStudioPage from '../pages/Workflows/WorkflowStudioPage';
import DeploymentsListPage from '../pages/Deployments/ListPage';
import DeploymentDetailPage from '../pages/Deployments/DetailPage';
import DevicesPage from '../pages/DevicesPage';
import DocksPage from '../pages/DocksPage';
import RunsListPage from '../pages/Runs/List';
import RunDetailPage from '../pages/Runs/Detail';
import IntegrationsPage from '../pages/Integrations/index';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={getAntdTheme()}>
      <I18nProvider>
        <HashRouter>
          <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-page animate-pulse">Loading...</div>}>
            <Routes>
              {/* 1. Immersive Full-Screen Pages (No Shell) */}
              <Route path="/workflows/:id" element={<WorkflowStudioPage />} />

              {/* 2. Standard Shell Pages */}
              <Route path="*" element={
                <FAAppShell>
                  <Routes>
                    <Route path="/" element={<ProjectsPage />} />
                    <Route path="/executions" element={<ExecutionsListPage />} />
                    <Route path="/execution/:id" element={<ExecutionDetailPage />} />
                    <Route path="/project/:id/missions" element={<MissionControlPage />} />
                    <Route path="/workflows" element={<TemplatesPage />} />
                    <Route path="/deployments" element={<DeploymentsListPage />} />
                    <Route path="/deployment/:id" element={<DeploymentDetailPage />} />
                    <Route path="/runs" element={<RunsListPage />} />
                    <Route path="/run/:id" element={<RunDetailPage />} />
                    <Route path="/devices" element={<DevicesPage />} />
                    <Route path="/docks" element={<DocksPage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/integrations" element={<IntegrationsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </FAAppShell>
              } />
            </Routes>
          </Suspense>
        </HashRouter>
      </I18nProvider>
    </ConfigProvider>
  );
};

export default App;
