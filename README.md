# FlyAIOS

FlyAIOS 是一个面向无人机机场与任务执行的专业级前端控制台原型，覆盖项目管理、任务执行监控、工作流编排、部署管理、运行审计、设备与机场资产管理、应用市场与外部集成等全链路能力。整体 UI 风格参考 DroneDeploy 的行业标准视觉规范，并内置完整的设计系统与多语言支持。

## 亮点功能

- 项目与任务：项目列表、任务编排入口、任务执行历史回放。
- 执行监控：执行列表、实时状态与告警、执行详情与分析工作台。
- 工作流编排：模板库、行业筛选、工作流 Studio（节点检查、观察面板、被引用追踪）。
- 部署管理：部署列表、策略预览、节点覆盖、回滚与状态追踪。
- 证据链与运行记录：运行列表、审计与产物概览、运行详情。
- 资产管理：无人机设备、机场设施（Dock）与状态监控。
- 应用与集成：AI 应用中心、安装/更新流程、外部系统连接与交付记录。

## 技术栈

- React 18 + TypeScript
- Vite 6
- React Router（HashRouter）
- Ant Design 5（自定义主题）
- Tailwind（CDN 运行时配置）
- Lucide Icons、Day.js

## 快速开始

**前置条件**：Node.js 18+

1. 安装依赖：
   `npm install`
2. （可选）在 `.env.local` 中配置 `GEMINI_API_KEY`：
   `GEMINI_API_KEY=your_key`
3. 启动开发环境：
   `npm run dev`

默认访问：`http://localhost:4000`

## 常用脚本

- `npm run dev`：启动本地开发
- `npm run build`：构建生产包
- `npm run preview`：预览生产构建

## Docker 部署

项目提供了基于 Nginx 的静态部署镜像与 `docker-compose` 的两种使用方式。

### 方式一：直接构建镜像并运行

```bash
docker build -t flyaios .
docker run --rm -p 4000:80 flyaios
```

访问：`http://localhost:4000`

### 方式二：使用 docker-compose（两种模式）

1) 构建镜像并运行（build profile）
```bash
docker compose --profile build up --build
```

2) 复用本地 `dist` 静态文件（dist profile）
```bash
npm run build
docker compose --profile dist up
```

访问：`http://localhost:4000`

## 项目结构概览

```
.
├── index.html
├── index.tsx                # 历史/兼容入口
├── src
│   ├── main.tsx             # Vite 应用入口
│   ├── app                  # 主路由与应用 Shell
│   ├── layouts              # 布局与骨架
│   ├── pages                # 业务页面
│   ├── features             # 页面级功能模块
│   ├── ui                   # 通用 UI 组件
│   ├── shared               # 共享类型、mock、主题 token
│   ├── services             # 数据服务层（当前为 mock/本地）
│   ├── design-system        # 设计系统与 Ant Design 主题映射
│   ├── i18n                 # 多语言资源与 Provider
│   ├── config               # 导航配置与路由组织
│   └── styles               # 全局样式与 Tailwind 注入
├── vite.config.ts
├── tsconfig.json
└── Dockerfile
```

## 路由速览

应用使用 HashRouter，实际 URL 形态为 `/#/path`。

- `/`：项目管理
- `/project/:id/missions`：任务指挥台
- `/executions`：执行监视列表
- `/execution/:id`：任务回放（Playback）
- `/execution/:id/analysis`：执行分析/监控工作台
- `/workflows`：工作流模板库
- `/workflows/:id`：工作流 Studio
- `/deployments`：部署列表
- `/deployment/:id`：部署详情
- `/runs`：运行记录
- `/run/:id`：运行详情
- `/devices`：设备管理
- `/docks`：机场设施
- `/marketplace`：应用中心
- `/integrations`：外部集成

## 设计系统与主题

- `design-system/tokens.css` 提供全局 CSS 变量（颜色、排版、圆角、阴影）。
- `design-system/antdTheme.ts` 将设计变量映射到 Ant Design 主题。
- `index.html` 中配置 Tailwind runtime tokens，保证 UI 组件与设计系统一致。

## 多语言

默认中文，支持中英文切换。翻译资源集中在 `i18n/modules/`，通过 `I18nProvider` 暴露 `t()` API。

## 数据与 Mock

当前数据主要来自 `shared/mocks/` 与 `services/api.ts`，便于快速构建 UI 与交互原型。接入真实后端时，建议替换 `services/` 数据源与页面内 mock 依赖。

## 开发提示

- UI 入口为 `src/main.tsx` + `src/app/App.tsx`。
- 主题切换通过 `data-theme="dark"` 控制，`FAAppShell` 会监听并同步 Ant Design 主题。
- 项目仍保留部分早期原型（`src/` 目录），如需精简可另行清理。
