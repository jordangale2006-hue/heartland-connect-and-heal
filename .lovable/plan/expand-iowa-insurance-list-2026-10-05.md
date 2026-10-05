# Expand Iowa insurance list

Iowa now accepts: Wellmark Blue Cross Blue Shield, Medicare, Aetna, Cigna, and self-pay. Arizona content, pricing, styling and tone stay unchanged.

## Edits
1. Announcement bar: "New: Now accepting Iowa patients — Wellmark BCBS, Medicare, Aetna, Cigna & self-pay."
2. Hero subheadline: "Iowa: Wellmark Blue Cross Blue Shield, Medicare, Aetna, Cigna, and self-pay accepted."
3. Iowa section: "**Insurance:** Wellmark Blue Cross Blue Shield of Iowa, Medicare, Aetna, and Cigna." Keep the HMO referral note.
4. Insurance tiles (Iowa): Wellmark, Medicare, Aetna, Cigna, Cashpay, using the existing logos. Wellmark label becomes "Wellmark Blue Cross Blue Shield of Iowa". Remove the "Additional Iowa insurance plans coming soon" line.
5. Disclaimer: "In Iowa, we currently accept Wellmark Blue Cross Blue Shield of Iowa, Medicare, Aetna, Cigna, and cash pay. Plan availability may vary by product."
6. Insurance checker: Medicare, Aetna and Cigna show as accepted for Iowa. This happens automatically once the shared Iowa list is updated.
7. Homepage FAQ "Do you accept insurance?": name the Iowa list and keep "contact us to verify your specific coverage before your first appointment."
8. Meta/AI text: update the Book page description, which says "Wellmark BCBS Iowa HMO and cash pay in Iowa", and the Iowa line in llms.txt.

## Technical details
- In `src/data/insurances.ts`, rename the Wellmark key/name to "Wellmark Blue Cross Blue Shield of Iowa", set the Iowa list to `[Wellmark, Medicare, Aetna, Cigna, Cashpay]` and update the Iowa notice. Then update the reference in `InsuranceLogosStrip.tsx`.
- Make the text edits in `AnnouncementBar.tsx`, `Index.tsx` (subhead + FAQ), `IowaLaunchSection.tsx`, `InsurancesAccepted.tsx`, `BookAppointment.tsx` and `public/llms.txt`.
- Check that the build passes.
