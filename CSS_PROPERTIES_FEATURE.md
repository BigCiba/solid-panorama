# CSS Properties Feature Update

## 功能概述

新增了直接CSS属性支持功能，允许开发者在JSX中直接使用CSS属性作为元素属性，而无需将它们包装在`style`对象中。

## 主要改进

### 1. 直接CSS属性语法
```jsx
// 之前需要使用 style 对象
<Panel style={{
    width: "200px",
    height: "100px",
    flowChildren: "down",
    margin: "10px"
}} />

// 现在可以直接使用CSS属性
<Panel 
    width="200px"
    height="100px"
    flowChildren="down"
    margin="10px"
/>
```

### 2. 支持的CSS属性分类

#### 布局属性
- `width`, `height` - 元素尺寸
- `flowChildren` - 子元素布局方向
- `verticalAlign`, `horizontalAlign`, `align` - 对齐方式

#### 间距属性
- `margin`, `marginTop`, `marginLeft`, `marginBottom`, `marginRight`
- `padding`, `paddingTop`, `paddingLeft`, `paddingBottom`, `paddingRight`

#### 背景属性
- `backgroundImage`, `backgroundSize`, `backgroundColor`, `washColor`

#### 定位属性
- `x`, `y`, `zIndex`

#### 视觉属性
- `opacity`

#### 滚动属性
- `scroll`

#### 增强工具提示属性
- `tooltip` - 智能工具提示（支持字符串或对象）
- `titleTooltip` - 标题样式工具提示
- `customTooltip` - 自定义XML布局工具提示
- `tooltipPosition` - 工具提示位置

### 3. 增强的工具提示功能

#### 简单文本工具提示
```jsx
<Button tooltip="这是一个按钮">点击我</Button>
```

#### 带标题的工具提示
```jsx
<Button tooltip={{ title: "按钮标题", text: "详细描述" }}>
    点击我
</Button>
```

#### 自定义XML工具提示
```jsx
<Panel customTooltip={{ name: "ItemTooltip", itemId: "item_001" }} />
```

## 技术实现

### 1. 架构重构
- 创建了 `css-properties.ts` 和 `css-properties.js` 文件来集中管理CSS属性定义
- 重构了 `setProperty` 方法使用统一的属性检查函数
- 优化了babel插件的属性处理逻辑

### 2. 文件结构
```
packages/
├── runtime/src/
│   ├── css-properties.ts     # TypeScript CSS属性定义
│   └── index.ts             # 重构后的运行时
└── babel-plugin-jsx-panorama-expressions/src/
    ├── css-properties.js    # JavaScript CSS属性定义
    └── props.js            # 更新的babel插件配置
```

### 3. 核心功能函数
- `isCSSStyleProperty()` - 检查是否为CSS样式属性
- `isCSSScrollProperty()` - 检查是否为滚动属性
- `isCSSTooltipProperty()` - 检查是否为工具提示属性
- `handleCSSTooltipProperty()` - 处理复杂工具提示逻辑

## 兼容性

### 向后兼容
- 完全兼容现有的 `style` 对象语法
- 不会破坏任何现有代码
- 可以混合使用直接CSS属性和style对象

### 类型安全
- 完整的TypeScript类型定义
- 编译时类型检查
- IntelliSense支持

## 使用建议

### 推荐用法
```jsx
// ✅ 推荐：直接使用CSS属性，代码更清晰
<Panel 
    width="fit-children"
    height="200px"
    flowChildren="down"
    margin="10px"
    tooltip={{ title: "面板", text: "这是一个面板" }}
/>
```

### 混合使用
```jsx
// ✅ 支持：混合使用直接属性和style对象
<Panel 
    width="200px"
    height="100px"
    style={{ color: "white", fontSize: "16px" }}
/>
```

## 性能优化

- 使用数组查找进行属性类型检查
- 集中化的属性定义减少重复代码
- 优化的babel编译时处理

## 未来规划

- 考虑使用 `Set` 数据结构优化属性检查性能
- 进一步完善TypeScript类型定义
- 添加更多CSS属性支持
- 性能基准测试和优化

## 迁移指南

现有项目无需修改任何代码，新功能完全向后兼容。如果希望使用新的直接CSS属性语法，可以逐步迁移：

1. 将简单的style对象属性改为直接属性
2. 利用新的工具提示增强功能
3. 保持复杂样式仍使用style对象

这次更新大幅提升了开发体验，使得CSS属性的使用更加直观和高效。