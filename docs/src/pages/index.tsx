import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import Phone from '@site/src/components/Phone';
import useSite from '@site/src/lib/useSite';
import styles from './index.module.css';

/**
 * The hero's one moving part: a bench press logged set by set, the volume adding up under it.
 * Pure CSS so it plays before hydration; under reduced motion it is simply the finished log.
 */
function SetLog(): ReactNode {
  const sets = [
    {kg: 60, reps: 10},
    {kg: 70, reps: 8},
    {kg: 75, reps: 6},
  ];
  // What the counter reads before the first set, then after each one, written the locale's way.
  const {currentLocale} = useDocusaurusContext().i18n;
  const format = new Intl.NumberFormat(currentLocale);
  const totals = [0, 600, 1160, 1610].map((kg) => format.format(kg));
  return (
    <figure
      className={styles.setLog}
      aria-label={translate({
        id: 'home.hero.log.label',
        message: 'Example: three sets of bench press, 60 kg × 10, 70 kg × 8 and 75 kg × 6, adding up to 1,610 kg.',
      })}>
      <figcaption className={styles.setLogName} aria-hidden>
        <Translate id="home.hero.log.exercise">Bench press</Translate>
      </figcaption>
      <ol className={styles.setRows} aria-hidden>
        {sets.map((set, i) => (
          <li key={i} className={styles.setRow} style={{'--i': i} as React.CSSProperties}>
            <span className={styles.setIndex}>{i + 1}</span>
            <span className={styles.setLoad}>
              {set.kg}
              <small>kg</small>
            </span>
            <span className={styles.setTimes}>×</span>
            <span className={styles.setReps}>{set.reps}</span>
            <svg className={styles.setTick} viewBox="0 0 24 24" aria-hidden>
              <path d="M4 12.5 9.5 18 20 6.5" />
            </svg>
          </li>
        ))}
      </ol>
      <div className={styles.setTotal} aria-hidden>
        <span className={styles.setTotalLabel}>
          <Translate id="home.hero.log.volume">Volume</Translate>
        </span>
        <span className={styles.setTotalValue}>
          <span className={styles.setReadings}>
            {totals.map((t, i) => (
              <span key={t} style={{'--i': i} as React.CSSProperties}>
                {t}
              </span>
            ))}
          </span>
          <small>kg</small>
        </span>
      </div>
    </figure>
  );
}

function InstallButton({className}: {className?: string}): ReactNode {
  const {playStorePublished, playStoreUrl} = useSite();
  if (playStorePublished) {
    return (
      <Link className={clsx('button button--primary button--lg', className)} href={playStoreUrl}>
        <Translate id="home.install.play">Get it on Google Play</Translate>
      </Link>
    );
  }
  return (
    <span className={clsx(styles.soon, className)}>
      <Translate id="home.install.soon">Coming soon to Google Play</Translate>
    </span>
  );
}

function Hero(): ReactNode {
  const {appName, appRepoUrl} = useSite();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="home.hero.title">Log the work. Watch it add up.</Translate>
          </Heading>
          <p className={styles.heroLead}>
            <Translate id="home.hero.lead" values={{appName}}>
              {
                '{appName} is a training log for Android. Sets, records, progress and a little play, all of it on your phone and none of it anywhere else.'
              }
            </Translate>
          </p>
          <SetLog />
          <div className={styles.heroActions}>
            <InstallButton />
            <Link className={clsx('button button--lg', styles.ghost)} href={appRepoUrl}>
              <Translate id="home.hero.source">Read the source</Translate>
            </Link>
          </div>
          <p className={styles.heroFacts}>
            <Translate id="home.hero.facts">Free. No account. No ads. Android 8 and up.</Translate>
          </p>
        </div>
        <div className={styles.heroPhones}>
          <Phone
            screen="home"
            className={styles.heroPhoneBack}
            eager
            alt={translate({
              id: 'home.hero.phone.home',
              message: 'The home screen: level, this week, and the quest board.',
            })}
          />
          <Phone
            screen="session-active"
            className={styles.heroPhoneFront}
            eager
            alt={translate({
              id: 'home.hero.phone.session',
              message: 'A workout in progress: bench press, three sets ticked, the fourth with its target.',
            })}
          />
        </div>
      </div>
    </header>
  );
}

