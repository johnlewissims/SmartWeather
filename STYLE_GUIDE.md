# SmartWeather Style Guide

> Design system, visual language, and implementation guidelines for SmartWeather

---

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Animations](#animations)
7. [Accessibility](#accessibility)
8. [Responsive Design](#responsive-design)
9. [Implementation Guidelines](#implementation-guidelines)

---

## Design Tokens

Design tokens are the foundational design decisions that define the visual language of SmartWeather. All tokens are defined as CSS custom properties for easy theming and consistency.

### CSS Custom Properties

```css
:root {
  /* Colors */
  --bg:       #020617;              /* Background */
  --surface:  rgba(255,255,255,0.045); /* Card background */
  --surface2: rgba(2,6,23,0.6);      /* Secondary surface */
  --border:   rgba(255,255,255,0.09); /* Border color */
  --text:     #f1f5f9;              /* Primary text */
  --muted:    #64748b;              /* Muted/secondary text */
  --sidebar:  rgba(15,23,42,0.99);  /* Sidebar background */
  --accent:   #06b6d4;              /* Accent color (cyan) */
  --accentTx: #a5f3fc;              /* Accent text color */
  --cardBg:   rgba(2,6,23,0.55);    /* Card overlay background */

  /* Gradients */
  --mainGrad: radial-gradient(ellipse at top,rgba(6,182,212,0.07),transparent 40%),
              linear-gradient(180deg,#0f172a 0%,#020617 100%);

  /* Typography */
  --fs: 13px;  /* Base font size */
}
```

### Tailwind Configuration

When converting to React with Tailwind, extend the default theme:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'sw-bg': '#020617',
        'sw-surface': 'rgba(255,255,255,0.045)',
        'sw-border': 'rgba(255,255,255,0.09)',
        'sw-text': '#f1f5f9',
        'sw-muted': '#64748b',
        'sw-accent': '#06b6d4',
        'sw-accent-text': '#a5f3fc',
      },
      fontSize: {
        'base': '13px',
        'lg': '15.5px', // Large text mode
      }
    }
  }
}
```

---

## Color System

### Theme: Dark Mode (Default)

**Primary Colors**
- Background: `#020617` (very dark blue)
- Surface: `rgba(255,255,255,0.045)` (semi-transparent white)
- Text: `#f1f5f9` (off-white)
- Muted: `#64748b` (slate gray)
- Accent: `#06b6d4` (cyan)

**Background Gradients**
- Main: Radial gradient from cyan tint at top to dark blue
- Creates subtle depth and visual interest

**Usage**
```css
body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
}
```

---

### Theme: Light Mode

```css
body.light {
  --bg:       #f1f5f9;     /* Light slate */
  --surface:  #ffffff;     /* Pure white */
  --surface2: #f8fafc;     /* Very light slate */
  --border:   rgba(0,0,0,0.09); /* Dark border */
  --text:     #0f172a;     /* Very dark blue */
  --muted:    #64748b;     /* Slate gray (same as dark) */
  --sidebar:  #ffffff;     /* White sidebar */
  --accent:   #0284c7;     /* Darker cyan */
  --accentTx: #0369a1;     /* Even darker cyan */
  --cardBg:   #f1f5f9;     /* Light slate */
  --mainGrad: linear-gradient(180deg,#e0f2fe 0%,#f1f5f9 100%);
}
```

**Key Differences**
- Inverted contrast (dark text on light background)
- Slightly darker accent colors for better visibility
- Simplified gradient (linear instead of radial)

---

### Theme: High Contrast

```css
body.hc {
  --bg:       #000;        /* Pure black */
  --surface:  #111;        /* Very dark gray */
  --surface2: #1a1a1a;     /* Dark gray */
  --border:   rgba(255,255,0,0.45); /* Yellow border */
  --text:     #fff;        /* Pure white */
  --muted:    #d4d4d4;     /* Light gray */
  --sidebar:  #000;        /* Pure black */
  --accent:   #00ffff;     /* Bright cyan */
  --accentTx: #00ffff;     /* Bright cyan */
  --cardBg:   #111;        /* Very dark gray */
  --mainGrad: #000;        /* Solid black */
}
```

