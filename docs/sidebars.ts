import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Two audiences, two sidebars: people who train with the app, and people who work on it.
const sidebars: SidebarsConfig = {
  guide: [
    'intro',
    {
      type: 'category',
      label: 'Training',
      collapsed: false,
      items: ['guide/logging', 'guide/templates', 'guide/library'],
    },
    {
      type: 'category',
      label: 'Progress',
      collapsed: false,
      items: ['guide/progress', 'guide/body', 'guide/quests'],
    },
    {
      type: 'category',
      label: 'Your app',
      collapsed: false,
      items: ['guide/settings', 'guide/reminders', 'guide/backup', 'guide/accessibility'],
    },
    'faq',
    'roadmap',
  ],
  developers: [
    'developers/overview',
    'developers/architecture',
    'developers/data-model',
    'developers/export-format',
    'developers/translating',
    'developers/brand',
    'developers/contributing',
  ],
};

export default sidebars;
