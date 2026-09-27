/**
 * Every name the site prints, in one place.
 *
 * The app and its repositories are due to be renamed. Change the values below and rebuild:
 * the navbar, footer, landing page, privacy policy and every doc page read them from here
 * (docs and MDX pages through the `<AppName />` and `<RepoLink />` components, the React
 * pages and translations through `useSite()`), so no page hard-codes a name.
 *
 * This file is imported by `docusaurus.config.ts`, which runs in Node, and by the browser
 * bundle — keep it free of anything but plain values.
 */

/** The product name, exactly as the app's launcher label spells it. */
export const APP_NAME = 'OpenGym';

/** The GitHub organisation that owns both repositories. */
export const GITHUB_ORG = 'open-gym-app';

/** The app's source repository, inside {@link GITHUB_ORG}. */
export const APP_REPO = 'open-gym';

/**
 * This site's repository. A GitHub Pages *user/organisation* site must be named
 * `<org>.github.io` to be served from the root, which is what keeps `baseUrl` at `/`.
 */
export const SITE_REPO = `${GITHUB_ORG}.github.io`;

/** The Android application id, which is what a Play Store link is built from. */
export const ANDROID_PACKAGE = 'com.opengym.app';

/**
 * Set to `true` once the listing is live (#49): every install button turns from a
 * "coming soon" note into a link to the Play Store.
 */
export const PLAY_STORE_PUBLISHED = false;

// Derived — nothing below needs editing on a rename.

export const SITE_URL = `https://${GITHUB_ORG}.github.io`;
export const GITHUB_ORG_URL = `https://github.com/${GITHUB_ORG}`;
export const APP_REPO_URL = `${GITHUB_ORG_URL}/${APP_REPO}`;
export const SITE_REPO_URL = `${GITHUB_ORG_URL}/${SITE_REPO}`;
export const ISSUES_URL = `${APP_REPO_URL}/issues`;
export const NEW_ISSUE_URL = `${ISSUES_URL}/new`;
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;

export const site = {
  appName: APP_NAME,
  githubOrg: GITHUB_ORG,
  appRepo: APP_REPO,
  siteRepo: SITE_REPO,
  androidPackage: ANDROID_PACKAGE,
  playStorePublished: PLAY_STORE_PUBLISHED,
  siteUrl: SITE_URL,
  githubOrgUrl: GITHUB_ORG_URL,
  appRepoUrl: APP_REPO_URL,
  siteRepoUrl: SITE_REPO_URL,
  issuesUrl: ISSUES_URL,
  newIssueUrl: NEW_ISSUE_URL,
  playStoreUrl: PLAY_STORE_URL,
} as const;

export type Site = typeof site;
