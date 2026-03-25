# Job Board — Frontend Take-Home Task

A responsive job board search page built with React, TypeScript, Vite, Tailwind CSS, and TanStack Query.

## Setup & Running

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Time Spent

~5–6 hours total, split roughly as:

- Project scaffolding, config, types: ~30 min
- API layer + custom hooks: ~30 min
- Core components (JobCard, JobList, JobDetail): ~2 h
- Search bar + country dropdown: ~45 min
- Responsive layout + mobile modal: ~1 h
- CSS polish (scrollbars, description HTML, badges): ~30 min

## Architecture

```
src/
├── api/
│   ├── client.ts        # apiFetch base helper
│   ├── jobs.ts          # fetchJobs / fetchJobDetail
│   └── countries.ts     # fetchCountries
├── hooks/
│   ├── useJobSearch.ts  # useInfiniteQuery — paginated job search
│   ├── useJobDetail.ts  # useQuery — single job detail (lazy)
│   └── useCountries.ts  # useQuery — countries list (cached forever)
├── components/
│   ├── SearchBar.tsx         # keyword + country + submit
│   ├── JobList.tsx           # infinite scroll list
│   ├── JobCard.tsx           # individual card with selected state
│   ├── JobDetail.tsx         # shared detail view (sidebar + modal)
│   ├── JobDetailModal.tsx    # mobile full-screen modal wrapper
│   ├── CompanyLogo.tsx       # image with deterministic initials fallback
│   ├── WorkArrangementBadge.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── types/index.ts
├── utils.ts             # formatRelativeDate, formatSalary, getInitials
├── App.tsx              # layout + state orchestration
└── main.tsx             # QueryClientProvider entry point
```

**Key decisions:**

- `useInfiniteQuery` drives the paginated list; `initialPageParam: 0` avoids an `undefined` first-page guard. The sentinel `<div>` at the bottom of the list is observed by `IntersectionObserver` (`rootMargin: 200px`) to trigger prefetch before the user hits the bottom.
- `useJobDetail` is enabled only when `selectedJobId !== null` — no requests until a card is clicked.
- Desktop uses two independent sticky+scrollable columns via `position: sticky` + `overflow-y: auto` + `max-height: calc(100vh - ...)`. The job description inside the detail panel scrolls independently.
- Mobile replaces the sidebar with a `fixed inset-0` modal that locks body scroll, with a fixed bottom bar containing Back + Apply Now.
- `CompanyLogo` generates a deterministic hue from the company name for the initials fallback, so each company gets a consistent (and distinct) color without a lookup table.
- `offset + limit` is capped at 10,000 in `getNextPageParam` per the API spec.

## What I'd Add With More Time

- **URL state sync** — push search params + selected job ID into the URL query string so the page is shareable and the browser back button works as expected.
- **Keyboard navigation** — arrow keys to move between cards, Enter to open detail.
- **Optimistic selected state** — show the card's list-level data immediately in the sidebar while the full detail fetches (skeleton for the description only).
- **Debounced search** — optionally trigger search on keystroke after a delay rather than requiring form submit.
- **Virtualized list** — for very long result sets (1000+ cards rendered in DOM), `@tanstack/react-virtual` would keep scroll performance smooth.
- **More filter options** — work arrangement filter, salary range slider.
- **Accessible focus trap** in the mobile modal.
- **E2E tests** with Playwright covering search, infinite scroll, and the mobile modal flow.
