# Solid Panorama Copilot Instructions

## Architecture Overview

This is a **monorepo** that brings SolidJS reactive programming to Valve's Panorama UI system for Dota 2 modding. The project consists of 4 core packages that work together:

- **`packages/runtime/`** - Core SolidJS-to-Panorama adapter with custom `createElement` and DOM manipulation
- **`packages/babel-plugin-jsx-panorama-expressions/`** - JSX transformer that converts React-like syntax to Panorama API calls
- **`packages/babel-preset-solid-panorama/`** - Babel preset that configures the JSX plugin with proper settings
- **`packages/panorama-polyfill/`** - Web APIs like `console.log`, `setTimeout` for Panorama environment
- **`packages/panorama-all-in-jsx/`** - Babel macros for embedding XML/CSS directly in JSX files

## Key Concepts

### Panorama API Integration
Unlike web DOM, Panorama uses `$.CreatePanel(type, parent, id, props)`. The runtime's `createElement` optimizes this by:
- Passing parent element directly to reduce API calls
- Auto-applying `SetDisableFocusOnMouseDown(true)` to prevent focus issues
- Supporting all native Panorama elements listed in `packages/babel-plugin-jsx-panorama-expressions/src/panorama_elements.js`

### Custom Properties System
The plugin transforms special props (defined in `packages/babel-plugin-jsx-panorama-expressions/src/props.js`):
- `vars`/`dialogVariables` → `SetDialogVariable*` calls for localization
- `tooltip_text` → Auto-sets mouseover/mouseout tooltip events  
- `custom_tooltip` → Custom tooltip with XML layout
- `attrs` → `SetAttributeString`/`SetAttributeInt` calls
- `data-*` → Stored in `Panel.Data()` for JS object storage
- **CSS Properties** → Direct CSS property support without `style` object:
  - Layout: `width`, `height`, `flowChildren`, `verticalAlign`, `horizontalAlign`, `align`
  - Spacing: `margin*`, `padding*` properties
  - Position: `x`, `y`, `zIndex`
  - Background: `backgroundImage`, `backgroundSize`, `backgroundColor`, `washColor`
  - Visual: `opacity`, `scroll`
  - Enhanced tooltips: `tooltip`, `titleTooltip`, `customTooltip`, `tooltipPosition`

### Style Processing
- **String styles**: Auto-adds semicolons for Panorama compatibility during compilation
- **Object styles**: Number values auto-convert to `px` for properties in `packages/runtime/src/config.ts`
- Both `class` and `className` supported, plus SolidJS `classList` for dynamic classes

## Development Workflows

### Build System (Rollup-based)
```bash
# Build everything
npm run build

# Build specific packages
npm run build:runtime    # solid-panorama-runtime only
npm run build:jsx       # babel-plugin-jsx-panorama-expressions only  
npm run build:macros    # panorama-all-in-jsx only
npm run build:polyfill  # panorama-polyfill only

# Watch mode
npm run watch
```

### Testing
```bash
npm test              # Run Jest snapshot tests
npm run test-update   # Update snapshots
```
See `__tests__/compile.test.ts` for transformation examples.

## Project-Specific Patterns

### Babel Configuration
Always use the preset, not raw plugin:
```js
// babel.config.js
module.exports = {
    presets: [
        ['babel-preset-solid-panorama', {
            moduleName: 'solid-panorama-runtime',
            generate: 'universal'  // Key setting for Panorama
        }]
    ]
};
```

### Text Nodes & Localization
- Text starting with `#` auto-calls `$.Localize(text, panel)`
- Plain text creates `Label` with `html={true}` by default
- HTML strings must be explicit: `{`<strong>text</strong>`}`

### Component Props Handling
Use `splitProps` instead of destructuring to maintain reactivity:
```tsx
// ✅ Correct
function MyButton(props) {
    const [local, others] = splitProps(props, ['class', 'children']);
    return <Button class={local.class + ' MyButtonStyle'} {...others} />;
}

// ❌ Breaks reactivity  
function MyButton({ class: className, ...props }) { }
```

### Drag & Drop Events
Setting `onDragStart` automatically calls `SetDraggable(true)`. Use the pattern:
```tsx
function onItemDragStart(source: Panel, dragCallbacks: IDragCallbacks) {
    // Handle drag logic
}
<Panel onDragStart={onItemDragStart} />
```

### CSS Properties Usage
New direct CSS property support eliminates need for `style` object in many cases:
```tsx
// Direct CSS properties
<Panel 
    width="fit-children"
    height="200px"
    flowChildren="down"
    margin="10px"
    backgroundImage="file://{images}/bg.png"
    tooltip={{ title: "Title", text: "Description" }}
/>

// Still compatible with style object
<Panel width="100px" style={{ color: "white" }}>Content</Panel>
```

## Critical Integration Points

### Runtime Package Structure
- `packages/runtime/src/index.ts` - Main SolidJS renderer creation and `createElement`
- `packages/runtime/src/config.ts` - Style properties that auto-convert to pixels
- `packages/runtime/types/` - TypeScript definitions for all Panorama elements

### Babel Plugin Architecture  
- `packages/babel-plugin-jsx-panorama-expressions/src/shared/transform.js` - Core JSX transformation
- `packages/babel-plugin-jsx-panorama-expressions/src/universal/element.js` - Element creation logic
- `packages/babel-plugin-jsx-panorama-expressions/src/shared/component.js` - Component handling

### Macros for XML/CSS-in-JSX
Use `xml.macro` and `css.macro` from `panorama-all-in-jsx` for compile-time transformations:
```tsx
import xml from 'solid-panorama-all-in-jsx/xml.macro';
import css from 'solid-panorama-all-in-jsx/css.macro';

// Compiles to XML file
xml(<root><snippet name="MySnippet"><Panel /></snippet></root>);

// Compiles to CSS with scoped class names  
const styles = css`
    .my-button { color: red; }
`;
```

## Dependencies & External Context
- Requires `@moddota/panorama-types` for Panorama API types
- Built on `solid-js/universal` renderer for custom environments
- Compatible with `react-panorama` patterns (vars, dialogVariables)
- See [solid-panorama-example](https://github.com/RobinCodeX/solid-panorama-example) for usage patterns