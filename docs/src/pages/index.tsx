import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Open-source Android workout tracker built with Kotlin and Jetpack Compose">
      <header className={`hero hero--primary ${styles.heroBanner}`}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/intro">
              Get Started
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              href="https://github.com/open-gym-app/.github">
              View on GitHub
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}
