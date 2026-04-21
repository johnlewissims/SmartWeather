# SmartWeather

> A beautiful, accessible, and feature-rich weather dashboard with live radar, NWS alerts, and comprehensive forecasts.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## Overview

**SmartWeather** is a modern, single-page weather application that provides hyperlocal weather data, live radar maps, and official National Weather Service alerts. Built with accessibility and user experience in mind, it offers multiple theme modes, color vision filters, and responsive design for all devices.

### Key Features

#### Weather Data
- **Real-time conditions** - Temperature, feels-like, humidity, wind, pressure, cloud cover, visibility, UV index, air quality
- **24-hour forecast** - Detailed hourly outlook with expandable metrics
- **7-day forecast** - Weekly weather with daily breakdowns (morning/afternoon/night temps)
- **Live radar maps** - NEXRAD reflectivity overlay with satellite and temperature layers
- **Precipitation tracking** - 60-minute and 4-hour rain/snow probability charts
- **NWS weather alerts** - Official warnings, watches, and advisories with priority sorting

#### User Experience
- **Smart notifications** - Browser and in-app alerts for approaching rain and severe weather
- **Auto-refresh** - Weather data updates every 5 minutes automatically
- **City search** - Global location support with timezone-aware display
- **Multi-unit support** - Toggle between Imperial (°F, mph) and Metric (°C, km/h)
- **Time format options** - 12-hour or 24-hour clock display
- **Responsive design** - Seamless mobile and desktop experiences

#### Accessibility
- **Theme modes** - Dark mode (default) and light mode
- **Color vision filters** - Deuteranopia, protanopia, and tritanopia support
- **High contrast mode** - Enhanced visibility with bright borders and colors
- **Large text mode** - Increased font sizes for readability
- **Keyboard navigation** - Full keyboard accessibility
- **Screen reader support** - Semantic HTML and ARIA labels
- **Reduced motion** - Respects `prefers-reduced-motion` media query

---

## Screenshots

### Desktop - Overview View (Dark Mode)
Main dashboard showing current conditions, precipitation chart, 7-day outlook, live radar, and active alerts.

### Mobile - 24-Hour Forecast
Responsive mobile layout with expandable hourly cards showing detailed weather metrics.

### Radar View with Live NEXRAD
Interactive map with real-time radar reflectivity overlay and layer switching options.

### Settings - Accessibility Options
Comprehensive accessibility settings including color vision filters, high contrast, and large text modes.

---

## Tech Stack

### Current Implementation (Vanilla)
- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables), flexbox, grid, keyframe animations
- **JavaScript (ES6+)** - Async/await, modules, Set/Map, modern browser APIs
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Leaflet 1.9.4** - Interactive maps library

### APIs
- **Open-Meteo** - Weather forecasts, geocoding, air quality
- **NWS (weather.gov)** - Official U.S. weather alerts
- **CartoDB** - Base map tiles (dark/light)
- **ESRI** - Satellite imagery tiles
- **IEM** - NEXRAD radar data (WMS)

---

## Installation & Usage

### Option 1: Direct Use (Vanilla HTML)
The current implementation is a self-contained single HTML file.

1. **Download** the `index.html` file
2. **Open** it in a modern web browser (Chrome, Firefox, Safari, Edge)
3. **Search** for your city in the sidebar
4. **Explore** weather data, forecasts, and radar

**Note**: For browser notifications, the file must be served over `http://localhost` or `https://`. Otherwise, in-app alerts will be used.