**Accessibility Focus**
- Maximum contrast ratios (WCAG AAA)
- Bright yellow borders for clear delineation
- Bright cyan accent for visibility
- No gradients (solid colors only)

---

### Semantic Colors

#### Weather Condition Colors

**Precipitation Intensity**
```css
--precip-none:   #475569;  /* Slate (0-20%) */
--precip-light:  #4ade80;  /* Green (20-40%) */
--precip-moderate: #eab308; /* Yellow (40-60%) */
--precip-heavy:  #f97316;  /* Orange (60-80%) */
--precip-extreme: #ef4444; /* Red (80-100%) */
```

**UV Index**
```css
--uv-low:      #4ade80;  /* Green (0-2) */
--uv-moderate: #eab308;  /* Yellow (3-5) */
--uv-high:     #f97316;  /* Orange (6-7) */
--uv-very-high: #ef4444; /* Red (8-10) */
--uv-extreme:  #a855f7;  /* Purple (11+) */
```

**Air Quality Index (AQI)**
```css
--aqi-good:       #4ade80;  /* Green (0-50) */
--aqi-moderate:   #eab308;  /* Yellow (51-100) */
--aqi-usg:        #f97316;  /* Orange (101-150) - Unhealthy for Sensitive Groups */
--aqi-unhealthy:  #ef4444;  /* Red (151-200) */
--aqi-hazardous:  #a855f7;  /* Purple (201+) */
```

**Lightning Risk (CAPE)**
```css
--cape-low:      #4ade80;  /* Green (0-100) */
--cape-moderate: #eab308;  /* Yellow (100-1000) */
--cape-high:     #f97316;  /* Orange (1000-2500) */
--cape-extreme:  #ef4444;  /* Red (2500+) */
```

#### Alert Severity Colors

```css
--alert-extreme:  #b91c1c;  /* Dark red (Extreme severity) */
--alert-severe:   #c2410c;  /* Dark orange (Severe severity) */
--alert-moderate: #92400e;  /* Dark amber (Moderate severity) */
--alert-minor:    #1e40af;  /* Dark blue (Minor severity) */
```

**Text Colors for Alerts**
- Extreme/Severe: `#fff` (white text on dark background)
- Moderate: `#fef3c7` (light amber text)
- Minor: `#bfdbfe` (light blue text)

---

### Hourly Tile Backgrounds

Dynamic background gradients based on weather conditions:

```css
/* Thunderstorms */
background: linear-gradient(135deg, rgba(79,70,229,.55), rgba(14,165,233,.28));
border: 1px solid rgba(125,211,252,.25);

/* Heavy Rain */
background: linear-gradient(135deg, rgba(14,116,144,.6), rgba(74,222,128,.32));
border: 1px solid rgba(74,222,128,.22);

/* Moderate Rain */
background: linear-gradient(135deg, rgba(37,99,235,.55), rgba(45,212,191,.28));
border: 1px solid rgba(103,232,249,.22);

/* Light Rain / Rain Showers */
background: linear-gradient(135deg, rgba(59,130,246,.52), rgba(147,197,253,.22));
border: 1px solid rgba(191,219,254,.22);

/* Snow */
background: linear-gradient(135deg, rgba(148,163,184,.45), rgba(226,232,240,.18));
border: 1px solid rgba(226,232,240,.22);

/* Fog */
background: linear-gradient(135deg, rgba(100,116,139,.45), rgba(148,163,184,.18));
border: 1px solid rgba(203,213,225,.18);

/* Cloudy */
background: linear-gradient(135deg, rgba(51,65,85,.55), rgba(100,116,139,.18));
border: 1px solid rgba(148,163,184,.18);

/* Slight Chance */
background: linear-gradient(135deg, rgba(30,41,59,.55), rgba(59,130,246,.16));
border: 1px solid rgba(96,165,250,.16);

/* Dry */
background: linear-gradient(135deg, rgba(15,23,42,.75), rgba(30,41,59,.45));
border: 1px solid rgba(148,163,184,.12);
```

---

## Typography

### Font Family

```css
font-family: system-ui, -apple-system, sans-serif;
```

**Rationale**: System fonts provide:
- Native look and feel on each platform
- Excellent readability
- Zero load time (no web fonts)
- Consistent rendering

---

