# 发布 babel-plugin-jsx-panorama-expressions 指南

## 发布方式

### 方式1：使用 GitHub Actions（推荐）

这个项目已经配置了自动化发布工作流，这是最安全和便捷的发布方式。

#### 步骤：

1. **更新版本号**
   ```bash
   # 进入包目录
   cd packages/babel-plugin-jsx-panorama-expressions
   
   # 更新版本号（patch/minor/major）
   npm version patch  # 例如：0.2.8 -> 0.2.9
   npm version minor  # 例如：0.2.8 -> 0.3.0  
   npm version major  # 例如：0.2.8 -> 1.0.0
   ```

2. **提交更改**
   ```bash
   # 回到根目录
   cd ../../
   
   # 提交版本更新
   git add .
   git commit -m "chore: bump babel-plugin-jsx-panorama-expressions to v0.2.9"
   git push origin main
   ```

3. **触发发布**
   - 前往 GitHub 仓库页面
   - 点击 `Actions` 标签
   - 选择 `Publish babel-plugin-jsx-panorama-expressions` 工作流
   - 点击 `Run workflow` 按钮
   - 点击绿色的 `Run workflow` 确认

4. **验证发布**
   - 等待工作流完成（通常1-2分钟）
   - 检查 [npm 包页面](https://www.npmjs.com/package/babel-plugin-jsx-panorama-expressions) 确认新版本已发布

### 方式2：本地手动发布

如果需要本地发布，可以按照以下步骤：

#### 前提条件：
- 需要有 npm 账号并且是包的维护者
- 已登录 npm：`npm login`

#### 步骤：

1. **构建包**
   ```bash
   # 在项目根目录
   pnpm build:jsx
   ```

2. **更新版本**
   ```bash
   cd packages/babel-plugin-jsx-panorama-expressions
   npm version patch  # 或 minor/major
   ```

3. **发布**
   ```bash
   cd ../../
   npm publish dist/babel-plugin-jsx-panorama-expressions --access public
   ```

## 发布前检查清单

- [ ] 代码已经过充分测试
- [ ] 运行 `pnpm test` 确保所有测试通过
- [ ] 运行 `pnpm build:jsx` 确保构建成功
- [ ] 更新了相关文档（如有API变更）
- [ ] 版本号已正确更新
- [ ] CHANGELOG.md 已更新（如果有的话）

## 版本号管理

遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **PATCH** (0.2.8 -> 0.2.9): 修复bug，向后兼容
- **MINOR** (0.2.8 -> 0.3.0): 新增功能，向后兼容
- **MAJOR** (0.2.8 -> 1.0.0): 重大变更，可能不向后兼容

## 当前包信息

- **包名**: `babel-plugin-jsx-panorama-expressions`
- **当前版本**: `0.2.8`
- **发布地址**: https://www.npmjs.com/package/babel-plugin-jsx-panorama-expressions
- **仓库地址**: https://github.com/RobinCodeX/solid-panorama

## 发布后操作

1. **验证发布**
   ```bash
   npm view babel-plugin-jsx-panorama-expressions version
   ```

2. **测试安装**
   ```bash
   npm install babel-plugin-jsx-panorama-expressions@latest
   ```

3. **更新其他包**
   如果其他包依赖这个包，需要更新依赖版本

4. **发布公告**
   - 在 GitHub 创建 Release
   - 更新相关文档
   - 通知社区（如果有的话）

## 故障排除

### 发布失败常见原因：

1. **权限问题**
   - 确保有发布权限
   - 检查 NPM_AUTOMATION_TOKEN 是否配置正确

2. **版本冲突**
   - 版本号已存在，需要更新版本号

3. **构建失败**
   - 检查代码是否有语法错误
   - 确保所有依赖已安装

4. **网络问题**
   - 检查网络连接
   - 尝试使用不同的 npm registry

### 回滚发布

如果发布有问题，可以使用 npm unpublish（但有时间限制）：
```bash
npm unpublish babel-plugin-jsx-panorama-expressions@版本号 --force
```

**注意**: npm unpublish 有严格限制，建议发布前仔细测试。

## 最佳实践

1. **总是在发布前测试**
2. **使用 GitHub Actions 自动发布**
3. **保持版本号的语义化**
4. **及时更新文档**
5. **发布后验证功能**

这个指南应该能帮助你安全、顺利地发布 babel-plugin-jsx-panorama-expressions 包。