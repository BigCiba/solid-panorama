import { ALL_CSS_PROPERTIES, CSS_INITIALIZABLE_PROPERTIES } from './css-properties.js';

/**
 * custom property only call on setProp
 */
export const CustomProperties = [
    'vars',
    'dialogVariables',
    'ref',
    'tooltip_text',
    'custom_tooltip',
    'custom_tooltip_params',
    'className',
    'classList',
    'enabled',
    'visible',
    'checked',
    'attrs',
    // Import all CSS properties from centralized definition
    ...ALL_CSS_PROPERTIES
];

export const AllowInitializePropperties = [
    'vars',
    'dialogVariables',
    'visible',
    'enabled',
    'checked',
    // Import CSS properties that can be initialized from centralized definition
    ...CSS_INITIALIZABLE_PROPERTIES
];

export const OnlyInitializePureValueProperties = ['visible', 'enabled', 'checked'];