### Font Sizes

**Base (Normal Mode)**
```css
--fs: 13px;
```

**Large Text Mode**
```css
body.lg {
  --fs: 15.5px;
}
```

**Specific Element Sizes**
```css
/* Headings */
h1: 28px;       /* Page titles */
h2: 20px;       /* Section headers */
h3: 16px;       /* Card titles */

/* Body */
p, div: 13px;   /* Standard text */
small: 11px;    /* Secondary info */

/* UI */
button: 13px;   /* Button text */
input: 13px;    /* Form inputs */
label: 11px;    /* Form labels */

/* Weather */
.temp-large: 46px;  /* Current temperature */
.temp-medium: 20px; /* Forecast temps */
.temp-small: 15px;  /* Hourly temps */

/* Mobile topbar */
.mobile-title: 14px;
.mobile-subtitle: 11px;
```

---

### Font Weights

```css
--fw-normal: 400;   /* Body text */
--fw-medium: 500;   /* Emphasized text */
--fw-semibold: 600; /* Buttons, headings */
--fw-bold: 700;     /* Strong emphasis */
```

**Usage Guidelines**
- Normal (400): All body text, descriptions, metrics
- Medium (500): Subheadings, labels
- Semibold (600): Buttons, card titles, section headers
- Bold (700): Page titles, alerts, important callouts

---

### Line Heights

```css
--lh-tight: 1.1;    /* Large headings */
--lh-snug: 1.3;     /* Subheadings */
--lh-normal: 1.5;   /* Body text */
--lh-relaxed: 1.65; /* Long-form content */
```

---

### Text Colors

```css
/* Primary text */
color: var(--text);  /* #f1f5f9 in dark mode */

/* Secondary text */
color: var(--muted); /* #64748b */

/* Accent text */
color: var(--accentTx); /* #a5f3fc in dark mode */
```

---

## Spacing & Layout

### Spacing Scale

SmartWeather uses an 8px-based spacing scale for consistency:

```css
--space-1:  4px;   /* 0.5 units */
--space-2:  8px;   /* 1 unit */
--space-3:  12px;  /* 1.5 units */
--space-4:  16px;  /* 2 units */
--space-5:  20px;  /* 2.5 units */
--space-6:  24px;  /* 3 units */
--space-8:  32px;  /* 4 units */
--space-10: 40px;  /* 5 units */
--space-12: 48px;  /* 6 units */
--space-16: 64px;  /* 8 units */
--space-20: 80px;  /* 10 units */
```

**Usage Guidelines**
- 4px: Minimal spacing (icon-to-text gaps)
- 8px: Tight spacing (related elements)
- 12px: Default spacing (list items, form fields)
- 16px: Comfortable spacing (card padding)
- 24px+: Section spacing (between major elements)

---

### Layout Grid

**Desktop (>900px)**
```css
display: grid;
grid-template-columns: 272px 1fr 344px;
height: 100vh;
```

- Sidebar: 272px fixed
- Main: Fluid (grows/shrinks)
- Right Panel: 344px fixed

**Mobile (≤900px)**
```css
display: block;
```
- Single column, stacked layout
- Fixed topbar: 60px height + safe area inset
- Slide-out panels: min(88vw, 360px)

---

### Container Padding

```css
/* Desktop */
#sidebar: 20px;
#main: 28px 32px;
#rpanel: 18px;

/* Mobile */
#main: 82px 14px 22px 14px; /* top, right, bottom, left */
```

---

### Card Spacing

**Standard Card**
```css
border-radius: 18px;
padding: 18px;
gap: 12px;
```

**Compact Card**
```css
border-radius: 14px;
padding: 12px;
gap: 8px;
```

**Large Card**
```css
border-radius: 22px;
padding: 22px;
gap: 16px;
```

---

### Border Radius

```css
--radius-sm:  8px;   /* Small elements (badges, chips) */
--radius-md:  14px;  /* Buttons, inputs */
--radius-lg:  18px;  /* Cards */
--radius-xl:  22px;  /* Large cards, panels */
--radius-2xl: 28px;  /* Hero sections */
--radius-full: 999px; /* Pills, circular elements */
```

---

## Components

### Buttons

