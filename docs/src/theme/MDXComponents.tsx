import MDXComponents from '@theme-original/MDXComponents';

import {
  AndroidPackage,
  AppName,
  CloneCommand,
  Issue,
  NewIssueLink,
  RepoLink,
} from '@site/src/components/Names';
import {Screen, Screens} from '@site/src/components/Screen';

// Available in every .md/.mdx page without an import. `<AppName />` is what keeps the app's
// name out of the prose: see site.ts.
export default {
  ...MDXComponents,
  AppName,
  AndroidPackage,
  CloneCommand,
  RepoLink,
  Issue,
  NewIssueLink,
  Screen,
  Screens,
};