**Serve locally** (optional):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Then open: http://localhost:8000
```

---

### Option 2: React Conversion (Future)
See [REACT_SPEC.md](./REACT_SPEC.md) for detailed instructions on converting to a React application.

**Quick start** (once converted):
```bash
npm install
npm run dev
```

---

## Features Deep Dive

### 1. Weather Data Sources

#### Open-Meteo API
SmartWeather uses the free, open-source Open-Meteo API for all weather data:
- No API key required
- Global coverage
- Hourly and daily forecasts up to 16 days
- 80+ weather variables available
- High-resolution (1-11 km)

**Data includes**:
- Current conditions
- Hourly forecast (temperature, precipitation probability, wind, humidity, pressure, cloud cover, visibility, CAPE for lightning risk)
- Daily forecast (high/low temps, precipitation totals, sunrise/sunset, UV index)
- Air quality (US AQI)

#### National Weather Service (NWS) API
Official U.S. government weather alerts:
- Warnings (tornado, severe thunderstorm, flash flood, etc.)
- Watches (winter storm, hurricane, etc.)
- Advisories (wind, heat, freeze, etc.)
- Real-time updates
- Severity/urgency/certainty metadata

---

### 2. Views & Navigation

#### Overview (Default)
The main dashboard providing at-a-glance weather information:
- Current conditions with animated weather icon
- Today's high / Tonight's low
- Precipitation chart (60min or 4h toggle)
- Forecast highlights: clouds, temperature, lightning risk, air quality
- Compact 7-day outlook
- Live radar preview
- Next 4 hours quick view
- Current metrics grid
- Active NWS warnings

#### 24-Hour Weather
Detailed hourly forecast for the next 24 hours:
- Expandable cards for each hour
- Time, temperature, precipitation chance, condition
- Expanded view shows: feels-like, wind speed/direction, cloud cover, humidity, pressure, visibility, storm risk (CAPE)
- Color-coded backgrounds based on precipitation intensity

#### 7-Day Forecast
Weekly outlook with rich daily details:
- Expandable cards for each day (accordion-style)
- Summary, condition, high/low temperatures
- Expanded view shows: wind (speed, gusts, direction), precipitation totals (rain, showers, snow), storm risk, cloud cover, humidity, UV index, visibility, sunrise/sunset times, pressure, sunshine hours, and temperature breakdown (morning/afternoon/night)

#### Radar Maps
Full-screen interactive radar:
- **Reflectivity layer** - NEXRAD radar showing precipitation intensity
- **Satellite layer** - ESRI satellite imagery
- **Temperature layer** - Conceptual (planned feature)
- Zoom/pan controls
- Location marker with popup
- Color-coded legend

#### Settings
User preferences and accessibility:
- Display mode: Dark / Light
- Accessibility: 6 options (normal, 3 color vision filters, high contrast, large text)
- Units: Imperial / Metric
- Time format: 12h / 24h
- Notifications: Enable/disable alerts

#### Alert Detail
Full information page for individual NWS alerts:
- Event name and severity badge
- Metadata: affected areas, issuer, times (effective, onset, expires), certainty
- Full description
- Recommended actions/instructions

---

### 3. Smart Notifications

SmartWeather can send notifications for important weather events.

#### Notification Types
1. **Rain approaching** - Triggered when precipitation probability ≥50% in next hour
2. **NWS alerts** - New warnings/watches for your location

#### Notification Methods
- **Browser notifications** (if permission granted and HTTPS)
- **In-app banners** (top-center alerts)
- **In-app toasts** (bottom-right alerts)

#### Smart Features
- **Deduplication** - Same alert won't notify twice
- **Throttling** - Rain notifications max once per 30 minutes
- **Auto-check** - Runs every 60 seconds when enabled
- **Sound alerts** - Synthesized tone for critical warnings
- **Fallback** - Graceful degradation if browser notifications unavailable

**Enable notifications**:
1. Navigate to Settings
2. Click "Enable Notifications"
3. Grant browser permission (if prompted)
4. Test with "Test Notification" button

---

### 4. Accessibility Features

SmartWeather is designed to be usable by everyone.

#### Color Vision Deficiency Support
Three built-in color vision filters using SVG color matrix transformations:
- **Deuteranopia** (red-green colorblindness) - Green deficiency
- **Protanopia** (red-green colorblindness) - Red deficiency
- **Tritanopia** (blue-yellow colorblindness) - Blue deficiency

When enabled, the entire page is filtered and radar color schemes adjust to more distinguishable palettes (e.g., blue-only scale for red-green deficiencies).

#### High Contrast Mode
- Black background
- Bright yellow borders
- Maximum text contrast
- Enhanced visibility for low-vision users

#### Large Text Mode
- Font size increased from 13px to 15.5px base
- Proportional scaling of all text elements

#### Other Accessibility Features
- **Semantic HTML** - Proper heading hierarchy, landmarks, lists
- **Keyboard navigation** - All interactive elements accessible via Tab/Enter
- **Focus indicators** - Visible focus states
- **ARIA labels** - Descriptive labels for screen readers
- **Reduced motion** - Animations disabled if user prefers reduced motion

---

### 5. Responsive Design

#### Desktop (>900px)
- 3-column layout: Sidebar (272px) | Main (fluid) | Right Panel (344px)
- Fixed-height panels (100vh) with internal scrolling
- Hover states on interactive elements
- Side-by-side content for efficient screen use

#### Mobile (≤900px)
- Single-column layout with stacked content
- Fixed top bar with app name and city
- Slide-out panels for sidebar and right panel:
  - Left panel: Search, navigation, status
  - Right panel: Current conditions, alerts, notifications
- Hamburger menu and panel toggle buttons
- Semi-transparent backdrop overlay when panels open
- Touch-optimized spacing and button sizes
- Reduced map heights to fit mobile screens

**Mobile interactions**:
- Tap hamburger icon (top-left) to open sidebar
- Tap panel icon (top-right) to open right panel
- Tap backdrop to close panels
- Panels automatically close when navigating

---

### 6. Weather Animations

Animated weather icons bring the forecast to life with CSS keyframe animations.

#### Weather Types
- **Clear** - Sun with rotating rays
- **Partly Cloudy** - Sun rays with drifting cloud layer
- **Cloudy** - Drifting cloud layers
- **Rain** - Falling rain bars
- **Snow** - Falling snowflakes with rotation
- **Fog** - Horizontal mist layers
- **Thunderstorm** - Rain with lightning flashes
- **Night** - Moon with twinkling stars

#### Animation Details
- **Float** - Icon gentle up/down motion
- **Drift** - Cloud layers side-to-side
- **Fall** - Rain/snow particles
- **Flash** - Lightning strikes
- **Twinkle** - Star sparkle effect
- **Pulse** - Alert badges for severe weather

All animations respect `prefers-reduced-motion` and are disabled for users who prefer reduced motion.

---

## Data Privacy

SmartWeather respects your privacy:
- **No tracking** - No analytics, no cookies, no user tracking
- **No data collection** - Search queries are sent directly to weather APIs, not logged
- **No account required** - Completely anonymous usage
- **Local storage only** - Settings stored in browser's localStorage (device-only)
- **No ads** - Ad-free experience

**API requests**:
- Open-Meteo: Public API, no authentication, no data retention
- NWS: Government API, public data, no authentication

---

## Browser Compatibility

### Supported Browsers
- **Chrome** 90+ (recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

### Required Features
- **CSS Grid & Flexbox** - Layout
- **CSS Custom Properties** - Theming
- **ES6+ JavaScript** - Modern syntax (async/await, Set, Map, etc.)
- **Fetch API** - Network requests
- **Notification API** - Browser notifications (optional, fallback provided)
- **AudioContext** - Alert sounds (optional)

### Fallbacks
- **No HTTPS** - In-app notifications instead of browser notifications
- **No Notification API** - Banner/toast alerts
- **No AudioContext** - Silent alerts

---

## Performance

### Optimizations
- **Auto-refresh interval** - 5 minutes (configurable)
- **Debounced map interactions** - Smooth panning/zooming
- **Lazy tile loading** - Maps load tiles as needed
- **Minimal re-renders** - Only update changed DOM elements
- **Efficient data structures** - Set for expanded cards, single state object
- **CSS animations** - GPU-accelerated transforms

### Data Usage
- **Initial load** - ~50-100 KB (HTML/CSS/JS)
- **Weather API** - ~20-40 KB per request
- **Alerts API** - ~5-30 KB per request (varies by alert count)
- **Map tiles** - ~200-500 KB (cached by browser)
- **Total per session** - ~500 KB - 1 MB

---

## Known Limitations

1. **Alert coverage** - NWS alerts are U.S. only (other countries show no alerts)
2. **Radar coverage** - NEXRAD radar is U.S. only (other regions show base map only)
3. **Forecast accuracy** - Dependent on Open-Meteo model accuracy (generally very good)
4. **City search** - May return incorrect city if multiple cities share same name (e.g., "Paris, Texas" vs "Paris, France")
5. **Browser notifications** - Require HTTPS or localhost (file:// protocol shows in-app alerts only)
6. **Map performance** - Large zoom/pan operations may lag on older devices

---

## Roadmap

### Planned Features
- **Weather alerts for non-U.S. locations** - Integrate international alert systems
- **Animated radar** - RainViewer API integration (currently available but not rendered)
- **Historical weather** - View past weather data and trends
- **Favorites/Locations** - Save multiple cities for quick switching
- **Weather graphs** - Temperature, precipitation, wind charts
- **Severe weather tracking** - Storm tracks, tornado paths
- **Weather widgets** - Embeddable weather widgets for other sites
- **PWA support** - Install as Progressive Web App
- **Offline mode** - Service worker caching

### Potential Enhancements
- **Voice search** - "Search for San Francisco weather"
- **Weather comparisons** - Compare two cities side-by-side
- **Custom units** - Mix and match (e.g., °C with mph)
- **More radar layers** - Wind speed, temperature, dew point
- **Weather blog/news** - Curated weather news and articles

---

## Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute
1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure accessibility features still work
- Update documentation if needed

---

## Troubleshooting

### City not found
**Problem**: Search returns "City not found"
**Solution**:
- Try different spelling or include country (e.g., "London, UK" vs "London, Canada")
- Use full city name (e.g., "San Francisco" not "SF")
- Try nearby larger city

### Alerts not loading
**Problem**: "Unable to load alerts" message
**Solution**:
- This is normal for non-U.S. locations (NWS only covers U.S.)
- Check internet connection
- NWS API may be temporarily down (rare)

### Notifications not working
**Problem**: Browser notifications don't appear
**Solution**:
- Ensure site is served over HTTPS or http://localhost
- Check browser notification permissions (Settings → Site Permissions)
- Try "Test Notification" button in Settings
- In-app banners will still appear as fallback

### Radar not showing
**Problem**: Map shows but no radar overlay
**Solution**:
- NEXRAD radar only covers U.S. (normal for other regions)
- Try zooming in closer (radar may be sparse at high zoom levels)
- Check if Reflectivity layer is selected (not Satellite/Temperature)

### Map tiles not loading
**Problem**: Gray tiles or missing map sections
**Solution**:
- Check internet connection
- Tile provider may be temporarily unavailable
- Try switching layers (Reflectivity ↔ Satellite)
- Hard refresh page (Ctrl+Shift+R / Cmd+Shift+R)

### Performance issues
**Problem**: App feels slow or laggy
**Solution**:
- Close other browser tabs
- Disable animations (browser Settings → Accessibility → Reduce motion)
- Clear browser cache
- Try a different browser (Chrome recommended)

---

## FAQ

**Q: Is SmartWeather free?**
A: Yes, completely free and open-source. No ads, no accounts, no hidden costs.

**Q: Do I need an API key?**
A: No. All APIs used are public and don't require authentication.

**Q: Can I use this offline?**
A: Not currently. Weather data requires internet connection. PWA offline support is planned.

**Q: What's the difference between "Rain" and "Showers"?**
A: "Rain" is continuous precipitation, "Showers" are brief, intermittent rain.

**Q: Why are some alerts color-coded red/orange/yellow?**
A: Colors indicate severity: Red = Extreme/Severe, Orange = Moderate, Yellow/Blue = Minor/Advisory.

**Q: Can I embed SmartWeather on my website?**
A: Not yet. Weather widget support is planned for a future release.

**Q: How accurate is the forecast?**
A: Open-Meteo uses multiple weather models (GFS, ICON, etc.) and is generally very accurate, especially for 1-3 day forecasts. Accuracy decreases beyond 5 days.

**Q: Why does the temperature feel different than the actual temp?**
A: "Feels like" (apparent temperature) factors in wind chill and humidity, which affect how temperature feels to humans.

**Q: What is CAPE and why does it matter?**
A: CAPE (Convective Available Potential Energy) measures atmospheric instability. High CAPE (>1000) indicates conditions favorable for thunderstorms and severe weather.

**Q: Can I change the radar color scheme?**
A: Radar colors adjust automatically based on accessibility settings (e.g., blue-only for colorblind modes). Manual customization is not currently supported.

---

## Credits

### Data Sources
- **Open-Meteo** - Weather forecasts and air quality data (https://open-meteo.com)
- **National Weather Service** - U.S. weather alerts (https://weather.gov)
- **Iowa Environmental Mesonet** - NEXRAD radar data (https://mesonet.agron.iastate.edu)

### Map Providers
- **CartoDB** - Base map tiles (https://carto.com/basemaps)
- **ESRI** - Satellite imagery (https://www.esri.com)
- **Leaflet** - Open-source mapping library (https://leafletjs.com)

### Frameworks
- **Tailwind CSS** - Utility-first CSS framework (https://tailwindcss.com)

### Icons
- Weather icons use Unicode emojis (universal support, no external assets)

---

## License

MIT License

Copyright (c) 2024 SmartWeather

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

**Useful links**:
- GitHub repository: (link)
- Documentation: [REACT_SPEC.md](./REACT_SPEC.md), [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- API documentation: [Open-Meteo](https://open-meteo.com/en/docs), [NWS](https://www.weather.gov/documentation/services-web-api)

---

**Built with ❤️ for weather enthusiasts**
