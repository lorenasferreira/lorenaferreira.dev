# Lorkut — Design System

A lightweight reference for maintaining visual, interaction and code consistency across the Lorkut frontend.

The design system should preserve the project's Orkut-inspired identity while allowing the interface to evolve as a modern developer portfolio.

This is a guide, not a rigid component library.

---

## Visual Direction

Lorkut is a modern reinterpretation of the visual language and social experience of classic Orkut.

The interface should feel:

- Nostalgic
- Playful
- Personal
- Recognizable
- Friendly
- Structured
- Lightweight
- Developer-focused
- Intentionally retro without feeling outdated

The goal is not to create an exact Orkut clone.

Instead, familiar elements from social networks should be adapted to present:

- Professional experience
- Development projects
- Technologies
- Communities
- Portfolio media
- Scraps
- Personal information

### Preserve

Elements that contribute strongly to the Lorkut identity:

- Profile-oriented layouts
- Community cards
- Scrapbook interactions
- Familiar social-network navigation
- Compact information blocks
- Counters and profile statistics
- Orkut-inspired terminology
- Pink and blue visual references
- White content surfaces
- Light backgrounds
- Small nostalgic UI details

### Avoid

- Turning the interface into a generic SaaS dashboard
- Excessive modern glassmorphism
- Large gradients without purpose
- Heavy shadows
- Excessive animations
- Excessive rounded cards
- Replacing nostalgic elements simply because they look "old"
- Adding visual effects that compete with portfolio content
- Modernizing every component until the Orkut identity disappears
- Reproducing Orkut so literally that usability suffers

Modernize the experience, not the personality.

---

## Colors

Colors should be defined through reusable CSS variables whenever possible.

Prefer:

```css
var(--color-...)
```

over hardcoded values inside individual components.

The palette should preserve the recognizable Lorkut relationship between:

- Pink accents
- Blue navigation and links
- Soft blue/lilac backgrounds
- White content surfaces
- Neutral text
- Subtle borders

### Color Roles

Colors should have clear responsibilities.

Examples:

```text
Primary Pink
→ brand accents
→ selected states
→ important identity details

Primary Blue
→ navigation
→ links
→ interactive elements

Background
→ application/page background

Surface
→ cards
→ profile areas
→ content containers

Border
→ subtle separation between UI areas

Text
→ primary readable content

Muted Text
→ metadata and secondary information
```

Do not introduce new colors without checking whether an existing token can serve the same purpose.

---

## Typography

Typography should support the nostalgic interface without compromising readability.

### Primary Typography

Used for:

- Navigation
- Paragraphs
- Project descriptions
- Buttons
- Labels
- Metadata
- Form elements
- Most interface content

Prioritize readability at smaller sizes.

### Headings

Headings should create clear hierarchy without becoming oversized.

Lorkut is intentionally closer to a social-network interface than a modern marketing landing page.

Avoid unnecessarily large display typography.

### Typography Principle

Hierarchy should come from:

- Size
- Weight
- Color
- Spacing
- Position
- Context

Not every distinction requires a different font.

---

## Application Layout

The interface should preserve the feeling of a profile-based social platform.

Depending on the page, layouts may combine:

```text
Profile / Sidebar
+
Main Content
+
Secondary Content
```

or simpler content structures when appropriate.

Consistency should come from:

- Shared widths
- Spacing
- Borders
- Typography
- Surface treatment
- Navigation behavior

Do not force every page into exactly the same composition.

---

## Content Surfaces

White or light surfaces are an important part of the visual identity.

Typical surfaces include:

- Profile cards
- Project areas
- Community cards
- Scrapbook
- Information panels
- Media areas
- Statistics

Prefer subtle separation through:

```css
border: 1px solid var(--color-border);
```

and background contrast.

Avoid relying on large shadows to separate content.

---

## Spacing

Lorkut intentionally uses a more compact interface than editorial portfolio projects.

Spacing should feel:

- Organized
- Readable
- Compact
- Consistent

Avoid both extremes:

- Extremely compressed layouts
- Excessive modern whitespace that removes the social-network feeling

Use existing spacing patterns before introducing arbitrary new values.

Responsive spacing can use:

```css
clamp(...)
```

when appropriate.

---

## Borders & Shadows

Borders are generally preferred over shadows.

