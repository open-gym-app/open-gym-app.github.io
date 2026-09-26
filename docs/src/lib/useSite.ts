import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import type {Site} from '../../site';

/** The names in `site.ts`, as `docusaurus.config.ts` handed them to the browser bundle. */
export default function useSite(): Site {
  return useDocusaurusContext().siteConfig.customFields?.site as Site;
}
