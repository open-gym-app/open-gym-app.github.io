# Contributing to the website

Thanks for helping. This repository is only the website; the app itself, and its own
contribution guide, are at <https://github.com/open-gym-app/titan>.

## What goes where

- **A mistake or a gap in the guide:** edit the page under `docs/docs/guide/` (every page has an
  *Edit this page* link) and open a pull request.
- **Something the app does differently from what a page says:** the app is right. Fix the page,
  and mention the app's pull request that changed the behaviour.
- **The privacy policy:** do not edit the pages here. Change `release/PRIVACY*.md` in the app
  repository, then regenerate (see the README).
- **Developer reference:** the long-form documentation lives next to the code in the app's
  `docs/` directory. The developer pages here summarise it and link to it. Keep them short,
  and fix the source first.
- **Translations:** the landing page and the privacy policy are translated into French, Spanish
  and Brazilian Portuguese. Use the app's glossary in its `docs/TRANSLATION.md`, so a word on
  this site matches the word in the app.

## Writing

- Write for someone holding the app, not someone reading its code: name things by what they
  show on screen (**Start from template**, <kbd>Settings</kbd>), not by class names.
- Say only what the current app does. Planned work goes on the roadmap page, marked as planned.
- Never hard-code the app's name, organisation or repositories: use `<AppName />` and the other
  components listed in the README, so a rename stays a one-line change.

## Before opening a pull request

```bash
cd docs
npm run build      # fails on any broken link or anchor
npm run typecheck
```

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/), for example
`docs(guide): explain drop sets`.

