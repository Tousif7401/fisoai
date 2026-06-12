# Calmify — Development History & TODO

## ✅ Completed

### UI Components (2024-06-10)
- [x] **Hero.tsx** - Main landing fold with "Talk to Calmify" CTA
- [x] **About.tsx** - "Why Calmify" founder story section
- [x] **Donation.tsx** - "Keep Calmify Free" donation section
- [x] **Button Styling** - Unified pill-shaped design with arrow icons
- [x] **Hover Animations** - Smooth micro-interactions across components
- [x] **Heart Icon** - Red heart accent in donation section
- [x] **Typography** - "Why Calmify" sizing, "Calmify" italic serif styling
- [x] **Text Highlights** - "for developers" with amber background
- [x] **Rounded Inputs** - Donation amount fields (rounded-3xl)
- [x] **Git Repository** - Initialized with comprehensive .gitignore

---

## 🚧 In Progress

- [ ] Landing page structure (app/page.tsx assembly)
- [ ] Component organization and imports

---

## 📋 TODO List

### Phase 1: Authentication & Database ✅ COMPLETED
- [x] Set up Supabase project
- [x] Configure GitHub OAuth
- [x] Configure Google OAuth
- [x] Set up database tables (profiles, conversations, messages, mood_checkins)
- [x] Build Login/Signup page with OAuth (`components/full-screen-signup.tsx`)
- [x] Implement auth state management (`lib/supabase/auth.ts`, `components/UserMenu.tsx`)
- [x] Add protected routes middleware (`middleware.ts`)
- [x] Real-time password validation
- [x] Show/hide password toggles
- [x] Dynamic OAuth button text ("Sign up with" / "Login with")

### Phase 2: Chat System (Core Feature)
- [ ] `components/ChatWidget.tsx` - Floating chat button
- [ ] `components/ChatPanel.tsx` - Chat UI panel
- [ ] `components/MoodCheckIn.tsx` - Mood selector (😔 😟 😐 🙂 😊)
- [ ] `lib/anthropic.ts` - Claude client setup
- [ ] `app/api/chat/route.ts` - Claude API endpoint
- [ ] Chat history storage in Supabase
- [ ] Real-time chat updates (Supabase realtime)

### Phase 3: Article System
- [ ] `components/ArticleCard.tsx`
- [ ] `app/articles/page.tsx` - Articles listing
- [ ] `app/articles/[slug]/page.tsx` - Individual article view
- [ ] `lib/articles.ts` - Article metadata
- [ ] Create sample MDX articles:
  - [ ] burnout-recovery.mdx
  - [ ] imposter-syndrome.mdx
  - [ ] deep-work.mdx
  - [ ] anxiety-for-builders.mdx
  - [ ] motivation.mdx

### Phase 4: Landing Page Folds
- [ ] **Fold 2:** What is Calmify (3-column grid)
  - [ ] Icon: "AI that listens without judgment"
  - [ ] Icon: "Articles for builder mindset"
  - [ ] Icon: "Free forever"
- [ ] **Fold 3:** AI Chat Demo
  - [ ] Embedded ChatPanel preview
  - [ ] 3 clickable example prompts
  - [ ] Pre-fill message on click
- [ ] **Fold 4:** Articles Preview
  - [ ] 3 featured ArticleCard components
  - [ ] "Browse all articles" link
- [ ] **Fold 7:** Footer
  - [ ] Logo + tagline
  - [ ] Navigation links
  - [ ] Social links
  - [ ] "Made with 💛" tagline

### Phase 5: Payment Integration
- [ ] `lib/razorpay.ts` - Razorpay client setup
- [ ] `app/api/donate/route.ts` - Payment endpoint
- [ ] One-time vs monthly toggle
- [ ] Suggested amounts (₹49, ₹149, ₹499)
- [ ] Custom amount input
- [ ] Payment success/failure handling
- [ ] Thank you page/flow

### Phase 6: Features & Polish
- [ ] Article recommendations based on chat topics
- [ ] Mood tracking history
- [ ] Profile page
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] Loading states
- [ ] Error boundaries
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit

---

## 🔧 Technical Setup

### Environment Variables Needed
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic (Claude)
ANTHROPIC_API_KEY=

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Database Schema (Supabase)
```sql
-- Tables to create
profiles (id, name, avatar_url, created_at)
conversations (id, user_id, title, mood, created_at)
messages (id, conversation_id, role, content, created_at)
mood_checkins (id, user_id, mood, note, created_at)
articles (id, title, slug, content, tags, read_time, category)
```

---

## 📊 Progress Tracking

**Overall Progress:** ~30% (Phase 1 complete, UI components done, 5 major phases remaining)

**Completed:**
- ✅ Phase 1: Authentication & Database (COMPLETE)
- ✅ Hero, About, Donation components

**Next Priority:** Phase 2 (Chat System) → Phase 3 (Article System)

---

## 💡 Notes

- Stack: Next.js 14+ (App Router) + Supabase + TypeScript + Tailwind
- No separate backend needed — Next.js API routes + Supabase sufficient
- OAuth handled entirely by Supabase (GitHub + Google)
- Articles start as MDX files, can migrate to DB later
- Chat history stored in Supabase for user continuity
- Real-time chat via Supabase realtime subscriptions

---

*Last updated: 2024-06-11*
