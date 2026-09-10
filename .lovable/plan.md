# Add the Wellmark insurance logo

## Insurance artwork
- Upload the supplied Wellmark SVG through the project’s asset system.
- Replace the generic Blue Cross image currently used for “Wellmark Blue Cross Blue Shield of Iowa (HMO)” with the supplied Wellmark logo.
- Keep the existing Wellmark plan name available to screen readers while showing only the logo visually.

## Top in-network insurance area
- Add Wellmark to the logo strip near the top of the homepage alongside the Arizona carriers.
- Keep the existing Blue Cross Blue Shield card because it represents separate Arizona coverage; the new Wellmark artwork is visually distinct and will appear once.
- Preserve the current balanced desktop grid and compact mobile layout.

## Verification
- Confirm the Wellmark logo appears in both the Iowa insurance list and the top in-network insurance area.
- Check desktop and mobile layouts for sizing, loading, and overflow.
- Run the project build.

## Technical details
- Create a CDN asset pointer for the uploaded SVG, import it in the centralized insurance data, and build a combined deduplicated plan list for the top strip.
