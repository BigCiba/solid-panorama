# Solid Panorama 本地测试指南

## 方法1：使用 npm link（推荐）

### 步骤1：构建项目
```bash
# 在 solid-panorama 根目录下
npm install
npm run build
```

### 步骤2：为每个包创建链接
```bash
# 进入每个 dist 目录并创建链接
cd dist/runtime
npm link

cd ../babel-plugin-jsx-panorama-expressions  
npm link

cd ../babel-preset-solid-panorama
npm link

cd ../panorama-all-in-jsx
npm link

cd ../solid-panorama-polyfill  
npm link
```

### 步骤3：在测试项目中使用链接
```bash
# 在您的测试项目目录下
npm link solid-panorama-runtime
npm link babel-plugin-jsx-panorama-expressions
npm link babel-preset-solid-panorama
npm link solid-panorama-all-in-jsx
npm link solid-panorama-polyfill
```

## 方法2：使用相对路径引用

在您的测试项目的 `package.json` 中：

```json
{
  "dependencies": {
    "solid-js": "^1.9.5",
    "solid-panorama-runtime": "file:../solid-panorama/dist/runtime",
    "babel-plugin-jsx-panorama-expressions": "file:../solid-panorama/dist/babel-plugin-jsx-panorama-expressions",
    "babel-preset-solid-panorama": "file:../solid-panorama/dist/babel-preset-solid-panorama",
    "solid-panorama-all-in-jsx": "file:../solid-panorama/dist/panorama-all-in-jsx",
    "solid-panorama-polyfill": "file:../solid-panorama/dist/solid-panorama-polyfill"
  }
}
```

然后运行 `npm install`。

## 方法3：使用 PNPM 工作区（如果您使用 pnpm）

在测试项目的根目录创建 `pnpm-workspace.yaml`：

```yaml
packages:
  - .
  - ../solid-panorama/packages/*
```

然后在 `package.json` 中引用：

```json
{
  "dependencies": {
    "solid-panorama-runtime": "workspace:*",
    "babel-plugin-jsx-panorama-expressions": "workspace:*",
    "babel-preset-solid-panorama": "workspace:*"
  }
}
```

## 方法4：使用开发脚本自动化

创建一个开发脚本来自动化这个过程：

### 在 solid-panorama 根目录创建 `scripts/link-local.js`：

```javascript
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const packages = [
    'runtime',
    'babel-plugin-jsx-panorama-expressions', 
    'babel-preset-solid-panorama',
    'panorama-all-in-jsx',
    'solid-panorama-polyfill'
];

console.log('🔨 Building packages...');
execSync('npm run build', { stdio: 'inherit' });

console.log('🔗 Creating npm links...');
packages.forEach(pkg => {
    const distPath = path.join(__dirname, '..', 'dist', pkg);
    if (fs.existsSync(distPath)) {
        console.log(`Linking ${pkg}...`);
        execSync('npm link', { cwd: distPath, stdio: 'inherit' });
    }
});

console.log('✅ All packages linked! Use "npm link <package-name>" in your test project.');
```

### 添加到 package.json 的 scripts：

```json
{
  "scripts": {
    "link-local": "node scripts/link-local.js",
    "unlink-local": "npm unlink -g solid-panorama-runtime babel-plugin-jsx-panorama-expressions babel-preset-solid-panorama solid-panorama-all-in-jsx solid-panorama-polyfill"
  }
}
```

## 方法5：使用 Verdaccio（本地 npm registry）

如果您需要模拟完整的 npm 发布流程：

### 1. 安装 Verdaccio
```bash
npm install -g verdaccio
```

### 2. 启动本地 registry
```bash
verdaccio
```

### 3. 配置 npm 指向本地 registry
```bash
npm set registry http://localhost:4873
```

### 4. 发布到本地 registry
```bash
npm run build
cd dist/runtime && npm publish
cd ../babel-plugin-jsx-panorama-expressions && npm publish
# ... 对每个包重复
```

## 实时开发工作流

对于持续开发，建议使用以下工作流：

### 1. 使用 watch 模式
```bash
# 在 solid-panorama 目录
npm run watch
```

### 2. 结合 npm link 使用
一旦建立了链接，watch 模式的更改会自动反映到链接的项目中。

## 测试新增 CSS 属性

创建一个测试文件来验证新的 CSS 属性：

### test-project/src/TestCSS.tsx
```tsx
import { render } from 'solid-panorama-runtime';
import { createSignal } from 'solid-js';

function TestCSS() {
    const [width, setWidth] = createSignal('100px');
    
    return (
        <Panel 
            width={width()}
            height="200px"
            flowChildren="down"
            verticalAlign="center"
            margin="10px"
            padding="8px"
            backgroundImage="file://{images}/bg.png"
            backgroundColor="#ff0000"
            opacity="0.8"
            tooltip={{ title: "测试", text: "新的CSS属性" }}
            onClick={() => setWidth('200px')}
        >
            <Label text="点击改变宽度" />
        </Panel>
    );
}

render(() => <TestCSS />, $('#root'));
```

### babel.config.js
```javascript
module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        [
            'babel-preset-solid-panorama',
            {
                moduleName: 'solid-panorama-runtime',
                generate: 'universal'
            }
        ]
    ],
    plugins: ['@babel/plugin-transform-typescript']
};
```

## 故障排除

### 常见问题：

1. **链接失败**: 确保 `npm run build` 成功完成
2. **类型错误**: 确保安装了 `@moddota/panorama-types`
3. **模块未找到**: 检查 babel 配置是否正确
4. **属性不生效**: 确保新属性已正确添加到 CustomProperties 数组

### 调试技巧：

1. 使用 `npm ls` 检查链接状态
2. 检查编译后的 JavaScript 代码
3. 在浏览器开发工具中验证属性是否正确应用

## 清理

当测试完成后，清理链接：

```bash
# 在测试项目中
npm unlink solid-panorama-runtime babel-plugin-jsx-panorama-expressions babel-preset-solid-panorama

# 在 solid-panorama 目录中  
npm run unlink-local  # 如果您创建了这个脚本
```

推荐使用**方法1（npm link）**，因为它最简单且最符合 npm 生态系统的标准做法。