import type {ReactNode} from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

type Props = {
  /** A file name under `static/img/screens/`, without the extension. */
  screen: string;
  alt: string;
  className?: string;
  /** The hero's phones load eagerly; everything below the fold waits until it is scrolled to. */
  eager?: boolean;
};

/**
 * One app screen in a phone outline. The screenshots are the app's own Compose preview
 * references, rendered at 393dp and 4× density — see the README for how to regenerate them.
 */
export default function Phone({screen, alt, className, eager = false}: Props): ReactNode {
  const src = useBaseUrl(`/img/screens/${screen}.webp`);
  return (
    <div className={clsx(styles.phone, className)}>
      <img
        src={src}
        alt={alt}
        width={720}
        height={1560}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