Typical treatment:

```css
border: 1px solid var(--color-border);
```

Shadows should be:

- Rare
- Subtle
- Functional

Do not introduce large floating-card shadows simply to make the interface look more modern.

---

## Border Radius

Rounded corners should remain restrained.

The interface should not become a collection of highly rounded modern cards.

Use border radius consistently according to component type.

Small nostalgic UI elements may intentionally use tighter shapes.

---

## Links

Links are an important part of the Orkut-inspired visual language.

They should remain clearly recognizable as interactive elements.

Use consistent:

- Color
- Hover behavior
- Focus state
- Cursor behavior

Links should not become visually indistinguishable from regular text.

---

## Buttons

Buttons should be used when an actual action is performed.

Examples:

- Submit scrap
- Approve content
- Navigate through an explicit CTA
- Trigger an application interaction

Do not replace natural text links with buttons unnecessarily.

Button hierarchy may include:

```text
Primary
Secondary
Utility
```

Interactions should remain lightweight.

Avoid:

- Heavy shadows
- Excessive scaling
- Long animations
- Decorative motion without feedback value

---

## Motion & Interaction

Animations should reinforce interaction rather than transform the portfolio into an animation showcase.

Good uses:

- Hover feedback
- Small transitions
- Loading feedback
- Counter transitions
- Subtle entrance effects
- Small nostalgic interactions

Avoid:

- Constant movement
- Large parallax effects
- Excessive page transitions
- Animations that delay navigation
- Motion that makes the social-network interface harder to use

---

## Component Architecture

Frontend components should be organized according to their responsibility.

Prefer clear responsibility over premature abstraction.

Typical categories may include:

```text
components/
├── common/
├── layout/
└── ...
```

Feature-specific components may remain close to the page or feature that owns them when that makes the architecture easier to understand.

Do not create folders or abstractions only because they might be useful someday.

---

## Common Components

A component belongs in a shared/common area when it has genuine reuse across the application.

Good candidates include:

- Shared buttons
- Loading states
- Empty states
- Common cards
- Navigation elements
- Reusable counters
- Reusable media components

Before extracting a component, verify that the abstraction actually reduces duplication or improves consistency.

---

## Feature Components

Lorkut contains several distinct portfolio features.

Examples:

```text
Projects
Communities
Scraps
Photos
Videos
Profile
Counters
```

Feature-specific behavior should remain understandable without requiring developers to navigate through unnecessary abstraction layers.

Keep related:

- UI
- Data mapping
- Feature behavior

logically close when appropriate.

---

## Projects

Project presentation should balance the nostalgic interface with professional portfolio requirements.

Every project should prioritize:

1. Project identity
2. Clear description
3. Technologies
4. Visual preview
5. Relevant links
6. Individual project details

The Orkut theme should frame the work, not make the work difficult to understand.

Project detail pages may provide more visual freedom than compact project listings.

---

## Communities

Communities are one of the strongest thematic elements of Lorkut.

They should feel recognizable as social-network communities while representing:

- Technologies
- Interests
- Skills
- Professional identity
- Development culture

Community presentation should remain compact and visually consistent.

---

## Scraps

Scraps should preserve the feeling of a personal guestbook.

The interface should clearly distinguish:

- Existing scraps
- Author information
- Message content
- Submission interaction

The feature should remain playful while still being understandable to users unfamiliar with Orkut.

Demo scraps are intentional portfolio content and should not be removed simply during visual refactoring.

---

## Counters

Counters reinforce the profile/social-network concept.

They should:

- Be visually compact
- Be easy to scan
- Reflect real application data where applicable
- Remain synchronized with displayed content

Do not use fake dynamic values when real values are available.

---

## Media

Portfolio media may come from:

- Static frontend assets
- Cloudinary
- Backend data

Application assets belong inside the frontend structure.

Documentation images do not.

Documentation screenshots belong in:

```text
docs/screenshots/
```

Do not mix documentation assets with application assets.

---

## Responsive Strategy

Responsive behavior should preserve the information hierarchy rather than simply shrink the desktop interface.

Development should verify:

```text
Desktop
↓
Tablet
↓
Mobile
```

On smaller screens, layouts may:

- Stack columns
- Simplify secondary content
- Adjust navigation
- Reduce spacing
- Reorder information
- Change grid density
- Adapt media sizes

