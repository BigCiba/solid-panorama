import { describe, expect, test } from '@jest/globals';
import { parseSolid } from './utils';

describe('CSS Properties', function () {
	test('transform: new CSS properties', function () {
		const result = parseSolid(`
            import { render } from 'solid-panorama-runtime';
            import { createSignal } from 'solid-js';

            function App() {
                const [isVisible, setIsVisible] = createSignal(true);
                const [currentWidth, setCurrentWidth] = createSignal('100px');
                
                return (
                    <Panel 
                        width={currentWidth()}
                        height="200px"
                        flowChildren="down"
                        verticalAlign="center"
                        horizontalAlign="left"
                        align="center center"
                        margin="10px"
                        marginTop="5px"
                        padding="8px"
                        paddingLeft="12px"
                        backgroundImage="file://{images}/bg.png"
                        backgroundColor="#ff0000"
                        washColor="red"
                        opacity="0.8"
                        x="50px"
                        y="100px"
                        zIndex={10}
                        scroll="both"
                        tooltip="This is a tooltip"
                        tooltipPosition="top"
                        visible={isVisible()}
                    >
                        <Label text="Content" />
                    </Panel>
                );
            }
            
            render(() => <App />, $('#app'));
        `);
		expect(result).toMatchSnapshot();
	});

	test('transform: tooltip variations', function () {
		const result = parseSolid(`
            import { render } from 'solid-panorama-runtime';

            function App() {
                return (
                    <>
                        <Panel tooltip="Simple tooltip" />
                        <Panel tooltip={{ title: "Title", text: "Description" }} />
                        <Panel tooltip={{ name: "CustomTooltip", param1: "value1" }} />
                        <Panel titleTooltip={{ title: "Title", text: "Text" }} />
                        <Panel customTooltip={{ name: "MyTooltip", data: "test" }} />
                    </>
                );
            }
            
            render(() => <App />, $('#app'));
        `);
		expect(result).toMatchSnapshot();
	});

	test('transform: CSS properties in static context', function () {
		const result = parseSolid(`
            import { render } from 'solid-panorama-runtime';

            function App() {
                return (
                    <Panel 
                        width="fit-children"
                        height="fill-parent-flow(1.0)"
                        flowChildren="right-wrap"
                        margin="10px 5px"
                        backgroundImage="file://{images}/background.png"
                    >
                        <Label text="Static CSS" />
                    </Panel>
                );
            }
            
            render(() => <App />, $('#app'));
        `);
		expect(result).toMatchSnapshot();
	});
});