/**
 * Panorama CSS Properties Configuration for Babel Plugin
 * 
 * This file defines all supported CSS properties for the babel plugin.
 * It mirrors the definitions in runtime but uses JavaScript for babel compatibility.
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
	'customTooltip',
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