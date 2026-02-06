# Specification

## Summary
**Goal:** Add a dedicated, shareable “Warning” entry point with a copyable URL, without changing the existing app flow.

**Planned changes:**
- Add a new initial Warning screen with the exact text “Open this link at your own risk” and a “Continue” button that proceeds into the existing flow (404 -> invitation -> celebration).
- Implement a shareable URL format (via an explicit path segment or hash fragment) that opens the app directly on the Warning screen.
- Display the full derived share URL in the UI and add a “Copy” button with clear English success/failure feedback.
- Style the new Warning/share UI to match the existing soft pastel aesthetic (rounded card container, subtle shadows, smooth transitions) while keeping all new text in English.

**User-visible outcome:** Users can open a dedicated share link that first shows a Warning screen; after clicking “Continue” they enter the existing experience unchanged, and they can copy the share link from the UI with visible feedback.
