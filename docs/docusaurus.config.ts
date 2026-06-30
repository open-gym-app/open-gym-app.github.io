import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GITHUB_URL = 'https://github.com/open-gym-app/.github';

const config: Config = {
  title: 'OpenGym',
  tagline: 'Open-source Android workout tracker',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://open-gym-app.github.io',
  baseUrl: '/',

  organizationName: 'open-gym-app',
  projectName: '.github',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: ['docusaurus-plugin-drawio'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `${GITHUB_URL}/tree/main/docs/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OpenGym',
      logo: {
        alt: 'OpenGym Logo',
        src: 'img/logo.png',
        width: 28,
        height: 28,
        style: {borderRadius: '6px'},
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: GITHUB_URL,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'DB Schema', to: '/docs/architecture/db-schema'},
            {label: 'Cache Schema', to: '/docs/architecture/cache-schema'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: GITHUB_URL},
            {label: 'Issues', href: `${GITHUB_URL}/issues`},
            {label: 'Contributing', href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md`},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenGym contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['kotlin'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
