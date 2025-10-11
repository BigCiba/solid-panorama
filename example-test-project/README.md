# Example Test Project for Solid Panorama

这是一个用于测试 solid-panorama 本地开发的示例项目。

## 使用方法

### 1. 构建 solid-panorama（在主项目目录）
```bash
cd ../  # 回到 solid-panorama 根目录
npm install
npm run build
```

### 2. 安装测试项目依赖
```bash
npm install
```

### 3. 构建测试项目
```bash
npm run build
```

### 4. 检查输出
构建完成后，检查 `dist/index.js` 文件，确认新的CSS属性被正确转换。

## 测试的新功能

这个示例项目测试了以下新增的CSS属性：

- ✅ `width`, `height` - 布局尺寸
- ✅ `flowChildren` - 子元素排列方式  
- ✅ `verticalAlign`, `horizontalAlign` - 对齐方式
- ✅ `margin`, `padding` - 间距属性
- ✅ `backgroundImage`, `backgroundColor` - 背景属性
- ✅ `opacity` - 透明度
- ✅ `x`, `y` - 位置属性
- ✅ `scroll` - 滚动设置
- ✅ `tooltip` - 增强的tooltip属性
- ✅ `titleTooltip` - 标题样式tooltip

## 预期的编译输出

新的CSS属性应该通过 `setProp` 调用来设置，而不是直接在创建元素时传递。

## 故障排除

如果遇到模块找不到的错误：

1. 确保 solid-panorama 已经构建：`npm run build`
2. 确保依赖正确安装：`npm install`
3. 检查 `babel.config.js` 配置是否正确
4. 查看编译后的输出文件确认转换是否正确