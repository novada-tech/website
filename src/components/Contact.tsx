import { useState } from 'react';
import styles from './Contact.module.css';

/**
 * Contact component with anti-scraper protection
 * Email is obfuscated and only revealed through user interaction
 */
export function Contact(): React.JSX.Element {
  const [revealed, setRevealed] = useState(false);

  // Email parts stored separately and assembled on user action
  const emailParts = {
    user: 'info',
    domain: 'novada',
    tld: 'be',
  };

  const handleReveal = (): void => {
    setRevealed(true);
  };

  const getEmail = (): string => {
    return `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {!revealed ? (
          <button
            onClick={handleReveal}
            className={styles.revealButton}
            aria-label="Reveal contact information"
          >
            Contact
          </button>
        ) : (
          <div className={styles.contactInfo}>
            <a
              href={`mailto:${getEmail()}`}
              className={styles.emailLink}
              onClick={(e) => {
                // Additional layer: construct href on click
                e.currentTarget.href = `mailto:${getEmail()}`;
              }}
            >
              {getEmail()}
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
