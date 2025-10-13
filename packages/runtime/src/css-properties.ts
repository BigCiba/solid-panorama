/**
 * Panorama CSS Properties Configuration
 * 
 * This file defines all supported CSS properties for solid-panorama runtime.
 * These properties can be used directly as JSX attributes and will be 
 * automatically converted to appropriate Panorama API calls.
 */

// All CSS Style Properties (excluding scroll and tooltip)
export const CSS_STYLE_PROPERTIES = [
	// Layout Properties
	'width',
	'height',
	'flowChildren',
	'verticalAlign',
	'horizontalAlign',
	'align',

	// Margin Properties
	'margin',
	'marginTop',
	'marginLeft',
	'marginBottom',
	'marginRight',

	// Padding Properties
	'padding',
	'paddingTop',
	'paddingLeft',
	'paddingBottom',
	'paddingRight',

	// Background Properties
	'backgroundImage',
	'backgroundSize',
	'backgroundColor',
	'washColor',

	// Visual Properties
	'opacity',

	// Position Properties
	'x',
	'y',
	'zIndex',

	'tooltipPosition'
];

// Scroll Properties (handled specially)
export const CSS_SCROLL_PROPERTIES = [
	'scroll'
];

// Enhanced Tooltip Properties
export const CSS_TOOLTIP_PROPERTIES = [
	'tooltip',
	'titleTooltip',
	'customTooltip'
];



// All CSS properties (including special ones)
export const ALL_CSS_PROPERTIES = [
	...CSS_STYLE_PROPERTIES,
	...CSS_SCROLL_PROPERTIES,
	...CSS_TOOLTIP_PROPERTIES
];

// Properties that can be initialized during element creation
export const CSS_INITIALIZABLE_PROPERTIES = [
	...CSS_STYLE_PROPERTIES,
	...CSS_SCROLL_PROPERTIES
];

/**
 * Check if a property name is a CSS style property
 * @param propertyName The property name to check
 * @returns True if it's a CSS style property
 */
export function isCSSStyleProperty(propertyName: string): boolean {
	return CSS_STYLE_PROPERTIES.includes(propertyName);
}

/**
 * Check if a property name is a CSS scroll property
 * @param propertyName The property name to check
 * @returns True if it's a scroll property
 */
export function isCSSScrollProperty(propertyName: string): boolean {
	return CSS_SCROLL_PROPERTIES.includes(propertyName);
}

/**
 * Check if a property name is a CSS tooltip property
 * @param propertyName The property name to check
 * @returns True if it's a tooltip property
 */
export function isCSSTooltipProperty(propertyName: string): boolean {
	return CSS_TOOLTIP_PROPERTIES.includes(propertyName);
}

/**
 * Check if a property name is any CSS property
 * @param propertyName The property name to check
 * @returns True if it's any CSS property
 */
export function isCSSProperty(propertyName: string): boolean {
	return ALL_CSS_PROPERTIES.includes(propertyName);
}

/**
 * Handle CSS tooltip properties in setProperty
 * @param node The panel node
 * @param name The property name
 * @param value The property value
 * @param setTooltipText Function to set text tooltip
 * @param setCustomTooltip Function to set custom tooltip
 * @param setCustomTooltipParams Function to set tooltip params
 * @returns True if the property was handled
 */
export function handleCSSTooltipProperty(
	node: Panel,
	name: string,
	value: any,
	setTooltipText: (node: Panel, text: string) => void,
	setCustomTooltip: (node: Panel, args: [string, string]) => void,
	setCustomTooltipParams: (node: Panel, params: Record<string, string | number>) => void
): boolean {
	if (name === 'tooltip') {
		// Handle tooltip property with auto-detection
		if (typeof value === 'string') {
			setTooltipText(node, value);
		} else if (value && typeof value === 'object') {
			if (value.name) {
				// Custom tooltip
				setCustomTooltip(node, [value.name, value.name]);
				if (Object.keys(value).length > 1) {
					const params = { ...value };
					delete params.name;
					setCustomTooltipParams(node, params);
				}
			} else if (value.title || value.text) {
				// Title tooltip - combine title and text
				const tooltipText = value.title ? (value.text ? `${value.title}\n${value.text}` : value.title) : value.text;
				setTooltipText(node, tooltipText);
			}
		}
		return true;
	} else if (name === 'titleTooltip') {
		// Handle title tooltip
		if (value && typeof value === 'object' && (value.title || value.text)) {
			const tooltipText = value.title ? (value.text ? `${value.title}\n${value.text}` : value.title) : value.text;
			setTooltipText(node, tooltipText);
		}
		return true;
	} else if (name === 'customTooltip') {
		// Handle custom tooltip
		if (value && typeof value === 'object' && value.name) {
			setCustomTooltip(node, [value.name, value.name]);
			const params = { ...value };
			delete params.name;
			if (Object.keys(params).length > 0) {
				setCustomTooltipParams(node, params);
			}
		}
		return true;
	}
	return false;
}