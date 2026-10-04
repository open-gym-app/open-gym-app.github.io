import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

type ArtworkProps = {
  /** A file under `static/brand/svg/`, without the extension. */
  name: string;
  alt: string;
  caption?: ReactNode;
  /**
   * The tile behind the artwork. Brand files are drawn for a given background, not for the
   * site's theme: the no-outline mascot vanishes on dark, so it always sits on cream.
   */
  tile?: 'cream' | 'ink';
  /** Rendered height in px; the width follows the file's aspect ratio. */
  height?: number;
};

/** One brand file on its intended background, with an optional caption. Wrap in `<Artworks>`. */
export function Artwork({name, alt, caption, tile = 'cream', height = 140}: ArtworkProps): ReactNode {
  return (
    <figure className={styles.figure}>
      <div className={`${styles.tile} ${styles[tile]}`}>
        <img src={useBaseUrl(`/brand/svg/${name}.svg`)} alt={alt} style={{height}} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Several `<Artwork>`s side by side, centred as a group, wrapping on a phone. */
export function Artworks({children}: {children: ReactNode}): ReactNode {
  return <div className={styles.row}>{children}</div>;
}

/** A colour swatch, its name and its value. */
export function Swatch({name, hex}: {name: string; hex: string}): ReactNode {
  return (
    <figure className={styles.swatch}>
      <span className={styles.chip} style={{background: hex}} />
      <figcaption>
        <strong>{name}</strong>
        <code>{hex}</code>
      </figcaption>
    </figure>
  );
}
