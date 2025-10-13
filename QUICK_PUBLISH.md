# 快速发布指南

## babel-plugin-jsx-panorama-expressions

### 🚀 一键发布命令

```bash
# 发布 patch 版本 (0.2.8 -> 0.2.9)
npm run publish:jsx

# 发布 minor 版本 (0.2.8 -> 0.3.0)  
npm run publish:jsx:minor

# 发布 major 版本 (0.2.8 -> 1.0.0)
npm run publish:jsx:major
```

### 📋 发布流程

1. **运行发布脚本** - 自动更新版本、构建、提交代码
2. **GitHub Actions** - 前往 [Actions 页面](https://github.com/RobinCodeX/solid-panorama/actions/workflows/publish-jsx.yml) 手动触发发布
3. **验证发布** - 检查 [npm 包](https://www.npmjs.com/package/babel-plugin-jsx-panorama-expressions) 是否更新

### ⚡ 当前状态

- **当前版本**: 0.2.8
- **包含功能**: 直接CSS属性支持
- **构建状态**: ✅ 已构建

### 📝 版本说明

- **patch**: 修复bug，向后兼容
- **minor**: 新增功能，向后兼容  
- **major**: 重大变更，可能不兼容

---

详细指南请查看 [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md)