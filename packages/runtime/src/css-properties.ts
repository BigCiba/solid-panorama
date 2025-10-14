/**
 * Panorama CSS Properties Configuration
 *
 * The grouped lists below keep runtime property handling, type definitions,
 * and documentation in sync. Each category mirrors the way Panorama CSS
 * organizes layout, visuals, interaction, and motion.
 */

// Layout & Flow
const LAYOUT_PROPERTIES = [
	'width',
	'height',
	'minWidth',
	'minHeight',
	'maxWidth',
	'maxHeight',
	'flowChildren',
	'verticalAlign',
	'horizontalAlign',
	'align',
	'ignoreParentFlow',
	'layoutPosition',
	'overflow',
	'perspective',
	'perspectiveOrigin'
];

// Spacing (Margin & Padding)
const SPACING_PROPERTIES = [
	'margin',
	'marginTop',
	'marginLeft',
	'marginBottom',
	'marginRight',
	'padding',
	'paddingTop',
	'paddingLeft',
	'paddingBottom',
	'paddingRight'
];

// Border & Outline
const BORDER_PROPERTIES = [
	'border',
	'borderBottom',
	'borderBottomColor',
	'borderBottomLeftRadius',
	'borderBottomRightRadius',
	'borderBottomStyle',
	'borderBottomWidth',
	'borderBrush',
	'borderColor',
	'borderLeft',
	'borderLeftColor',
	'borderLeftStyle',
	'borderLeftWidth',
	'borderRadius',
	'borderRight',
	'borderRightColor',
	'borderRightStyle',
	'borderRightWidth',
	'borderStyle',
	'borderTop',
	'borderTopColor',
	'borderTopLeftRadius',
	'borderTopRightRadius',
	'borderTopStyle',
	'borderTopWidth',
	'borderWidth'
];

// Typography
const TYPOGRAPHY_PROPERTIES = [
	'font',
	'fontFamily',
	'fontSize',
	'fontStretch',
	'fontStyle',
	'fontWeight',
	'color',
	'letter-spacing',
	'lineHeight',
	'textAlign',
	'textDecoration',
	'textDecorationStyle',
	'textOverflow',
	'textShadow',
	'textTransform'
];

// Background & Texture
const BACKGROUND_PROPERTIES = [
	'backgroundBlur',
	'backgroundColor',
	'backgroundColorOpacity',
	'backgroundImage',
	'backgroundImageOpacity',
	'backgroundPosition',
	'backgroundRepeat',
	'backgroundSize',
	'backgroundTextureSize'
];

// Visual Effects & Filters
const VISUAL_PROPERTIES = [
	'opacity',
	'opacityBrush',
	'opacityMask',
	'opacityMaskPosition',
	'opacityMaskScale',
	'brightness',
	'hueRotation',
	'washColor',
	'blur',
	'boxShadow',
	'imgShadow',
	'preTransformRotate2d',
	'preTransformScale2d',
	'saturation',
	'textureSampling',
	'uiScale',
	'uiScaleX',
	'uiScaleY',
	'uiScaleZ',
	'visibility',
	'whiteSpace',
	'worldBlur'
];

// Audio & Interaction Feedback
const INTERACTION_PROPERTIES = [
	'sound',
	'soundOut'
];

// Positioning
const POSITION_PROPERTIES = [
	'x',
	'y',
	'zIndex',
	'position'
];

// Transformations
const TRANSFORM_PROPERTIES = [
	'transform',
	'transformOrigin'
];

// Transitions
const TRANSITION_PROPERTIES = [
	'transition',
	'transitionDelay',
	'transitionDuration',
	'transitionHighFramerate',
	'transitionProperty',
	'transitionTimingFunction'
];

// Animations
const ANIMATION_PROPERTIES = [
	'animation',
	'animationDelay',
	'animationDirection',
	'animationDuration',
	'animationFillMode',
	'animationIterationCount',
	'animationName',
	'animationTimingFunction'
];

// Tooltip layout helper properties
const TOOLTIP_POSITION_PROPERTIES = [
	'tooltipPosition',
	'tooltipArrowPosition',
	'tooltipBodyPosition'
];

// All CSS Style Properties (excluding scroll and enhanced tooltip logic)
export const CSS_STYLE_PROPERTIES = [
	...LAYOUT_PROPERTIES,
	...SPACING_PROPERTIES,
	...BORDER_PROPERTIES,
	...TYPOGRAPHY_PROPERTIES,
	...BACKGROUND_PROPERTIES,
	...VISUAL_PROPERTIES,
	...INTERACTION_PROPERTIES,
	...POSITION_PROPERTIES,
	...TRANSFORM_PROPERTIES,
	...TRANSITION_PROPERTIES,
	...ANIMATION_PROPERTIES,
	...TOOLTIP_POSITION_PROPERTIES
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