function Promises(): ReactNode {
  const {appRepoUrl} = useSite();
  const items: {title: ReactNode; body: ReactNode}[] = [
    {
      title: <Translate id="home.promise.local.title">Nothing leaves your phone</Translate>,
      body: (
        <Translate id="home.promise.local.body">
          The app does not even ask Android for internet access. Your training history lives on
          the device, and you decide if it ever goes anywhere else.
        </Translate>
      ),
    },
    {
      title: <Translate id="home.promise.free.title">No account, no ads</Translate>,
      body: (
        <Translate id="home.promise.free.body">
          Open it and start logging. There is nobody to sign up with, nothing to subscribe to and
          nothing to sell you.
        </Translate>
      ),
    },
    {
      title: <Translate id="home.promise.open.title">Open source</Translate>,
      body: (
        <Translate
          id="home.promise.open.body"
          values={{
            link: (
              <Link href={appRepoUrl}>
                <Translate id="home.promise.open.link">on GitHub</Translate>
              </Link>
            ),
          }}>
          {'Licensed under the GPL v3. Every line is {link}: read it, build it, improve it.'}
        </Translate>
      ),
    },
  ];
  return (
    <section className={styles.promises}>
      <div className={clsx('container', styles.promiseGrid)}>
        {items.map((item, i) => (
          <div key={i} className={styles.promise}>
            <Heading as="h2" className={styles.promiseTitle}>
              {item.title}
            </Heading>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type ChapterProps = {
  id: string;
  title: ReactNode;
  lead: ReactNode;
  points: {term: ReactNode; detail: ReactNode}[];
  screens: {name: string; alt: string}[];
  more?: {to: string; label: ReactNode};
  flip?: boolean;
};

function Chapter({id, title, lead, points, screens, more, flip}: ChapterProps): ReactNode {
  return (
    <section id={id} className={clsx(styles.chapter, flip && styles.chapterFlip)}>
      <div className={clsx('container', styles.chapterGrid)}>
        <div className={styles.chapterCopy}>
          <Heading as="h2" className={styles.chapterTitle}>
            {title}
          </Heading>
          <p className={styles.chapterLead}>{lead}</p>
          <dl className={styles.points}>
            {points.map((p, i) => (
              <div key={i}>
                <dt>{p.term}</dt>
                <dd>{p.detail}</dd>
              </div>
            ))}
          </dl>
          {more && (
            <Link className={styles.more} to={more.to}>
              {more.label}
            </Link>
          )}
        </div>
        <div className={clsx(styles.chapterPhones, screens.length > 1 && styles.chapterPhonesPair)}>
          {screens.map((s) => (
            <Phone key={s.name} screen={s.name} alt={s.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapters(): ReactNode {
  return (
    <>
      <Chapter
        id="logging"
        title={<Translate id="home.log.title">Built for the minute between sets</Translate>}
        lead={
          <Translate id="home.log.lead">
            Weight, reps and effort, one tap per set. Everything else stays out of the way until
            you need it.
          </Translate>
        }
        points={[
          {
            term: <Translate id="home.log.target.term">A target for every set</Translate>,
            detail: (
              <Translate id="home.log.target.detail">
                What you did last time sits next to each set, with the load to try next, paced to
                your goal and experience. Nothing is logged until you accept it.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.log.rest.term">A rest timer that keeps time</Translate>,
            detail: (
              <Translate id="home.log.rest.detail">
                It starts when you tick a set, and buzzes on the second even with the screen off.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.log.kinds.term">Every kind of set</Translate>,
            detail: (
              <Translate id="home.log.kinds.detail">
                Warm-ups, drop sets, sets to failure and supersets, with RPE when you want it.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.log.plate.term">A plate calculator for your rack</Translate>,
            detail: (
              <Translate id="home.log.plate.detail">
                Tell it which plates your gym has and it loads the bar for you, per side.
              </Translate>
            ),
          },
        ]}
        screens={[
          {
            name: 'session-resting',
            alt: translate({
              id: 'home.log.phone.rest',
              message: 'The rest timer counting down above the set table.',
            }),
          },
          {
            name: 'plate-calculator',
            alt: translate({
              id: 'home.log.phone.plate',
              message: 'The plate calculator loading 100 kg on a 20 kg bar.',
            }),
          },
        ]}
        more={{to: '/docs/guide/logging', label: <Translate id="home.log.more">How logging works</Translate>}}
      />
      <Chapter
        id="progress"
        flip
        title={<Translate id="home.progress.title">See every kilo add up</Translate>}
        lead={
          <Translate id="home.progress.lead">
            Finish a workout and the numbers are already there: volume, records and what you have
            been training, over a week or over years.
          </Translate>
        }
        points={[
          {
            term: <Translate id="home.progress.records.term">Personal records, found for you</Translate>,
            detail: (
              <Translate id="home.progress.records.detail">
                Heaviest set, most reps, best volume and an estimated one-rep max, for every
                exercise.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.progress.charts.term">Charts for every lift</Translate>,
            detail: (
              <Translate id="home.progress.charts.detail">
                From the last seven days to all time, with each session one tap away.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.progress.muscles.term">The muscles you actually train</Translate>,
            detail: (
              <Translate id="home.progress.muscles.detail">
                A body map of the sets each muscle got, and a calendar shaded by the day's volume.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.progress.body.term">Your body, too</Translate>,
            detail: (
              <Translate id="home.progress.body.detail">
                Body weight, body fat and tape measurements, charted next to your training.
              </Translate>
            ),
          },
        ]}
        screens={[
          {
            name: 'stats',
            alt: translate({
              id: 'home.progress.phone.stats',
              message: 'The stats screen: cumulative volume chart, sessions per week, records and muscles trained.',
            }),
          },
          {
            name: 'progression',
            alt: translate({
              id: 'home.progress.phone.exercise',
              message: 'Bench press progression: estimated one-rep max and volume per session over three months.',
            }),
          },
        ]}
        more={{to: '/docs/guide/progress', label: <Translate id="home.progress.more">Everything it tracks</Translate>}}
      />
      <Chapter
        id="play"
        title={<Translate id="home.play.title">Something to come back for</Translate>}
        lead={
          <Translate id="home.play.lead">
            Consistency is the hard part, so the app makes a small game of it. It never gets in the
            way of the log.
          </Translate>
        }
        points={[
          {
            term: <Translate id="home.play.xp.term">XP and levels</Translate>,
            detail: (
              <Translate id="home.play.xp.detail">
                Every set, session and record earns XP, from Newcomer all the way to Legend.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.play.quests.term">Weekly and monthly quests</Translate>,
            detail: (
              <Translate id="home.play.quests.detail">
                Train three times, break a record, move twenty tonnes. They reset, so there is
                always another.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.play.streak.term">Streaks that forgive a missed day</Translate>,
            detail: (
              <Translate id="home.play.streak.detail">
                Three saves a month keep a streak alive through one missed day.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.play.loot.term">Loot and medals</Translate>,
            detail: (
              <Translate id="home.play.loot.detail">
                Finished sessions can drop anything from a chalk block to an iron crown, and
                achievements are yours for good.
              </Translate>
            ),
          },
        ]}
        screens={[
          {
            name: 'session-levelup',
            alt: translate({
              id: 'home.play.phone.levelup',
              message: 'The end of a workout: level 4 reached, 285 XP earned.',
            }),
          },
          {
            name: 'quests',
            alt: translate({
              id: 'home.play.phone.quests',
              message: 'The quest log: level 13, Steel Forged, a six-day streak and this week\'s quests.',
            }),
          },
        ]}
        more={{to: '/docs/guide/quests', label: <Translate id="home.play.more">How XP and quests work</Translate>}}
      />
      <Chapter
        id="library"
        flip
        title={<Translate id="home.library.title">Start from what you know</Translate>}
        lead={
          <Translate id="home.library.lead">
            A library of 873 exercises ships inside the app, with the muscles each one works and
            how to do it. Add your own in seconds.
          </Translate>
        }
        points={[
          {
            term: <Translate id="home.library.search.term">Search and filter</Translate>,
            detail: (
              <Translate id="home.library.search.detail">
                By name, muscle or equipment, from barbell to resistance band.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.library.templates.term">Templates</Translate>,
            detail: (
              <Translate id="home.library.templates.detail">
                Build one, or save a finished workout as one, and start it again in one tap.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.library.notes.term">Notes where you need them</Translate>,
            detail: (
              <Translate id="home.library.notes.detail">
                A seat setting on an exercise, how a session felt. They are there next time.
              </Translate>
            ),
          },
        ]}
        screens={[
          {
            name: 'library',
            alt: translate({
              id: 'home.library.phone.library',
              message: 'The exercise library grouped by muscle, with personal records beside each exercise.',
            }),
          },
          {
            name: 'templates',
            alt: translate({
              id: 'home.library.phone.templates',
              message: 'Five templates, each with its exercise count, length and category.',
            }),
          },
        ]}
        more={{to: '/docs/guide/library', label: <Translate id="home.library.more">Exercises and templates</Translate>}}
      />
      <Chapter
        id="data"
        title={<Translate id="home.data.title">Your data, on your terms</Translate>}
        lead={
          <Translate id="home.data.lead">
            Years of training deserve better than a server you do not control. It all stays on
            your phone, and you can take it with you whenever you like.
          </Translate>
        }
        points={[
          {
            term: <Translate id="home.data.export.term">Export and restore</Translate>,
            detail: (
              <Translate id="home.data.export.detail">
                Every workout, template, record and setting in one open JSON file, and a new
                phone set up from it in seconds.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.data.auto.term">Weekly backup, on its own</Translate>,
            detail: (
              <Translate id="home.data.auto.detail">
                While the phone charges overnight. The three latest are kept.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.data.delete.term">Delete means delete</Translate>,
            detail: (
              <Translate id="home.data.delete.detail">
                One setting erases everything, for good. There is no copy anywhere else to forget
                about.
              </Translate>
            ),
          },
        ]}
        screens={[
          {
            name: 'backup',
            alt: translate({
              id: 'home.data.phone.backup',
              message: 'The backup screen: 184 sessions on this device, export, weekly auto-backup and restore.',
            }),
          },
        ]}
        more={{to: '/privacy', label: <Translate id="home.data.more">Read the privacy policy</Translate>}}
      />
      <Chapter
        id="everyone"
        flip
        title={<Translate id="home.everyone.title">Made for every hand</Translate>}
        lead={
          <Translate id="home.everyone.lead">
            Every screen is checked with TalkBack and at twice the font size before it ships.
          </Translate>
        }
        points={[
          {
            term: <Translate id="home.everyone.a11y.term">Accessible by default</Translate>,
            detail: (
              <Translate id="home.everyone.a11y.detail">
                Charts read as sentences, the rest timer speaks, and every control is big enough
                for a chalky thumb.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.everyone.lang.term">Four languages</Translate>,
            detail: (
              <Translate id="home.everyone.lang.detail">
                English, French, Spanish and Brazilian Portuguese, in the words people use at the
                gym.
              </Translate>
            ),
          },
          {
            term: <Translate id="home.everyone.units.term">Your units, your theme</Translate>,
            detail: (
              <Translate id="home.everyone.units.detail">
                Kilograms or pounds, light or dark. Switch any time; nothing you logged changes.
              </Translate>
            ),
          },
        ]}
        screens={[
          {
            name: 'session-active-dark',
            alt: translate({
              id: 'home.everyone.phone.session',
              message: 'A workout in progress in dark mode.',
            }),
          },
          {
            name: 'stats-dark',
            alt: translate({
              id: 'home.everyone.phone.dark',
              message: 'The stats screen in dark mode.',
            }),
          },
        ]}
        more={{
          to: '/docs/guide/accessibility',
          label: <Translate id="home.everyone.more">Accessibility and languages</Translate>,
        }}
      />
    </>
  );
}

function NotYet(): ReactNode {
  const items: {title: ReactNode; body: ReactNode}[] = [
    {
      title: <Translate id="home.next.market.title">Marketplace</Translate>,
      body: (
        <Translate id="home.next.market.body">
          Share templates and challenges, and try other people's.
        </Translate>
      ),
    },
    {
      title: <Translate id="home.next.map.title">Gym map</Translate>,
      body: <Translate id="home.next.map.body">Find gyms and equipment near you.</Translate>,
    },
    {
      title: <Translate id="home.next.health.title">Health Connect</Translate>,
      body: (
        <Translate id="home.next.health.body">
          Sync body weight and body fat with Android's health hub. Off until you turn it on.
        </Translate>
      ),
    },
  ];
  return (
    <section className={styles.notYet}>
      <div className="container">
        <div className={styles.notYetHead}>
          <Heading as="h2" className={styles.notYetTitle}>
            <Translate id="home.next.title">Not built yet</Translate>
          </Heading>
          <p>
            <Translate id="home.next.lead">
              These are planned, not promised. They already have a greyed-out row in Settings, so
              nothing moves when they arrive.
            </Translate>
          </p>
        </div>
        <ul className={styles.notYetList}>
          {items.map((item, i) => (
            <li key={i}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
        <Link className={styles.more} to="/docs/roadmap">
          <Translate id="home.next.more">See the roadmap</Translate>
        </Link>
      </div>
    </section>
  );
}

function Closing(): ReactNode {
  const {appName} = useSite();
  return (
    <section className={styles.closing}>
      <div className={clsx('container', styles.closingInner)}>
        <Heading as="h2" className={styles.closingTitle}>
          <Translate id="home.closing.title">Your next session goes here.</Translate>
        </Heading>
        <p>
          <Translate id="home.closing.body" values={{appName}}>
            {'{appName} is free. There is no trial, and nothing is locked behind a payment.'}
          </Translate>
        </p>
        <div className={styles.heroActions}>
          <InstallButton />
          <Link className={clsx('button button--lg', styles.ghost)} to="/docs/intro">
            <Translate id="home.closing.guide">Read the guide</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {appName} = useSite();
  return (
    <Layout
      title={translate(
        {id: 'home.meta.title', message: '{appName}: a private training log for Android'},
        {appName},
      )}
      description={translate({
        id: 'home.meta.description',
        message:
          'Free, open-source workout tracker for Android. Log sets, track records and progress, earn XP. No account, no ads, and no internet permission.',
      })}>
      <Hero />
      <main>
        <Promises />
        <Chapters />
        <NotYet />
        <Closing />
      </main>
    </Layout>
  );
}
