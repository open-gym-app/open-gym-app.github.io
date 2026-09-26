import type {ReactNode} from 'react';

import Phone from '../Phone';
import styles from './styles.module.css';

type ScreenProps = {
  /** A file name under `static/img/screens/`, without the extension. */
  name: string;
  alt: string;
  caption?: ReactNode;
};

/** A phone-framed screenshot with an optional caption, for use inside a doc page. */
export function Screen({name, alt, caption}: ScreenProps): ReactNode {
  return (
    <figure className={styles.figure}>
      <Phone screen={name} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Two or three `<Screen>`s side by side, wrapping to one per row on a phone. */
export function Screens({children}: {children: ReactNode}): ReactNode {
  return <div className={styles.row}>{children}</div>;
}
