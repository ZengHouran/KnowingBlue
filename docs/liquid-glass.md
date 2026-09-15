# Liquid Glass

References checked 2026-09-15:

- https://github.com/WXperia/liquid-glass-vue : 276 stars, Vue 3 adaptation; limited Safari/Firefox displacement support. GitHub did not identify a license.
- https://github.com/rdev/liquid-glass-react : 6,135 stars, MIT; reference for separated backdrop/content, edge displacement and directional highlights.
- https://github.com/Muggleee/liquid-glass : 160 stars, shader/WebGL alternative.

Stars are not performance benchmarks. This is an independent implementation of the rendering ideas, with no upstream source or dependency bundled.

## MVVM and usage

- Model: `src/models/liquidGlass.js`, defaults and rounded-rectangle normals in CSS pixels.
- Texture adapter: `src/utils/glassTexture.js`, aspect-preserving textures, maximum 256 pixels per side, bounded 12-entry cache.
- ViewModel: `src/composables/useLiquidGlass.js` and `useGlassRefraction.js`, pointer scheduling, resize observation, capabilities and cleanup.
- View: `src/components/LiquidGlass.vue`, `GlassFilter.vue`, `src/styles/liquid-glass.css`.
- Works: `src/data/works.js`, `src/composables/useWorksPage.js`, `src/components/WorksPage.vue`.

```vue
<LiquidGlass as="article" :blur="6" :saturation="125" :refraction="18">
  <h3>Content</h3>
</LiquidGlass>
```

Props: `as`, `blur` (px), `saturation` (%), `refraction` (px; 0 disables displacement), `interactive` (pointer highlights). Attributes fall through to the root; CSS controls radius and consumer content padding.

Chrome and Safari share the primary glass appearance: backdrop blur/saturation, translucent tint, curved reflective rim, inset highlights and pointer highlights. Both prefixed and unprefixed backdrop/mask properties are provided. Chromium with a fine pointer additionally gets one SVG displacement pass per surface. Safari, Firefox, touch devices and reduced-motion users use the CSS glass appearance without SVG displacement. Unsupported backdrop filters get an opaque fallback. Reduced transparency / increased contrast preferences disable the glass where those media features are supported.

No continuous animation, global pointer listener, WebGL context or per-frame texture generation. Pointer events coalesce into one frame and are cancelled on leave/unmount. ResizeObserver regenerates the texture after an 80 ms debounce using the actual surface size and CSS radius. Use a uniform pixel radius; elliptical, percentage and independently rounded corners are not modeled. Refraction is bounded to 24 px to avoid sampling outside the 12 px bezel. Tint and highlights are separate from the displaced backdrop, and a dedicated effects layer clips only the background. This is a web approximation of native glass. Real-device GPU and battery performance has not been benchmarked.

## Verification

Production build and diff whitespace checks passed. Playwright checks passed in Chrome and WebKit 26.6 at 1440 x 1000 and 390 x 844: six cards, loaded icons, no horizontal overflow or runtime errors, desktop pointer highlights, and removal of SVG filters when reduced motion is enabled. Screenshots were inspected after scrolling all cards into view.

WebKit's automated screenshots in this environment do not capture backdrop blur, despite reporting the computed filter. Native macOS Safari visually rendered blur in the initial implementation. Native Safari re-verification of the revised implementation was blocked by the Mac lock screen; it must not be inferred from the computed styles. Mobile coverage is browser emulation, not physical iPhone testing.

## Source review and corrections

Reviewed WXperia's `GlassContainer.vue`, `GlassFilter.vue`, `LiquidGlass.vue`, rdev's `src/shader-utils.ts`, and mkj0kjay's `Filter.vue`. Useful patterns are separate filter/content layers, actual surface dimensions, and masked specular edges. The Vue port also has code unsuitable for direct reuse: `watchEffect` returns cleanup functions instead of registering `onCleanup`, and its container assumes centered positioning. These details were not copied.

The initial local implementation stretched a square normal map over rectangular cards, displaced the tint along with the backdrop, and stacked several strong white borders. The revision uses actual dimensions, inward edge sampling, independent tint, background-only clipping and a single masked highlight rim. Node tests cover flat centers, inward/equal-width edge normals and finite corner normals: `node --test tests/liquidGlass.test.js`.
