import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import {
  APP_NAME,
  APP_REPO_URL,
  GITHUB_ORG,
  ISSUES_URL,
  SITE_REPO,
  SITE_REPO_URL,
  SITE_URL,
  site,
} from './site';

const config: Config = {
  title: APP_NAME,
  tagline: 'A training log for Android that keeps everything on your phone.',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  // A GitHub Pages organisation site: served from the root, so baseUrl stays `/`.
  url: SITE_URL,
  baseUrl: '/',
  trailingSlash: false,

  organizationName: GITHUB_ORG,
  projectName: SITE_REPO,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // The landing page and the privacy policy are translated into the app's four languages.
  // Docs are English only; the other locales serve the English pages under their own prefix.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'pt-BR'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      fr: {label: 'Français', htmlLang: 'fr'},
      es: {label: 'Español', htmlLang: 'es'},
      'pt-BR': {label: 'Português (Brasil)', htmlLang: 'pt-BR'},
    },
  },

  // Read by `useSite()` so React pages never import a name directly.
  customFields: {site},

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `${SITE_REPO_URL}/tree/main/docs/`,
        },
        blog: false,
        theme: {
          // Fonts are bundled, not fetched from a font CDN: the site makes no third-party request.
          customCss: [
            require.resolve('@fontsource-variable/archivo/wdth.css'),
            require.resolve('@fontsource-variable/jetbrains-mono/index.css'),
            './src/css/custom.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [{name: 'theme-color', content: '#1d1d22'}],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: APP_NAME,
      logo: {
        alt: `${APP_NAME} logo`,
        src: 'img/logo.png',
        width: 28,
        height: 28,
        style: {borderRadius: '6px'},
      },
      items: [
        {type: 'docSidebar', sidebarId: 'guide', position: 'left', label: 'Guide'},
        {type: 'docSidebar', sidebarId: 'developers', position: 'left', label: 'Developers'},
        {to: '/privacy', label: 'Privacy', position: 'left'},
        {type: 'localeDropdown', position: 'right'},
        {href: APP_REPO_URL, label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Use it',
          items: [
            {label: 'Getting started', to: '/docs/intro'},
            {label: 'Logging a workout', to: '/docs/guide/logging'},
            {label: 'Backup & restore', to: '/docs/guide/backup'},
            {label: 'FAQ', to: '/docs/faq'},
          ],
        },
        {
          title: 'Build it',
          items: [
            {label: 'Architecture', to: '/docs/developers/architecture'},
            {label: 'Data model', to: '/docs/developers/data-model'},
            {label: 'Contributing', to: '/docs/developers/contributing'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'Source code', href: APP_REPO_URL},
            {label: 'Report a problem', href: ISSUES_URL},
            {label: 'Privacy policy', to: '/privacy'},
          ],
        },
      ],
      copyright: `${APP_NAME} is free software under the GNU GPL v3.0. No account, no ads, no tracking — this site included.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['kotlin', 'bash', 'json'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
      // Natural size, scrolling sideways when wide (see custom.css), rather than shrunk to fit.
      options: {
        er: {useMaxWidth: false},
        flowchart: {useMaxWidth: false},
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
