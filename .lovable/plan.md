# Expand Heartland care to Iowa

## Goal
Update the website from an Arizona-only practice to a statewide Arizona and Iowa practice, while keeping insurance information accurate by state and making appointment times clear for each client’s local time zone.

## Website updates
- Replace Arizona-only wording across the homepage, About, Services, Conditions, Contact, Booking, Blog, Careers, quiz, provider, trust, and error-page content with accurate Arizona-and-Iowa language.
- Keep the practice clearly 100% virtual; retain the Arizona mailing address as mailing-only and do not add an Iowa office or map.
- Update page titles, descriptions, structured search data, the AI summary file, and app description to include statewide service in Arizona and Iowa.
- Update condition-page descriptions and FAQs so all existing condition pages accurately describe availability in both states.
- Update provider/licensure badges from Arizona-only language to Arizona-and-Iowa language, based on the confirmed expansion.

## State-specific insurance
- Add a state choice wherever clients check insurance or request an appointment.
- Keep the current Arizona insurance list and Arizona AHCCCS/Medicaid notice unchanged for Arizona clients.
- Show only these confirmed Iowa payment options for Iowa clients:
  - Wellmark Blue Cross Blue Shield of Iowa (HMO)
  - Cash Pay
- Use the supplied Iowa-specific plan name in visible copy and search data; do not imply that other current carriers are accepted in Iowa.
- Adjust insurance logos and lists so the visible options match the selected state without changing the current Arizona presentation.

## Appointments and local time
- Add the client’s state to appointment requests so staff can distinguish Arizona and Iowa leads.
- Explain that the secure scheduling portal displays available appointments in the client’s local time zone.
- Keep the existing external scheduling portal and avoid manually converting appointment times on the website.
- Label office hours with both Arizona and Iowa equivalents where hours are displayed, accounting for daylight-saving differences rather than using a permanently incorrect fixed conversion.

## Iowa-specific support and discovery
- Add Iowa alongside Arizona in structured service-area data and representative statewide location language.
- Add an Iowa crisis resource alongside the existing Arizona and national crisis resources, using an official source and preserving the emergency disclaimer.
- Regenerate the sitemap only if the implementation adds state-specific URLs; otherwise retain the current shared URLs.

## Technical details
- Centralize state, insurance, and service-area data so visible lists and search metadata stay consistent.
- Extend the appointment request data and submission flow with a state field, including a database migration with access grants and existing security rules preserved.
- Update appointment notification and confirmation content to include the selected state.
- Preserve the current visual style, navigation, booking behavior, and mobile layout.
- Verify the two state-specific insurance paths, appointment submission, scheduler messaging, metadata, and mobile/desktop presentation.

## Confirmed decisions
- Iowa is an additional statewide service area; Arizona remains supported.
- Iowa insurance is limited to Wellmark Blue Cross Blue Shield of Iowa (HMO) and Cash Pay.
- Appointment availability should be shown in each client’s local time through the scheduling portal.
