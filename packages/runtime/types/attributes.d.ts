type TooltipContent = {
    title?: string;
    text?: string;
    name?: string;
} & Record<string, string | number | undefined>;

type TooltipDefinition = string | TooltipContent;

type CustomTooltipContent = { name: string; } & Record<string, string | number | undefined>;

declare interface PanelAttributes<T extends PanelBase = Panel> {
    /**
     * Auto call SetDialogVariable on string,
     * SetDialogVariableInt on number,
     * SetDialogVariableTime on Date,
     * SetDialogVariableLocString on string start with `#`
     */
    vars?: Record<string, string | number | Date>;
    /**
     * Auto call SetDialogVariable on string,
     * SetDialogVariableInt on number,
     * SetDialogVariableTime on Date,
     * SetDialogVariableLocString on string start with `#`
     */
    dialogVariables?: Record<string, string | number | Date>;

    /**
     * Auto call SetAttributeString on string,
     * SetAttributeInt on number
     */
    attrs?: Record<string, string | number>;

    snippet?: string;

    id?: string;
    class?: string;
    className?: string;
    classList?: Record<string, boolean>;
    style?: Partial<PanelStyle>;
    hittest?: boolean;
    hittestchildren?: boolean;
    acceptsfocus?: boolean;
    tabindex?: number | 'auto';
    inputnamespace?: string;
    draggable?: boolean;
    enabled?: boolean;
    visible?: boolean;
    checked?: boolean;
    useglobalcontext?: boolean;
    disallowedstyleflags?: string;
    'never-cache-composition-layer'?: boolean;
    'always-cache-composition-layer'?: boolean;
    'require-composition-layer'?: boolean;
    registerforreadyevents?: boolean;
    readyfordisplay?: boolean;
    clipaftertransform?: boolean;
    rememberchildfocus?: boolean;
    keepscrolltobottom?: boolean;
    sendchildscrolledintoviewevents?: boolean;
    'overscroll-x'?: number;
    'overscroll-y'?: number;
    scrollparenttofitwhenfocused?: boolean;
    acceptsinput?: boolean;
    analogstickscroll?: boolean;
    childfocusonhover?: boolean;
    focusonhover?: boolean;
    mousecanactivate?: 'unfocused' | 'iffocused' | 'ifparentfocused(<parentid>)' | string;
    defaultfocus?: string;
    selectionposboundary?: 'both' | 'vertical' | 'horizontal' | string;

    // Layout & Flow
    width?: "fit-children" | `fill-parent-flow(${number})` | `height-percentage(${number}%)` | `${number}px` | `${number}%` | number | string;
    height?: "fit-children" | `fill-parent-flow(${number})` | `width-percentage(${number}%)` | `${number}px` | `${number}%` | number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    flowChildren?: "right" | "right-wrap" | "down" | "down-wrap" | "left" | "left-wrap" | "up" | "up-wrap" | "none";
    verticalAlign?: "top" | "bottom" | "middle" | "center";
    horizontalAlign?: "left" | "right" | "middle" | "center";
    align?: string;
    ignoreParentFlow?: boolean | string;
    layoutPosition?: string;
    overflow?: string;
    perspective?: number | string;
    perspectiveOrigin?: string;

    // Spacing
    margin?: number | string;
    marginTop?: number | string;
    marginLeft?: number | string;
    marginBottom?: number | string;
    marginRight?: number | string;
    padding?: number | string;
    paddingTop?: number | string;
    paddingLeft?: number | string;
    paddingBottom?: number | string;
    paddingRight?: number | string;

