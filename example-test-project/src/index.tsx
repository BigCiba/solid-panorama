import { createSignal } from 'solid-js';
import { render } from 'solid-panorama-runtime';

function TestNewCSSProperties() {
	const [width, setWidth] = createSignal('100px');
	const [isVertical, setIsVertical] = createSignal(false);
	const [bgColor, setBgColor] = createSignal('#ff0000');

	return (
		<Panel
			width={width()}
			height="300px"
			flowChildren={isVertical() ? "down" : "right"}
			verticalAlign="center"
			horizontalAlign="left"
			margin="20px"
			padding="15px"
			backgroundImage="file://{images}/background.png"
			backgroundColor={bgColor()}
			opacity="0.9"
			x="50px"
			y="100px"
			scroll="both"
			tooltip={{
				title: "测试新属性",
				text: "这个Panel使用了新的CSS属性支持"
			}}
			style={{
				border: "1px solid white",
				borderRadius: "8px"
			}}
		>
			<Label
				text="新CSS属性测试"
				style={{ color: "white", fontSize: "18px" }}
			/>

			<Button
				text="切换宽度"
				margin="10px 0"
				onClick={() => setWidth(width() === '100px' ? '200px' : '100px')}
			/>

			<Button
				text="切换布局"
				margin="5px 0"
				onClick={() => setIsVertical(!isVertical())}
			/>

			<Button
				text="改变背景色"
				margin="5px 0"
				onClick={() => setBgColor(bgColor() === '#ff0000' ? '#00ff00' : '#ff0000')}
			/>

			<Panel
				width="150px"
				height="100px"
				margin="10px"
				padding="8px"
				backgroundColor="#333333"
				tooltip="嵌套Panel示例"
				titleTooltip={{
					title: "嵌套Panel",
					text: "这是一个嵌套的Panel，展示了新的tooltip属性"
				}}
			>
				<Label
					text="嵌套内容"
					style={{ color: "#ffffff" }}
				/>
			</Panel>
		</Panel>
	);
}

function App() {
	return (
		<Panel>
			<TestNewCSSProperties />
		</Panel>
	);
}

// 假设在Panorama环境中有 $('#app') 元素
render(() => <App />, $('#app') as Panel);