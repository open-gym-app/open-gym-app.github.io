# OpenGym

OpenGym is an open-source Android application that helps you track your workouts and gym progression. It provides a gamified experience to motivate users and keep them engaged over time.

## Features

### Workout Management

- Create, customize, and manage personalized workout sessions from an exercise library
  - Each exercise includes a muscle map highlighting the primary and secondary muscles worked
  - Save sessions as templates to start a new session in one click
- Support for supersets, circuits, drop sets, and pyramid sets
- Add notes per set and per session for context and personal reflections
- Built-in configurable rest timer between sets
- Data is persisted on app close, allowing users to resume their session where they left off

### Exercise Library

- Supports multiple exercise types, each with relevant data and personal records (PRs) to track:
  - **Bodyweight** – reps, duration
  - **Free weights** – weight, sets, reps
  - **Machines** – weight, sets, reps
  - **Cardio** – distance, duration, pace, calories
  - **Flexibility** – hold duration, range of motion
- Exercise demonstration media (images or GIFs) to guide beginners on proper form
- Plate/weight calculator to help users load the correct weight on a barbell

### Workout Plans & Suggestions

- Suggest default workout plans based on user goals and fitness level:
  - **Beginner** – short sessions, basic exercises, focused on accessible and motivating movements
  - **Intermediate** – medium-length sessions, more complex exercises, focused on effective training
  - **Advanced** – medium-length sessions, compound movements, focused on efficiency and progressive overload
- Include warm-up and cool-down suggestions based on the muscles targeted in the session
- Automatically suggest realistic goals and weight progressions based on past performance
- Support multiple training modes for progression recommendations: **strength**, **endurance**, **hypertrophy**, and **custom**

### Performance Tracking

- Track personal records (PRs) per exercise, with date and session reference:
  - Total weight lifted in a session
  - Max weight lifted in a single set
  - Max reps at a given weight
  - Computed 1RM (one-rep max estimate)
  - Real 1RM (if directly attempted)
- Track regular performance history per exercise
- Track session frequency: per week, month, and year
- Track exercise volume: number of sets and exercises per week, month, and year
- Track muscles worked per week, month, and year

### Session Statistics

- Cumulated weight lifted
- Total number of sets
- Total number of exercises
- Total number of muscles worked
- Session duration

### Progression Panels

- Progression graphs per exercise, muscle group, session, week, month, and year
- Cumulated weight lifted over a selected timeframe
- Body map visualization (on a human body diagram) of muscles worked over a selected timeframe
- Calendar view to visualize training frequency and rest days

### Body & Health Tracking

- Track body measurements over time (body weight, body fat percentage, measurements by body part)
- Visualize body composition trends alongside performance data
- Optional integration with Android Health Connect for syncing health data

### Gamification

- Inspired by apps like Habitica — earn XP through workouts, gym exploration, and community contributions
- Unlock achievements for milestones and consistency (streaks, new PRs, training frequency, etc.)
- Collect loot rewards:
  - Titles
  - Pet eggs and pets
  - Mounts
  - Secret/rare items
- Exploring new gyms on the map grants XP and rare loot

### Marketplace

- Aggregates products from multiple sports nutrition and equipment e-shops (e.g., Nutrimuscle, MyProtein)
- Users can share and discover deals, similar to a deal-sharing platform (e.g., Dealabs)
- Product listings may include affiliated or promoted items to help fund server and infrastructure costs
- Each product can be rated and reviewed by the community:
  - A review consists of a detailed written body and a star rating (1 to 5)
  - Reviews influence the product's ranking and visibility in the marketplace
- Users can add products to a personal wishlist or shopping list

### Gym Map

- Interactive map to discover and track visited gyms
- Leave advice, comments, and ratings on visited gyms
- Share your gym map with friends via a private, curated list
- Exploring new gyms on the map rewards XP and rare loot

### Notifications & Engagement

- Customizable workout reminders to maintain training consistency
- Push notifications for streak milestones, new loot drops, and relevant marketplace deals

### Data & Privacy

- All data is stored locally on the device — no internet connection required for core features
- Data can be exported in JSON format for backup or external analysis
- Local backup and restore functionality to safeguard years of workout history
- No account or authentication required; the app operates on a single-user model
- No sensitive data leaves the device without explicit user action; all network calls (marketplace, map) use HTTPS

### Customization & Accessibility

- Choose between dark and light color themes
- Configurable layout preferences
- Support for system font scaling and TalkBack (screen reader)
- Home screen widget for quick session logging without opening the app

### Monetization

- Free to download and use, with no hidden fees or subscriptions
- Supported by donations and optional in-app purchases for cosmetic or extra customization features
- Affiliated marketplace products provide an additional funding stream for infrastructure

---

## Technical Stack

- **Language**: Kotlin — native Android only (no JavaScript, React Native, or Flutter)
- **Database**: SQLite via Room (Android Jetpack)
- **Architecture**: MVVM (Model-View-ViewModel) with Clean Architecture (data / domain / presentation layers)
- **Asynchronous operations**: Kotlin Coroutines and Flow
- **Dependency injection**: Hilt (Dagger-based)
- **UI**: Jetpack Compose
- **Navigation**: Jetpack Navigation Component
- **Background tasks**: WorkManager (reminders, deferred exports)
- **Minimum SDK**: API 29 (Android 10) to ensure compatibility with modern platform features; older devices may be supported if necessary
- **Target & compile SDK**: Android 16 (latest stable release as of 2026). Always compile against the newest SDK to access up‑to‑date platform APIs and compliance.
- **Build system**: Gradle with Kotlin DSL

## Technical Preferences

- **Database schema** must be normalized to efficiently store and query workout data, with dedicated tables for exercises, sessions, sets, performance metrics, body measurements, user profile, and gamification state. Foreign key relationships must be enforced to support complex queries and data analysis.
- **Indexing** must be applied to all frequently queried columns (e.g., session date, exercise ID) to maintain fast query execution at scale — years of accumulated workout history must not degrade performance.
- **Offline-first design**: all core functionality works without an internet connection. Network-dependent features (marketplace, gym map) must degrade gracefully when offline and never block the UI.
- **Modular architecture**: the codebase is split into separate modules for `data`, `domain` (business logic), and `presentation` (UI). This ensures independent testability and long-term maintainability.
- **Performance-first**: minimize allocations in hot paths (e.g., live session logging), use lazy loading for lists, and leverage Compose's `LazyColumn` for large datasets.
- **Testing**: unit tests for all domain/business logic, integration tests for Room DAOs, and UI tests (Compose Testing / Espresso) for critical user flows.
- **Data portability**: JSON exports must be re-importable to guarantee long-term access to user data regardless of app version.
- **Accessibility**: all interactive elements must carry content descriptions; the app must support TalkBack and dynamic font sizes throughout.
- **Localization**: all user-facing strings must be externalized into resource files from the start to support future translations without code changes.
