import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';

import useSite from '../../lib/useSite';

/** The app's name, from `site.ts`. Write `<AppName />` in any page instead of the name. */
export function AppName(): ReactNode {
  return useSite().appName;
}

type RepoLinkProps = {
  /** A path inside the app repository, e.g. `docs/PERSISTENCE.md`. Omit for the repository itself. */
  path?: string;
  children?: ReactNode;
};

/**
 * A link into the app's source repository. Without children it prints the path as code, which
 * is how the developer pages refer to a file.
 */
export function RepoLink({path, children}: RepoLinkProps): ReactNode {
  const {appRepoUrl} = useSite();
  if (!path) {
    return <Link href={appRepoUrl}>{children ?? appRepoUrl.replace('https://', '')}</Link>;
  }
  const kind = path.endsWith('/') ? 'tree' : 'blob';
  return (
    <Link href={`${appRepoUrl}/${kind}/main/${path.replace(/\/$/, '')}`}>
      {children ?? <code>{path}</code>}
    </Link>
  );
}

/** A link to an issue or pull request in the app repository: `<Issue n={45} />` prints `#45`. */
export function Issue({n}: {n: number}): ReactNode {
  const {appRepoUrl} = useSite();
  return <Link href={`${appRepoUrl}/issues/${n}`}>#{n}</Link>;
}

/** The link that files a new issue, with its label as children. */
export function NewIssueLink({children}: {children: ReactNode}): ReactNode {
  return <Link href={useSite().newIssueUrl}>{children}</Link>;
}

/**
 * The Android application id as code, with optional text around it: a build-type suffix such as
 * `.debug`, or the path it appears in (`prefix="Android/data/"`).
 */
export function AndroidPackage({prefix = '', suffix = ''}: {prefix?: string; suffix?: string}): ReactNode {
  return <code>{prefix + useSite().androidPackage + suffix}</code>;
}

/** The commands that clone and build the app, with the repository URL from `site.ts`. */
export function CloneCommand(): ReactNode {
  const {appRepoUrl, appRepo} = useSite();
  return (
    <CodeBlock language="bash">
      {[
        `git clone ${appRepoUrl}.git`,
        `cd ${appRepo}`,
        './gradlew assembleDebug   # app/build/outputs/apk/debug/',
        './gradlew installDebug    # onto a connected phone or emulator',
      ].join('\n')}
    </CodeBlock>
  );
}