#### Primary Button
```css
background: var(--accent);
color: #fff;
border: none;
border-radius: 14px;
padding: 11px 14px;
font-size: 13px;
font-weight: 600;
cursor: pointer;
transition: opacity 0.15s ease;
```

**Hover**: `opacity: 0.85`
**Active**: `opacity: 0.7`
**Disabled**: `opacity: 0.5; cursor: not-allowed;`

---

#### Secondary Button
```css
background: var(--surface);
color: var(--text);
border: 1px solid var(--border);
/* ...same padding, radius, font */
```

---

#### Ghost Button
```css
background: transparent;
color: var(--text);
border: 1px solid transparent;
/* ...same padding, radius, font */
```

**Hover**: `background: var(--surface); border-color: var(--border);`

---

#### Pill Toggle Button
Used in settings for option selection.

```css
background: var(--surface);
color: var(--muted);
border: 1px solid var(--border);
border-radius: 999px;
padding: 8px 14px;
font-size: 12px;
font-weight: 500;
```

**Active State**:
```css
background: var(--accent);
color: #fff;
border-color: var(--accent);
```

---

### Cards

#### Standard Card
```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: 18px;
padding: 18px;
box-shadow: 0 8px 24px rgba(0,0,0,0.15);
```

---

#### Metric Tile
Small card displaying a single metric.

```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: 14px;
padding: 14px;
display: flex;
flex-direction: column;
gap: 8px;
```

**Structure**:
- Icon (18px, top)
- Value (16px bold, middle)
- Label (11px muted, bottom)

---

#### Hourly Card (Compact)
```css
background: /* dynamic gradient */;
border: 1px solid /* dynamic */;
border-radius: 16px;
padding: 14px;
```

**Expanded State**: Add details section with fade-in animation

---

#### Daily Card (Compact)
```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: 18px;
padding: 16px;
```

**Expanded State**: Height transition from ~80px to ~400px

---

### Inputs

#### Text Input
```css
background: var(--surface);
color: var(--text);
border: 1px solid var(--border);
border-radius: 14px;
padding: 11px 14px;
font-size: 13px;
outline: none;
transition: border-color 0.15s ease;
```

**Focus**: `border-color: var(--accent);`

---

### Icons

#### Weather Icons
Animated emoji-based icons with custom animations.

**Sizes**:
- Small: 42×42px, font-size 20px
- Medium: 66×66px, font-size 32px
- Large: 92×92px, font-size 46px

**Base Structure**:
```html
<div class="wx-anim wx-{type} wx-{size}">
  <div class="wx-layer"><!-- animation elements --></div>
  <div class="wx-core">{emoji}</div>
</div>
```

---

### Badges

#### Severity Badge (Alerts)
```css
display: inline-block;
padding: 4px 10px;
border-radius: 8px;
font-size: 10px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.5px;
```

