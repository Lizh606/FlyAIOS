
/**
 * FlyAIOS Link Builders
 * 严格遵守 v0.2 联动规则表
 */

export const links = {
  // 1. 现场执行 (Operations)
  execution: (id: string, tab: 'overview' | 'live' | 'automation' = 'overview') => 
    `/execution/${id}?tab=${tab}`,
  executions: (filters?: { projectId?: string; deviceId?: string; status?: string }) => {
    const params = new URLSearchParams(filters as any).toString();
    return `/executions${params ? `?${params}` : ''}`;
  },
  
  // 2. 自动化运行 (Automation / Evidence Chain)
  run: (id: string) => `/run/${id}`,
  runs: (filters?: { 
    workflowId?: string; 
    version?: string; 
    deploymentId?: string; 
    executionId?: string;
    appId?: string;
  }) => {
    const params = new URLSearchParams(filters as any).toString();
    return `/runs${params ? `?${params}` : ''}`;
  },

  // 3. 编排与部署 (Build)
  workflow: (id: string, mode: 'edit' | 'observe' = 'edit') => 
    `/workflows/${id}?mode=${mode}`,
  deployment: (id: string) => `/deployments/${id}`,
  
  // 4. 项目与资产
  project: (id: string) => `/project/${id}/missions`,
  projects: () => '/',
  
  // 5. 应用与集成
  marketplace: () => '/marketplace',
  appDetail: (appId: string) => `/marketplace?appId=${appId}`
};
