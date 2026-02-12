
# SVG Path Drawing Preloader

## Overview
Create a premium cinematic preloader that draws a simplified representation of the Triple Vision logo using SVG stroke animation, then reveals the actual logo and fades out.

## Challenge
The uploaded SVG contains auto-traced filled paths (444 lines of complex coordinate data). These paths are not suitable for stroke-dasharray animation -- they would produce messy outlines of filled shapes rather than clean line drawing. 

## Solution: Two-Phase Approach

### Phase 1: Stroke Drawing Animation
Create a hand-crafted simplified SVG with clean stroked paths representing:
- The text "TRIPLE VISI N" in a clean geometric style
- The iconic "O" circle (the eye/lens motif from the logo)
- A subtle horizontal line beneath (representing the tagline area)

These paths will be animated using `stroke-dasharray` and `stroke-dashoffset` with CSS keyframes (no JS animation loop). The stroke color will be the brand orange (#ff8c00).

### Phase 2: Fill Reveal and Fade Out
After the drawing completes (~1.5s):
- The actual logo image fades in on top (opacity 0 to 1, ~0.4s)
- A subtle scale-up from 1.0 to 1.03
- Then the entire preloader fades out and unmounts (~0.3s)

Total duration: ~2.2 seconds

## Technical Plan

### New File: `src/components/Preloader.tsx`
- Checks `sessionStorage.getItem('preloaderShown')` -- if already shown, returns `null` immediately
- Contains the SVG with stroke-animated paths
- Uses `useState` + `useEffect` with a single timeout chain:
  - 0ms: Start stroke drawing (CSS animation, no JS)
  - 1500ms: Fade in actual logo image
  - 1900ms: Begin fade-out of entire preloader
  - 2200ms: Set state to unmount component, write `sessionStorage.setItem('preloaderShown', 'true')`
- Component returns `null` after unmounting -- fully removed from DOM
- Background: solid dark purple (`hsl(280, 100%, 8%)`) matching the site's `--background-secondary`

### Modify: `src/App.tsx`
- Import `Preloader` (not lazy -- it must show immediately)
- Render `<Preloader />` at the top level, before the router content
- The preloader overlays everything with `fixed inset-0 z-[9999]`

### Animation Details
- All animations use CSS `@keyframes` with `stroke-dashoffset` -- zero JS animation frames
- GPU-friendly: only `transform: scale()` and `opacity` transitions
- No blur, no particles, no infinite loops
- The SVG paths use `will-change: stroke-dashoffset` during animation

### Performance Guarantees
- No Framer Motion used (pure CSS animation) -- zero bundle cost for the preloader
- `sessionStorage` check happens synchronously before first render -- returning users see zero preloader
- Component fully unmounts after animation -- zero ongoing cost
- No layout shift (fixed positioning, no content displacement)
- Estimated additional JS: ~2KB (minimal component)

## Files Changed

| File | Change |
|------|--------|
| `src/components/Preloader.tsx` | **New** -- SVG stroke animation preloader component |
| `src/App.tsx` | Import and render `<Preloader />` at top level |
