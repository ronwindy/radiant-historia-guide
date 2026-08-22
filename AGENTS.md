# Agent Instructions

## Version Control

- **Git:** Never perform `git commit` or `git push` commands without explicit user acceptance for each specific action. Do not use `SafeToAutoRun: true` for these commands.

## Testing & Verification

- **Browser Testing:** Do not use browser testing or browser automation tools unless explicitly prompted by the user. Let the user do all verification themselves.

## Script Execution & Safety

- **Pre-execution Explanation:** Whenever you intend to create or run a script (or execute shell commands) that requires user approval, provide a brief but sufficient explanation covering:
  - The purpose and actions of the script/command.
  - Potential security issues, file/system modifications, or side effects.
  - Why it is safe to run, giving the user sufficient confidence to approve execution.

## Strict Communication Protocol

CRITICAL: Do not answer quickly without carefully analyzing the questions or requests first. Only answer or give suggestions if you are at least 97% confident in what your responses exactly match what the user needs. In case there is not enough information, the requests or questions are not clear in context, or there are too many responses that suit the context, you should ask follow-up questions to clarify exactly what the requirements are, and respond when there is enough context.

## Game Guide Content & Formatting Protocol (Future Guides Rule)

- **Key Entity Highlighting (Yellow/Gold):** Always highlight all important **items**, **locations/places**, **characters/NPCs**, **bosses**, and **vital battle mechanics/stats** in luminous yellow/gold (`#ffd56b` / `var(--accent-gold-light)` / `<strong class="hl-gold">` / `<strong>`). This is a mandatory design rule for all present and future game guides to guarantee effortless visual scannability for players glancing at the guide during gameplay.
- **Compact Media Cards:** In-guide screenshots, box art, and physical media must be presented using compact, elegant side-by-side card containers (`.guide-media-row`, `.guide-media-col` ~190px width with dark translucent backdrops) instead of giant full-width images.
- **Prominent Crimson Boss Cards:** Boss encounters must feature prominent gothic blood-red gradient backgrounds (`.boss-card` / `.boss-card.card-crimson`), glowing borders, and recessed stat boxes to stand out as dramatic tactical milestones.

