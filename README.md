# JS Practice

基于 pnpm 的 TypeScript + Vite Monorepo 项目

## 项目结构

```
js-prac/
├── packages/
│   └── app/           # 示例 Vite 应用
│       ├── src/
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── package.json       # 根 package.json
├── pnpm-workspace.yaml
├── tsconfig.json      # 全局 TypeScript 配置
└── .gitignore

```

## 技术栈

- **包管理器**: pnpm (workspace)
- **语言**: TypeScript
- **构建工具**: Vite
- **架构**: Monorepo

## 快速开始

### 安装依赖

\`\`\`bash
pnpm install
\`\`\`

### 开发模式

运行所有包的开发服务器：

\`\`\`bash
pnpm dev
\`\`\`

运行特定包：

\`\`\`bash
pnpm --filter @js-prac/app dev
\`\`\`

### 构建

\`\`\`bash
pnpm build
\`\`\`

### 清理

\`\`\`bash
pnpm clean
\`\`\`

## 添加新的包

1. 在 `packages/` 目录下创建新包
2. 添加 `package.json` 文件
3. 运行 `pnpm install`

### 添加 Vue 应用

\`\`\`bash
pnpm create vite packages/vue-app -- --template vue-ts
\`\`\`

### 添加 React 应用

\`\`\`bash
pnpm create vite packages/react-app -- --template react-ts
\`\`\`

### 添加共享包

\`\`\`bash
mkdir -p packages/shared/src
cd packages/shared
pnpm init
\`\`\`

## 工作空间命令

- 查看所有包: `pnpm list --depth 0`
- 在特定包中运行命令: `pnpm --filter <package-name> <command>`
- 添加依赖到特定包: `pnpm --filter <package-name> add <package>`
- 添加开发依赖: `pnpm --filter <package-name> add -D <package>`

## License

MIT