    // Border & Outline
    border?: number | string;
    borderBottom?: number | string;
    borderBottomColor?: string;
    borderBottomLeftRadius?: number | string;
    borderBottomRightRadius?: number | string;
    borderBottomStyle?: string;
    borderBottomWidth?: number | string;
    borderBrush?: string;
    borderColor?: string;
    borderLeft?: number | string;
    borderLeftColor?: string;
    borderLeftStyle?: string;
    borderLeftWidth?: number | string;
    borderRadius?: number | string;
    borderRight?: number | string;
    borderRightColor?: string;
    borderRightStyle?: string;
    borderRightWidth?: number | string;
    borderStyle?: string;
    borderTop?: number | string;
    borderTopColor?: string;
    borderTopLeftRadius?: number | string;
    borderTopRightRadius?: number | string;
    borderTopStyle?: string;
    borderTopWidth?: number | string;
    borderWidth?: number | string;

    // Typography
    font?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontStretch?: string;
    fontStyle?: string;
    fontWeight?: number | string;
    color?: string;
    'letter-spacing'?: number | string;
    lineHeight?: number | string;
    textAlign?: string;
    textDecoration?: string;
    textDecorationStyle?: string;
    textOverflow?: string;
    textShadow?: string;
    textTransform?: string;

    // Background & Texture
    backgroundBlur?: number | string;
    backgroundColor?: string;
    backgroundColorOpacity?: number | string;
    backgroundImage?: string;
    backgroundImageOpacity?: number | string;
    backgroundPosition?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
    backgroundTextureSize?: string;

    // Visual Effects & Filters
    opacity?: number | string;
    opacityBrush?: string;
    opacityMask?: string;
    opacityMaskPosition?: string;
    opacityMaskScale?: number | string;
    brightness?: number | string;
    hueRotation?: number | string;
    washColor?: string;
    blur?: number | string;
    boxShadow?: string;
    imgShadow?: string;
    preTransformRotate2d?: string;
    preTransformScale2d?: string;
    saturation?: number | string;
    textureSampling?: string;
    uiScale?: number | string;
    uiScaleX?: number | string;
    uiScaleY?: number | string;
    uiScaleZ?: number | string;
    visibility?: string;
    whiteSpace?: string;
    worldBlur?: number | string;

    // Audio & Interaction Feedback
    sound?: string;
    soundOut?: string;

    // Position & Transform
    x?: number | string;
    y?: number | string;
    zIndex?: number | string;
    position?: string;
    transform?: string;
    transformOrigin?: string;

    // Motion (Transitions & Animations)
    transition?: string;
    transitionDelay?: string;
    transitionDuration?: string;
    transitionHighFramerate?: boolean | string;
    transitionProperty?: string;
    transitionTimingFunction?: string;
    animation?: string;
    animationDelay?: string;
    animationDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    animationDuration?: string;
    animationFillMode?: "none" | "forwards" | "backwards" | "both";
    animationIterationCount?: number | "infinite";
    animationName?: string;
    animationTimingFunction?: string;

    // Enhanced Tooltip Properties
    tooltip?: TooltipDefinition;
    titleTooltip?: TooltipContent;
    customTooltip?: CustomTooltipContent;
    tooltipPosition?: string;
    tooltipArrowPosition?: string;
    tooltipBodyPosition?: string;

    // Scroll Properties
    scroll?: "x" | "y" | "both";

    ref?: T | ((element: T) => void);

    // tooltip
    tooltip_text?: string;
    /**
     * [tooltip name, xml file path]
     */
    custom_tooltip?: [string, string];
    custom_tooltip_params?: Record<string, string | number>;

    onpanelevent?: string | EventHandler<T>;
    onload?: string | EventHandler<T>;
    onfocus?: string | EventHandler<T>;
    onactivate?: string | EventHandler<T>;
    onmouseactivate?: string | EventHandler<T>;
    ondblclick?: string | EventHandler<T>;
    oncontextmenu?: string | EventHandler<T>;
    onmouseover?: string | EventHandler<T>;
    onmouseout?: string | EventHandler<T>;
    onmovedown?: string | EventHandler<T>;
    onmoveleft?: string | EventHandler<T>;
    onmoveright?: string | EventHandler<T>;
    onmoveup?: string | EventHandler<T>;
    oncancel?: string | EventHandler<T>;
    ontabforward?: string | EventHandler<T>;
    ondescendantfocus?: string | EventHandler<T>;
    onblur?: string | EventHandler<T>;
    ondescendantblur?: EventHandler<T>;
    ontabbackward?: EventHandler<T>;
    onscrolledtobottom?: EventHandler<T>;
    onscrolledtorightedge?: EventHandler<T>;
    onselect?: EventHandler<T>;
    ondeselect?: EventHandler<T>;
    ontooltiploaded?: string | EventHandler<T>;

