# Arby follows the reader

Research and implementation decision, 17 September 2026.

## Recommendation

Use the existing SVG artwork, CSS for wing movement, and a small JavaScript controller for flight and landing. One bird replaces the separate standing and FAQ peeking appearances. It follows scrolling in either direction, approaches a clear page edge when scrolling stops, and uses a branch attached to the viewport edge when no suitable edge is visible.

The behaviour is time-based and interruptible. Scrolling gives Arby a reason to fly; it does not determine a fixed animation frame. When the reader stops, Arby needs to keep moving briefly to reach a perch. A new scroll interrupts that approach from its current position.

The new behaviour is confined to the home page. The product assistant, other marketing routes and the source artwork in the platform repository are unchanged.

## Arby Help

Clicking Arby now opens the home-page support chat. The flight controller treats
the panel's top rule as an exclusive perch, interrupts the current flight from
its current position, and ignores page scrolling until the panel closes. The
panel's resize observer keeps the feet aligned after viewport changes. Closing
finishes a short fade before releasing Arby to choose a page perch again.

The still fallback is clickable too. The separate bottom-right controls have
been removed. With reduced motion, opening places the same bird directly on
the panel. Closing restores the still fallback.
Only the bird's hit area captures clicks; its artwork remains decorative.

The chat calls a server-only Anthropic Messages API route with
`claude-haiku-5-5` at low effort. It uses the shared marketing content as its product reference and
cannot read accounts or take actions. See the README for credentials and tests.

## What already exists

The landing site previously used the standing pose in the Arby description and the peeking pose over the FAQ ledger. Both were on the home page, rather than separate routes. Each ran its own entrance and idle animations.

The platform workspace at `/Users/alexlai/conductor/workspaces/arbour/whitehorse/packages/ui/src/components/arby/` contains twelve SVG poses and corresponding React artwork. Its flying pose already separates the near wing, far wing and tail into groups with joint transforms. The standing pose supplies the resting bird. The perched pose supplies the branch. Those existing assets remove the need to redraw Arby or introduce an animation-authoring pipeline for this version.

The site has no animation-library dependency. It already writes scroll-driven transforms directly to DOM nodes for the navigation progress indicator and the stage strip. The companion follows that approach and keeps per-frame values outside React state.

## Rendering options

