# OpenGym website

The source of <https://open-gym-app.github.io>: the landing page, the user guide, the developer
documentation and the privacy policy of [OpenGym](https://github.com/open-gym-app/open-gym), a
free and open-source training log for Android.

It is a [Docusaurus](https://docusaurus.io) site in `docs/`, published to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Run it locally

```bash
cd docs
npm ci
npm start                    # http://localhost:3000, English only, live reload
npm start -- --locale fr     # one other locale at a time in dev mode
npm run build && npm run serve   # every locale, exactly as deployed
```

## Where things are

| Path | What |
| --- | --- |
| `docs/site.ts` | **Every name the site prints**: app name, GitHub organisation, repositories, package id, and whether the Play Store listing is live. |
| `docs/src/pages/index.tsx` | The landing page. |
| `docs/src/pages/privacy.mdx`, `docs/i18n/*/docusaurus-plugin-content-pages/privacy.mdx` | The privacy policy in four languages. **Generated**, see below. |
| `docs/docs/` | The guide and the developer pages (English). |
| `docs/i18n/<locale>/code.json` | The landing page's translations (French, Spanish, Brazilian Portuguese). |
| `docs/static/img/screens/` | Phone screenshots, exported from the app's own previews. |
| `docs/scripts/` | The generators for the privacy pages, the screenshots and the data-model diagram. |

## Renaming the app

Edit the constants at the top of `docs/site.ts` and rebuild. Pages, docs and translations read
the name from there: React pages through `useSite()`, Markdown through `<AppName />`,
`<RepoLink />`, `<Issue />`, `<NewIssueLink />`, `<AndroidPackage />` and `<CloneCommand />`,
and translations through an `{appName}` placeholder. Then:

- rename this repository to `<new-org>.github.io` if the organisation changes, since GitHub Pages
  serves an organisation site from the root only under that name;
- regenerate the privacy pages from the renamed app repository (below);
- replace `docs/static/img/logo.png` and `favicon.png` if the logo changes. The app's README
  loads `img/logo.png` from this site, so keep that path.

After `npm run write-translations`, delete the `title` and `logo.alt` keys from
`i18n/*/docusaurus-theme-classic/navbar.json` and `copyright` from `footer.json`. They are
copies of the name; without them each locale falls back to `site.ts`.

## The privacy policy

The source of truth is `release/PRIVACY*.md` in the app repository, reviewed with the app's
code (#45). This site publishes it word for word. After any change there:

```bash
python3 docs/scripts/sync-privacy.py ../open-gym/release          # regenerate the four pages
python3 docs/scripts/sync-privacy.py ../open-gym/release --check  # or just verify them
```

The Play Store listing links to `https://open-gym-app.github.io/privacy`, so that path must never
change or break.

## Regenerating the screenshots

The phones on the site are the app's Roborazzi preview references, rendered at a real phone's
size and density instead of the 1× the app keeps them at. In a scratch checkout of the app
(never commit this), add a setup option to `AccessibleComposePreviewTester.kt` in
`core/testing` and pass it next to `AccessibilityCheckOption`:

```kotlin
private object PhoneSize : RoborazziComposeSetupOption {
    override fun configure(configBuilder: RoborazziComposeSetupOption.ConfigBuilder) {
        configBuilder.addRobolectricQualifier("w393dp")
        configBuilder.addRobolectricQualifier("h852dp")
        configBuilder.addRobolectricQualifier("xxxhdpi")
    }
}
```

Then record and export:

```bash
./gradlew recordRoborazziDebug                                     # in the scratch checkout
python3 docs/scripts/export-screens.py <path to the scratch checkout>
```

## The data-model diagram

`docs/docs/developers/data-model.mdx` embeds a Mermaid diagram generated from the schema Room
exports:

```bash
python3 docs/scripts/schema-to-mermaid.py \
  ../open-gym/core/data/schemas/com.opengym.core.data.db.OpenGymDatabase/1.json
```

Paste the output between the `mermaid` fences, and do it again with every schema version.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