    // custom events
    onDragStart?: (source: Panel, dragCallbacks: IDragCallbacks) => void;
    onDragEnd?: (source: Panel, draggedPanel: Panel) => void;
    onDragEnter?: (source: Panel, draggedPanel: Panel) => void;
    onDragDrop?: (source: Panel, draggedPanel: Panel) => void;
    onDragLeave?: (source: Panel, draggedPanel: Panel) => void;
}

declare interface IDragCallbacks {
    displayPanel: Panel;
    offsetX: number;
    offsetY: number;
}

declare interface LabelLikeAttributes<T extends Panel>
    extends PanelAttributes<T> {
    text?: string | number;
    html?: boolean;
}

declare interface LabelAttributes extends LabelLikeAttributes<LabelPanel> {
    allowtextselection?: boolean;
    imgscaling?: number;
}

declare interface ImageAttributes<T extends ImagePanel = ImagePanel>
    extends PanelAttributes<T> {
    svgfillrule?: 'nonzero' | 'evenodd';
    svgopacity?: number;
    svgstrokeopacity?: number;
    svgstrokelinejoin?: 'miter' | 'round' | 'bevel' | 'inherit';
    svgstrokelinecap?: 'butt' | 'round' | 'square';
    svgstrokewidth?: number;
    svgstroke?: '#ffffff' | string;
    svgfillopacity?: number;
    svgfill?: '#ffffff' | string;
    /**
     * texturewidth and textureheight can be used to override the size of vector graphics. Default value of -1 indicates texture width/height to be determined from source file
     */
    texturewidth?: number;
    /**
     * texturewidth and textureheight can be used to override the size of vector graphics. Default value of -1 indicates texture width/height to be determined from source file
     */
    textureheight?: number;
    srcset?: string;
    animate?: string;
    defaultsrc?: string;
    src?: string;
    verticalalign?: 'top' | 'bottom' | 'center' | 'middle';
    horizontalalign?: 'left' | 'right' | 'center' | 'middle';
    scaling?: ScalingFunction;
}

declare interface DOTAAbilityImageAttributes
    extends ImageAttributes<AbilityImage> {
    abilityname?: string;
    abilityid?: number;
    contextEntityIndex?: AbilityEntityIndex;
    /** @default false */
    showtooltip?: boolean;
}

declare interface DOTAItemImageAttributes extends ImageAttributes<ItemImage> {
    itemname?: string;
    contextEntityIndex?: ItemEntityIndex;
    /** @default true */
    showtooltip?: boolean;
}

declare interface DOTAHeroImageAttributes extends ImageAttributes<HeroImage> {
    heroname?: string;
    heroid?: HeroID;
    heroimagestyle?: 'icon' | 'portrait' | 'landscape';
    usedefaultimage?: boolean;
}

declare interface DOTACountryFlagImageAttributes extends ImageAttributes {
    country_code?: string;
}

declare interface DOTALeagueImageAttributes
    extends ImageAttributes<LeagueImage> {
    leagueid?: number;
    /** @default 'Banner' */
    leagueimagestyle?: 'Banner' | 'Square' | 'LargeIcon';
}

declare interface EconItemImageAttributes extends ImageAttributes {
    itemdef: number;
}

declare interface AnimatedImageStripAttributes extends ImageAttributes {
    src?: string;
    frametime?: string;
    defaultframe?: number | string;
    animating?: boolean;
    /** pixels */
    framewidth?: string;
    /** pixels */
    frameheight?: string;
}

declare interface DOTAEmoticonAttributes extends AnimatedImageStripAttributes {
    emoticonid?: number;
    alias?: string;
}