| Approach | What it offers | Decision for this site |
| --- | --- | --- |
| Inline SVG, CSS and `requestAnimationFrame` | Reuses the grouped artwork directly. Allows dynamic destinations, immediate interruption and an idle controller that stops scheduling frames. | Selected. One character and a small set of states do not justify another runtime. |
| SVG with GSAP | MotionPath accepts SVG paths or arrays of coordinates. Good for complex authored sequences and shared animation tooling. | A sensible alternative if the site later adopts GSAP. It does not solve perch selection, content avoidance or responsive geometry for us. [MotionPath documentation](https://gsap.com/docs/v3/Plugins/MotionPathPlugin/) |
| Rive | An editor and state-machine runtime suited to a continuously rigged character with many transitions and reactions. Its web integration loads an authored Rive asset and runtime. | Consider if Arby becomes a larger character system with designer-authored take-off, wing folding and expressions. For this change, the existing SVG groups already supply the necessary moving parts. [Rive web runtime](https://rive.app/docs/runtimes/web/web-js) |
| Lottie | Plays After Effects exports, supports several renderers and playback controls. | Useful for a fixed clip. Dynamic travel and landing still need a separate controller, and we do not have an authored After Effects asset. [lottie-web](https://github.com/airbnb/lottie-web) |
| Canvas or WebGL | Full control over a rendered scene, useful for many objects or effects that benefit from a shared renderer. | No demonstrated advantage for this single SVG bird. It adds rendering, sizing and asset-management work. No comparative runtime benchmark was performed. |
| CSS scroll timelines or a scrubbed ScrollTrigger animation | Maps animation progress to scroll position. | Does not naturally express continued movement after scrolling stops, selection of a new perch, or interruption of an approach. Useful elsewhere on the page, but not as this controller. [CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |

These are decisions for the existing code and assets, not claims that one renderer is always faster.

## How it should behave

Arby starts on a suitable perch without a long entrance. Scrolling triggers a lift and the flying pose. Flight joins short cubic manoeuvres: dipping swoops, climbing arcs, inward hooks that turn back towards the edge, and slower glides with wings held open. The wings move at slightly different phases during flapping, climbs use a quicker wingbeat, and the body banks with its vertical velocity.

Each manoeuvre samples a fresh destination, reach, height and duration, and excludes the preceding manoeuvre type. Take-off samples wingbeat and landing approach variation. Curves preserve the incoming direction where viewport bounds allow, including when new scrolling interrupts a landing. Destinations stay in a corridor near the right edge, up to 340px wide on desktop and narrower on phones. Scroll direction biases the next destination vertically. Sampling fresh random positions each frame would produce jitter. The general separation of movement goals from character motion is also consistent with Craig Reynolds' steering work, although this implementation uses connected cubic curves rather than a full steering simulation. [Steering behaviours for autonomous characters](https://www.red3d.com/cwr/steer/gdc99/)

When scrolling ends, Arby interrupts the current manoeuvre, chooses a destination and follows a cubic approach from a varied side and height, finishing at the feet anchor. The approach lasts 300 to 780ms according to distance. Touchdown switches to the standing artwork and gives it one 280ms compression. It then stays still, with no breathing or blinking loop competing with reading.

The two poses overlap briefly through opacity during the change. This is a pose transition, not a newly rigged wing-fold animation. A seamless anatomical transition would need additional approved artwork or an authored rig.

## Landing somewhere believable

Candidate page edges are explicitly marked with `data-arby-perch`. They currently include product-frame tops and the stage facts, vendor, pricing and FAQ ledgers. Landing points are spaced across the edge, with room for the bird at both ends. This lets wide desktop ledges offer a clear landing between occupied corners. The feet, rather than the SVG box centre, define the landing coordinate.

Candidates are rejected when the bird would be clipped, appear under the navigation, or overlap nearby text, images or controls. Text uses its rendered line rectangles, so empty space after a short desktop heading remains available. Controls, images and the sticky stage strip exclude their full boxes. Any clear real page edge wins over the branch, even across a wide desktop viewport. Distance breaks ties within those groups. A final check catches an edge that moved while its develop animation settled.

A finite list of document edges cannot guarantee a visible landing spot at every possible scroll offset. A screen might contain only the middle of a tall screenshot or a long paragraph. The viewport branch supplies that missing physical support. Its artwork comes from the platform's perched pose and its far end reaches beyond the right edge, so it reads as attached to something.

On a crowded phone screen, there may be no completely empty patch large enough for even the smaller bird. The fallback minimises occupied area and strongly penalises overlap with controls. This is deliberately a best-effort placement policy, not a claim that every pixel of text stays clear at every offset. The artwork never captures pointer events, but its support-chat hit area does. A strict zero-overlap guarantee would require reserving a permanent gutter or bottom band, changing the page layout.

## Browser behaviour and accessibility

- Use native `scrollend` where available. It accounts for the end of scrolling and the user's gesture, including smooth scrolls. Older browsers use a 180ms quiet-period fallback. Native events get a small 120ms quiet window to avoid repeated landing attempts between wheel notches. [MDN scrollend](https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollend_event)
- Integrate motion using elapsed frame time, with a capped time step after interruption. `requestAnimationFrame` follows the display refresh rate and normally pauses in background tabs; explicitly stop this controller and its wing animations on visibility changes too. [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- Measure geometry when selecting a perch or responding to a layout change, rather than reading every element on every animation frame. Translation, rotation and opacity avoid animating layout properties. This reduces avoidable layout work but is not a substitute for device profiling. [web.dev animation performance](https://web.dev/articles/animations-guide)
- Observe content and perch sizes. FAQ expansion, image layout, resizing and viewport changes can invalidate a landing. Visual viewport dimensions matter on phones; pinch zoom suppresses the companion. [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), [VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)
- Honour reduced motion in both CSS and JavaScript. Show one still bird beside the Arby description instead of a moving viewport companion. [W3C animation from interactions, Level AAA](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- Avoid automatic, indefinite idle animation. W3C separately addresses automatic motion lasting more than five seconds alongside other content. [W3C pause, stop, hide, Level A](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- Keep decorative SVGs out of the accessibility tree and tab order. The bird's hit area is an ordinary keyboard-operable button. No sound, cursor chasing, scroll interception or forced scrolling.

## Brand change

The user approved free flight across marketing grounds and the edge-branch fallback on 17 September 2026. `docs/brand.md` records that narrow home-page exception. The fixed paths and colours remain unchanged. Other mascot placements still follow the original background rules.

The moving bird carries a 1px Cream keyline: four unblurred 1px CSS `drop-shadow` offsets on `.arby-direction`, set in px so it stays 1px at every bird size. It keeps the dark plumage's edge on the Bottle footer and all but vanishes on white. It replaced the heavier SVG `feMorphology` Cream and Ink silhouette outline on 26 October 2026. No backing panel and no blurred shadow.

## Maintenance and verification

The controller is `src/components/arby/scroll-companion.tsx`, its geometry is `flight.ts`, and its styles are `scroll-companion.css`. Add `data-arby-perch` to a deliberate horizontal edge when extending the home page. Mark a nonstandard element `data-arby-avoid` when it needs to exclude landings.

Run `bun run test:arby`, `bun run typecheck`, `bun run lint`, `bun run format:check` and `bun run build`. The geometry tests cover obstructed and clipped perches, desktop ledge sampling and priority over the branch, narrow ledges, branch fallback, landing endpoints, non-repeating manoeuvres, interrupted-flight continuity and bounded randomness.

Browser acceptance checks should include desktop and phone layouts, both scroll directions, stopping mid-section, new input during a landing, anchor navigation, FAQ changes, chat open and close, returning from another tab and reduced motion. Real iOS and Android hardware should also be checked before claiming a device performance target. No production deployment is part of this change.

## Speech bubble

The bird is the only way into Arby Help, so it says so. `.arby-say` lives inside the hit-area button (hovering it keeps it up, clicking it opens the chat, and it is `aria-hidden` because the button's label already says what it does). The controller in `scroll-companion.tsx` decides when it speaks:

- a hello 1.4s after load if the bird is perched;
- on each landing, a line chosen from `LINES` by context: the perch's own `data-arby-perch` name, or on the edge branch, the perch-marked block nearest the middle of the window;
- at most `MAX_SAYS` (4) a page, never the same context twice running, hidden after `SAY_MS` or on the next scroll, and never again once the chat has been opened;
- placed above the head unless the nav is in the way (then beside it), always on the side toward the page.

Hovering or focusing the bird shows the last line at any time.
