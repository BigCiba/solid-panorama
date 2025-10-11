# 新增CSS属性使用指南

本次更新添加了对Panorama UI中常用CSS属性的直接支持，无需再手动在`style`对象中设置这些属性。

## 支持的CSS属性

### 布局属性
```tsx
<Panel 
    width="100px" | "fit-children" | "fill-parent-flow(1.0)" | "height-percentage(50%)"
    height="200px" | "fit-children" | "fill-parent-flow(1.0)" | "width-percentage(50%)"
    flowChildren="down" | "right" | "right-wrap" | "down-wrap" | "left" | "left-wrap" | "up" | "up-wrap" | "none"
    verticalAlign="top" | "bottom" | "middle" | "center"
    horizontalAlign="left" | "right" | "middle" | "center"
    align="center center" | "left top" | "right bottom" // 等等组合
/>
```

### 间距属性
```tsx
<Panel 
    margin="10px"
    marginTop="5px"
    marginLeft="8px"
    marginBottom="12px"
    marginRight="6px"
    
    padding="8px"
    paddingTop="4px"
    paddingLeft="6px"
    paddingBottom="10px"
    paddingRight="2px"
/>
```

### 位置属性
```tsx
<Panel 
    x="50px"
    y="100px"
    zIndex={10}
/>
```

### 背景属性
```tsx
<Panel 
    backgroundImage="file://{images}/background.png"
    backgroundSize="cover"
    backgroundColor="#ff0000"
    washColor="red"
/>
```

### 视觉属性
```tsx
<Panel 
    opacity="0.8"
    scroll="both" | "x" | "y"
/>
```

### 增强的Tooltip属性
```tsx
// 简单文本tooltip
<Panel tooltip="这是一个提示" />

// 标题+内容tooltip
<Panel tooltip={{ title: "标题", text: "详细说明" }} />

// 自定义tooltip
<Panel tooltip={{ name: "CustomTooltip", param1: "value1", param2: "value2" }} />

// 或者使用专门的属性
<Panel titleTooltip={{ title: "标题", text: "说明" }} />
<Panel customTooltip={{ name: "MyTooltip", data: "test" }} />
<Panel tooltipPosition="top" />
```

## 与现有`style`属性的关系

新的CSS属性和现有的`style`属性可以同时使用：

```tsx
<Panel 
    width="100px"           // 新的直接属性
    height="200px"          // 新的直接属性
    style={{                // 现有的style对象
        color: "white",
        fontSize: "14px"
    }}
>
    内容
</Panel>
```

## 响应式支持

新属性完全支持SolidJS的响应式系统：

```tsx
function MyComponent() {
    const [width, setWidth] = createSignal("100px");
    const [isVertical, setIsVertical] = createSignal(false);
    
    return (
        <Panel 
            width={width()}
            flowChildren={isVertical() ? "down" : "right"}
            onClick={() => setWidth("200px")}
        >
            点击改变宽度
        </Panel>
    );
}
```

## 自动类型转换

部分数值属性会自动转换为px单位：

```tsx
<Panel 
    width={100}          // 自动转换为 "100px"
    margin={10}          // 自动转换为 "10px"
    x={50}              // 自动转换为 "50px"
/>
```

受支持的自动px转换属性包括：x, y, width, height, margin系列, padding系列等。

## 注意事项

1. 新属性通过`setProp`机制处理，确保正确的响应式更新
2. 某些属性（如tooltip相关）有特殊的处理逻辑
3. 所有新属性都支持在元素创建时初始化
4. 与现有的`style`属性兼容，可以混合使用