Mobile should remain recognizably Lorkut.

Do not remove important functionality simply because the original desktop composition does not fit.

---

## Accessibility

Nostalgia should never override accessibility.

Always consider:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Image alternative text
- Form labels
- Button semantics
- Link semantics
- Responsive text
- Reduced motion where appropriate

Interactive elements must remain identifiable without relying exclusively on color.

---

## Internationalization

User-facing text should use the existing `react-i18next` infrastructure where appropriate.

Avoid introducing hardcoded UI strings into translated areas.

When changing interface content:

1. Update translation keys
2. Check supported languages
3. Verify layout with different text lengths
4. Avoid assuming translated strings occupy the same space

---

## API & UI States

Components consuming backend data should account for:

```text
Loading
Success
Empty
Error
```

A backend failure should not unnecessarily crash or blank the entire frontend.

Prefer graceful degradation where possible.

For example:

- Show loading feedback while projects are requested
- Show an empty state when no content exists
- Show a useful error state when the API is unavailable

Do not assume every API request will succeed.

---

## Code Conventions

### Components

Use PascalCase:

```text
ProjectCard
CommunityCard
ScrapForm
ProfileHeader
```

### CSS Modules

Use camelCase:

```text
projectCard
profileHeader
communityGrid
scrapMessage
```

### Component Structure

When a component has dedicated styling, prefer:

```text
ComponentName/
├── ComponentName.jsx
└── ComponentName.module.css
```

Keep very small components simple when an additional folder adds no value.

---

## Import Order

Prefer:

1. React / external libraries
2. Application services or hooks
3. Components
4. Assets
5. CSS Module

Example:

```js
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getProjects } from "../../services/projects";

import ProjectCard from "../../components/ProjectCard";

import styles from "./Projects.module.css";
```

---

## Services

Frontend API requests should remain centralized in service modules rather than scattered throughout components.

Example:

```text
src/
└── services/
    ├── projects.js
    ├── scraps.js
    └── ...
```

Components should focus primarily on:

- Rendering
- User interaction
- Local UI state

Service modules should handle communication with the backend.

---

## Environment Configuration

Do not hardcode production API URLs throughout components.

Use environment configuration such as:

```text
VITE_API_URL
```

Local and production environments may point to different backend URLs.

Never commit:

- Passwords
- Database credentials
- Private keys
- Sensitive environment values

---

## Before Changing an Existing Component

Ask:

1. Is the component actually broken?
2. What problem does the change solve?
3. Will the change affect another page?
4. Does it preserve the Lorkut identity?
5. Is an existing pattern already solving this?
6. Does the component depend on backend data?
7. Have loading and error states been considered?
8. Will the change still work responsively?

Then modify it.

---

## Before Creating a Component

Ask:

1. What is its responsibility?
2. Is it genuinely reusable?
3. Does something similar already exist?
4. Should it belong to a specific feature instead?
5. Does extracting it make the code easier to understand?
6. Is the abstraction solving a current problem or an imaginary future one?

Do not create abstractions for hypothetical future use.

---

## Refactoring Principle

Lorkut is already a functioning full-stack application.

Prefer:

```text
Understand
↓
Isolate
↓
Change
↓
Test
↓
Commit
```

over large rewrites.

After meaningful frontend changes verify:

- Home/profile
- Projects
- Individual project pages
- Communities
- Scraps
- Photos
- Videos
- Counters
- Navigation
- Responsive behavior
- API-dependent content

---

## Reuse in Future Projects

Some engineering patterns from Lorkut may be reused in future applications.

Good candidates:

- Frontend/backend repository separation
- Service layer organization
- Environment configuration
- API state handling
- CSS Modules conventions
- Responsive workflow
- Accessibility practices
- Documentation structure

Do **not** blindly reuse:

- Lorkut colors
- Orkut-inspired UI
- Community presentation
- Scrapbook concepts
- Profile layout
- Nostalgic interaction patterns

Reuse the **architecture and engineering principles**, not the project's visual identity.

---

## Core Principle

Lorkut should always feel like:

**"What if my developer portfolio were my Orkut profile?"**

Every visual change should strengthen either:

- The portfolio experience
- The Orkut-inspired identity
- Usability

Ideally, all three.