declare type MovieAutoPlay = 'off' | 'onload' | 'onfocus';

declare interface MovieAttributes extends PanelAttributes<MoviePanel> {
    src?: string;
    volume?: number;
    muted?: boolean;
    repeat?: boolean;
    notreadybehavior?: boolean;
    loadbehavior?: boolean;
    /** @default 'onload' */
    autoplay?: MovieAutoPlay;
    title?: string;
    controls?: Parameters<MoviePanel['SetControls']>[0];
}

declare interface MoviePanelAttributes extends PanelAttributes<MoviePanel> {
    src?: string;
    repeat?: boolean;
    autoplay?: MovieAutoPlay;
}

declare interface DOTAHeroMovieAttributes extends PanelAttributes<HeroMovie> {
    src?: string;
    volume?: number;
    muted?: boolean;
    repeat?: boolean;
    notreadybehavior?: boolean;
    loadbehavior?: boolean;
    /** @default 'off' */
    autoplay?: MovieAutoPlay;

    heroid?: HeroID;
    heroname?: string;
    persona?: string;
}

declare interface DOTAScenePanelAttributes extends PanelAttributes<ScenePanel> {
    'post-process-fade'?: number;
    'post-process-material'?: string;
    'animate-during-pause'?: boolean;
    'pin-fov'?: 'horizontal' | 'vertical';
    'live-mode'?: 'high_end_only' | string;
    'no-intro-effects'?: boolean;
    environment?: 'default' | 'full_body' | 'full_body_right_side' | 'card';
    'activity-modifier'?: string;
    unit?: string;

    map?: string;
    camera?: string;
    light?: string;

    pitchmin?: number;
    pitchmax?: number;
    yawmin?: number;
    yawmax?: number;
    acceleration?: number;
    autorotatespeed?: number;
    allowrotation?: boolean;
    rotateonhover?: boolean;
    rotateonmousemove?: boolean;

    antialias?: boolean;
    deferredalpha?: boolean;
    drawbackground?: boolean;
    panoramasurfaceheight?: number;
    panoramasurfacewidth?: number;
    panoramasurfacexml?: string;
    particleonly?: boolean;
    renderdeferred?: boolean;
    rendershadows?: boolean;
    renderwaterreflections?: boolean;
    allowsuspendrepaint?: boolean;
}

declare interface DOTAParticleScenePanelAttributes
    extends PanelAttributes<ParticleScenePanel> {
    syncSpawn?: boolean;
    fov?: number;
    startActive?: boolean;
    squarePixels?: boolean;
    farPlane?: number;
    lookAt?: [number, number, number] | string;
    cameraOrigin?: [number, number, number] | string;
    useMapCamera?: boolean;
    particleName?: string;
}

declare interface DOTAEconItemAttributes
    extends PanelAttributes<EconItemPanel> {
    itemdef: number;
    itemstyle?: number;
}

declare interface ProgressBarAttributes extends PanelAttributes<ProgressBar> {
    value?: number;
    min?: number;
    max?: number;
}

declare interface CircularProgressBarAttributes
    extends PanelAttributes<CircularProgressBar> {
    value?: number;
    min?: number;
    max?: number;
}

declare interface ProgressBarWithMiddleAttributes
    extends PanelAttributes<ProgressBarWithMiddle> {
    lowervalue?: number;
    uppervalue?: number;
    min?: number;
    max?: number;
}

declare interface DOTAUserNameAttributes extends PanelAttributes<UserName> {
    steamid?: string | 'local';
}

declare interface DOTAUserRichPresenceAttributes
    extends PanelAttributes<UserRichPresence> {
    steamid?: string | 'local';
}

declare interface DOTAAvatarImageAttributes
    extends PanelAttributes<AvatarImage> {
    steamid?: string | 'local';
    nocompendiumborder?: boolean;
    lazy?: boolean;
}

declare interface CountdownAttributes extends PanelAttributes<CountdownPanel> {
    startTime?: number;
    endTime: number;
    /** @default 1 */
    updateInterval?: number;
    /** @default 'countdown_time' */
    timeDialogVariable?: string;
}