Colors vary by severity (see [Semantic Colors](#semantic-colors)).

---

### Navigation

#### Nav Button
```css
background: transparent;
color: var(--muted);
border: none;
border-radius: 12px;
padding: 10px 14px;
font-size: 13px;
font-weight: 500;
text-align: left;
cursor: pointer;
transition: background 0.15s ease, color 0.15s ease;
```

**Hover**: `background: var(--surface);`
**Active**: `background: var(--accent); color: #fff;`

---

## Animations

### Keyframe Animations

#### Float (Weather Icons)
```css
@keyframes WXfloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
/* Duration: 4s, ease-in-out, infinite */
```

---

#### Drift (Clouds)
```css
@keyframes WXdrift {
  0% { transform: translateX(-18px); }
  100% { transform: translateX(18px); }
}
/* Duration: 6s, linear, infinite alternate */
```

---

#### Fall (Rain)
```css
@keyframes WXfall {
  0% { transform: translateY(-14px); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(64px); opacity: 0; }
}
/* Duration: 1.2s, linear, infinite */
```

---

#### Snow (Snowflakes)
```css
@keyframes WXsnow {
  0% { transform: translate(-6px,-12px) rotate(0deg); opacity: 0; }
  20% { opacity: 0.95; }
  100% { transform: translate(10px,60px) rotate(180deg); opacity: 0; }
}
/* Duration: 2.8s, linear, infinite */
```

---

#### Flash (Lightning)
```css
@keyframes WXflash {
  0%, 82%, 100% { opacity: 0; }
  84%, 88% { opacity: 1; }
}
/* Duration: 2.4s, linear, infinite */
```

---

#### Mist (Fog)
```css
@keyframes WXmist {
  0%, 100% { transform: translateX(-12px); opacity: 0.32; }
  50% { transform: translateX(12px); opacity: 0.72; }
}
/* Duration: 3.2s, ease-in-out, infinite */
```

---

#### Ray (Sun Rays)
```css
@keyframes WXray {
  0%, 100% { transform: scale(1); opacity: 0.35; }
  50% { transform: scale(1.12); opacity: 0.8; }
}
/* Duration: 2.6s, ease-in-out, infinite */
```

---

#### Twinkle (Stars)
```css
@keyframes WXtwinkle {
  0%, 100% { transform: scale(0.85); opacity: 0.35; }
  50% { transform: scale(1.15); opacity: 0.95; }
}
/* Duration: 2.2s, ease-in-out, infinite */
```

---

#### Alert Pulse
```css
@keyframes AP {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
  60% { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
}
/* Duration: 1.8s, ease-in-out, infinite */
```

---

#### Slide In (Content)
```css
@keyframes SI {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Duration: 0.22s, ease-out */
```

---

### Transitions

#### Standard Transitions
```css
/* Buttons, interactive elements */
transition: opacity 0.15s ease, background 0.15s ease, color 0.15s ease;

/* Card hover */
transition: transform 0.2s ease, box-shadow 0.2s ease;

/* Mobile panels */
transition: transform 0.24s ease;

/* Expandable sections */
transition: height 0.25s ease, opacity 0.2s ease;

/* Toasts/banners */
transition: opacity 0.25s ease, transform 0.25s ease;
```

---

### Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .wx-core,
  .wx-particle,
  .wx-bar,
  .wx-mist,
  .wx-ray,
  .wx-flash {
    animation: none !important;
  }

  * {
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

### Color Contrast Ratios

**WCAG 2.1 AA Compliance** (minimum)

Text contrast:
- Normal text (13px): 4.5:1 minimum
- Large text (18px+): 3:1 minimum

SmartWeather achieves:
- Dark mode: 13.5:1 (text on background)
- Light mode: 16:1 (text on background)
- High contrast mode: 21:1 (maximum contrast)

---

### Color Vision Deficiency Support

#### SVG Color Matrix Filters

**Deuteranopia** (green deficiency)
```xml
<filter id="f-deut" color-interpolation-filters="linearRGB">
  <feColorMatrix type="matrix" values="
    0.625 0.375 0     0 0
    0.7   0.3   0     0 0
    0     0.3   0.7   0 0
    0     0     0     1 0"/>
</filter>
```

**Protanopia** (red deficiency)
```xml
<filter id="f-prot" color-interpolation-filters="linearRGB">
  <feColorMatrix type="matrix" values="
    0.567 0.433 0     0 0
    0.558 0.442 0     0 0
    0     0.242 0.758 0 0
    0     0     0     1 0"/>
</filter>
```

**Tritanopia** (blue deficiency)
```xml
<filter id="f-trit" color-interpolation-filters="linearRGB">
  <feColorMatrix type="matrix" values="
    0.95  0.05  0     0 0
    0     0.433 0.567 0 0
    0     0.475 0.525 0 0
    0     0     0     1 0"/>
</filter>
```

**Application**:
```css
body.deut { filter: url(#f-deut); }
body.prot { filter: url(#f-prot); }
body.trit { filter: url(#f-trit); }
```

---

### Radar Color Schemes

**Reflectivity (Default - Scheme 2)**
- 5 dBZ: #646464 (gray)
- 10 dBZ: #04e9e7 (cyan)
- 15 dBZ: #019ff4 (blue)
- 20 dBZ: #0300f4 (deep blue)
- 25 dBZ: #02fd02 (bright green)
- 30 dBZ: #01c501 (green)
- 35 dBZ: #008e00 (dark green)
- 40 dBZ: #fdf802 (yellow)
- 45 dBZ: #e5bc00 (gold)
- 50 dBZ: #fd9500 (orange)
- 55 dBZ: #fd0000 (red)
- 60 dBZ: #d40000 (dark red)
- 65 dBZ: #bc0000 (darker red)
- 70 dBZ: #f800fd (magenta)
- 75+ dBZ: #9854c6 (purple)

**Colorblind-Friendly (Scheme 1 - Universal Blue)**
For deuteranopia/protanopia, switch to blue-only gradient (RainViewer scheme 1).

**Tritanopia (Scheme 3)**
Adjusted palette avoiding blue-yellow conflicts.

---

### Keyboard Navigation

#### Focus Indicators
```css
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

#### Tab Order
1. Search input
2. Navigation buttons (top to bottom)
3. Main content (left to right, top to bottom)
4. Settings controls
5. Right panel cards

---

### ARIA Labels

```html
<!-- Example: Weather icon -->
<div role="img" aria-label="Partly cloudy with 30% chance of rain">
  {weather icon}
</div>

<!-- Example: Navigation -->
<nav aria-label="Main navigation">
  <button aria-current="page">Overview</button>
  <button>24-Hour</button>
</nav>

<!-- Example: Alerts -->
<div role="alert" aria-live="assertive">
  Severe thunderstorm warning in effect
</div>
```

---

### Screen Reader Considerations

- Use semantic HTML (`<nav>`, `<main>`, `<aside>`, `<article>`)
- Provide text alternatives for icons
- Announce dynamic content changes (alerts, weather updates)
- Use `aria-expanded` for collapsible sections
- Label form inputs properly

---

## Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 900px) { /* ... */ }

/* Desktop */
@media (min-width: 901px) { /* ... */ }
```

**Single breakpoint philosophy**: Simplifies design, clear mobile vs desktop distinction

---

### Mobile Adaptations

#### Layout
- Grid → Block (3 columns → 1 column)
- Fixed panels slide in/out
- Top bar appears
- Content padding reduced

#### Typography
- Font sizes remain same (legibility maintained)
- Line heights slightly increased for touch targets

#### Spacing
- Card padding reduced (18px → 14px)
- Gap reduced (12px → 10px)
- Main padding: 82px 14px 22px 14px

#### Interactions
- Touch targets ≥44px (iOS guidelines)
- Hover states removed (`:hover` only on desktop)
- Swipe gestures for panels

#### Maps
- Height reduced: 540px → 56vh (min 360px)
- Controls larger and more spaced out

---

### Grid Collapsing

Multi-column grids collapse to single column:

```css
/* Desktop */
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 12px;

/* Mobile */
@media (max-width: 900px) {
  grid-template-columns: 1fr;
}
```

Applied to:
- 2-column grids (today/tonight, current conditions)
- 3-column grids (forecast highlights)
- 4-column grids (metric tiles)

---

## Implementation Guidelines

### Best Practices

#### CSS
1. **Use CSS custom properties** for all theme-able values
2. **Avoid magic numbers** - use spacing scale
3. **Mobile-first** approach (base styles for mobile, `@media` for desktop)
4. **Keep specificity low** - avoid deep nesting
5. **Prefer classes over IDs** for styling

#### Components
1. **Single Responsibility** - Each component does one thing well
2. **Composable** - Build complex UIs from simple components
3. **Accessible** - Keyboard nav, ARIA, semantic HTML
4. **Responsive** - Works on all screen sizes
5. **Performant** - Minimize re-renders, use CSS animations

#### Naming Conventions
1. **BEM-lite** for CSS classes: `component-element--modifier`
2. **Descriptive names**: `hourly-card`, `metric-tile`, `alert-badge`
3. **Avoid abbreviations**: `precipitation` not `precip` (in class names)

---

### File Organization (React)

```
src/
├── styles/
│   ├── globals.css           # CSS reset, design tokens
│   ├── animations.css         # Weather animations
│   ├── themes.css            # Theme variations
│   └── accessibility.css     # A11y overrides
├── components/
│   └── WeatherIcon/
│       ├── WeatherIcon.tsx
│       ├── WeatherIcon.module.css  # Component-specific styles
│       └── index.ts
```

---

### CSS Module Example

```css
/* WeatherIcon.module.css */
.wxAnim {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 18px;
  isolation: isolate;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255,255,255,0.14),
    transparent 52%
  ), rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
}

.wxSm {
  width: 42px;
  height: 42px;
  font-size: 20px;
  border-radius: 14px;
}

.wxMd {
  width: 66px;
  height: 66px;
  font-size: 32px;
}

.wxLg {
  width: 92px;
  height: 92px;
  font-size: 46px;
}
```

---

### Tailwind Utilities

Prefer Tailwind for:
- Layout (flex, grid, spacing)
- Sizing (w-, h-, max-w-, etc.)
- Responsive utilities

Use CSS modules for:
- Complex animations
- Component-specific styles
- Custom gradients/effects

**Example**:
```jsx
<div className="flex flex-col gap-4 p-6 md:p-8">
  <WeatherIcon size="lg" code={weatherCode} />
</div>
```

---

### Theme Switching (React)

```typescript
// ThemeContext.tsx
const applyTheme = (theme: Theme, a11y: A11yMode) => {
  const body = document.body;
  body.className = '';

  if (theme === 'light') body.classList.add('light');
  if (a11y === 'high-contrast') body.classList.add('hc');
  if (a11y === 'large-text') body.classList.add('lg');
  if (a11y === 'deuteranopia') body.classList.add('deut');
  if (a11y === 'protanopia') body.classList.add('prot');
  if (a11y === 'tritanopia') body.classList.add('trit');

  // Update main gradient (CSS var doesn't work for gradients)
  const main = document.getElementById('main');
  if (main) {
    main.style.background = theme === 'light'
      ? 'linear-gradient(180deg,#e0f2fe 0%,#f1f5f9 100%)'
      : a11y === 'high-contrast'
      ? '#000'
      : 'radial-gradient(ellipse at top,rgba(6,182,212,0.07),transparent 40%),linear-gradient(180deg,#0f172a 0%,#020617 100%)';
  }
};
```

---

### Performance Tips

1. **CSS Containment**
```css
.card {
  contain: layout style paint;
}
```

2. **GPU Acceleration**
```css
.animated {
  will-change: transform;
  transform: translateZ(0);
}
```

3. **Reduce Repaints**
- Use `transform` and `opacity` for animations (not `top`, `left`, `width`)
- Batch DOM updates
- Debounce scroll/resize handlers

4. **Lazy Load**
- Load views on-demand (React.lazy)
- Defer non-critical assets

---

## Design Checklist

When implementing a new component:

- [ ] Matches color system (uses design tokens)
- [ ] Follows spacing scale (8px-based)
- [ ] Uses correct border radius for size
- [ ] Has proper typography (size, weight, line-height)
- [ ] Responsive (mobile and desktop)
- [ ] Accessible (keyboard nav, ARIA, contrast)
- [ ] Supports all themes (dark, light, high-contrast)
- [ ] Respects reduced motion preference
- [ ] Has proper hover/focus/active states
- [ ] Consistent with existing components

---

## Common Patterns

### Card with Metric
```jsx
<Card>
  <div className="flex flex-col gap-2">
    <div className="text-2xl">{icon}</div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-muted">{label}</div>
  </div>
</Card>
```

### Expandable Section
```jsx
<div className="transition-all duration-200">
  <button onClick={toggle} className="w-full">
    {summary}
    <ChevronIcon className={expanded ? 'rotate-180' : ''} />
  </button>
  {expanded && (
    <div className="mt-4 animate-slide-in">
      {details}
    </div>
  )}
</div>
```

### Grid of Tiles
```jsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  {metrics.map(m => (
    <MetricTile key={m.id} {...m} />
  ))}
</div>
```

---

## Resources

### Color Tools
- [Coolors](https://coolors.co) - Palette generation
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG compliance
- [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/) - Colorblind simulator

### Typography
- [Modular Scale](https://www.modularscale.com) - Type scale calculator
- [Type Scale](https://type-scale.com) - Visual type scale

### Animations
- [Easings](https://easings.net) - Easing function reference
- [Cubic Bezier](https://cubic-bezier.com) - Timing function builder

### Accessibility
- [WAVE](https://wave.webaim.org) - Accessibility evaluator
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [A11y Project](https://www.a11yproject.com) - Best practices

---

**Last Updated**: 2024
**Version**: 1.0.0
