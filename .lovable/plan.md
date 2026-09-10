# Crop and replace the Wellmark logo asset

## Problem
The uploaded Wellmark PNG is a 600 × 600 image where the actual logo only occupies a thin horizontal strip in the middle. When it is scaled to fit the insurance-card width, most of the card height is empty transparent space, so the logo looks much smaller than the other carrier logos.

## Solution
Crop the uploaded Wellmark image to its content bounding box so the logo fills the canvas, then replace the existing Wellmark asset with the cropped version.

## Steps
1. Crop `/mnt/user-uploads/blob.png` to the alpha-channel bounding box, removing the transparent whitespace above and below the logo.
2. Upload the cropped image as a new Lovable asset (e.g., `wellmark.png`).
3. Update `src/data/insurances.ts` to import the new asset pointer and use its URL for the Wellmark brand.
4. Delete the old `wellmark.png` asset pointer and its CDN object.
5. Run `bun run build` to verify references resolve and there are no errors.

## Verification
- Search the codebase for any remaining references to the old Wellmark asset URL.
- Confirm the Wellmark logo renders with class `w-full max-w-full object-contain` in `InsuranceLogoGrid`.
- Confirm no horizontal overflow on desktop or mobile homepage after the swap.

## Technical notes
- This only touches the Wellmark logo file and its import in `src/data/insurances.ts`.
- The `InsuranceLogoGrid` sizing rules (`max-h-16`/`max-h-20`/`max-h-24`) remain unchanged.
- After cropping, the logo will use the full card width at the same cap height as other carriers, matching their visual weight.