declare interface TextButtonAttributes
    extends LabelLikeAttributes<TextButton> { }

declare interface ToggleButtonAttributes
    extends LabelLikeAttributes<ToggleButton> {
    selected?: boolean; // checked?
    onselect?: EventHandler<RadioButton>;
    ondeselect?: EventHandler<RadioButton>;
}

declare interface RadioButtonAttributes extends PanelAttributes<RadioButton> {
    group?: string;
    text?: string;
    html?: boolean;

    selected?: boolean;
    onselect?: EventHandler<RadioButton>;
    ondeselect?: EventHandler<RadioButton>;
}

declare interface TextEntryAttributes extends PanelAttributes<TextEntry> {
    multiline?: boolean;
    placeholder?: string;
    maxchars?: number;
    textmode?: 'normal' | 'password' | 'numeric' | 'numericpassword';

    text?: string;
    ontextentrychange?: EventHandler<TextEntry>;
    oninputsubmit?: EventHandler<TextEntry>;
    // ontextentrysubmit doesn't seem to be ever triggered
}

declare interface NumberEntryAttributes extends PanelAttributes<NumberEntry> {
    value?: number;
    onvaluechanged?: EventHandler<NumberEntry>;
    /** @default 0 */
    min?: number;
    /** @default 1000000 */
    max?: number;
    /** @default 1 */
    increment?: number;
}

declare interface SliderAttributes<T extends SliderPanel = SliderPanel>
    extends PanelAttributes<T> {
    style?: never;

    value?: number;
    onvaluechanged?: EventHandler<T>;

    /** @default 0 */
    min?: number;

    /** @default 1 */
    max?: number;

    /**
     * Note: to make slider horizontal it also should have a `HorizontalSlider` class.
     *
     * @default 'vertical'
     */
    direction?: 'vertical' | 'horizontal';
}

declare interface SlottedSliderAttributes<
    T extends SlottedSlider = SlottedSlider
> extends SliderAttributes<T> {
    notches?: number;
}

declare interface DropDownAttributes extends PanelAttributes<DropDown> {
    selected?: string;
    oninputsubmit?: EventHandler<DropDown>;
}

// Untested
declare interface CarouselAttributes extends PanelAttributes<CarouselPanel> {
    focus?: 'center' | 'edge';
    'focus-offset'?: string;
    wrap?: boolean;
    selectionposboundary?: string;
    'panels-visible'?: number;
    clipaftertransform?: boolean;
    AllowOversized?: any;
    'autoscroll-delay'?: string;
    'x-offset'?: string;
}

declare interface CarouselNavAttributes extends PanelAttributes {
    carouselid?: string;
}

declare interface DOTAHUDOverlayMapAttributes
    extends PanelAttributes<HUDOverlayMap> {
    maptexture?: string;
    /** @default 4 */
    mapscale?: number;
    /** @default true */
    mapscroll?: boolean;
    /** @default false */
    fixedoffsetenabled?: boolean;
    fixedOffset?: { x: number; y: number; };
    fixedBackgroundTexturePosition?: { size: number; x: number; y: number; };
}

declare interface HTMLAttributes extends PanelAttributes<HTML> {
    url?: string;
    // SetIgnoreCursor doesn't seem to do anything
}

declare interface CustomLayoutPanelAttributes extends PanelAttributes {
    layout: string;
}

declare interface DOTAPortraitAttributes extends PanelAttributes { }

declare interface TabButtonAttributes extends PanelAttributes {
    group?: string;
    text?: string;
    html?: boolean;

    selected?: boolean;
    onselect?: EventHandler<Panel>;
    ondeselect?: EventHandler<Panel>;
}

declare interface TabContentsAttributes extends PanelAttributes {
    tabid?: string;
    group?: string;

    selected?: boolean;
    onselect?: EventHandler<Panel>;
    ondeselect?: EventHandler<Panel>;
}