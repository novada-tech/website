import { defaultBlockPositions, blockSize } from '../config/logoBlocks';
import type { BlockPosition } from '../config/logoBlocks';
import styles from './Logo.module.css';

interface LogoProps {
  blocks?: BlockPosition[];
  logoSrc?: string;
  logoAlt?: string;
}

export function Logo({
  blocks = defaultBlockPositions,
  logoSrc = '/assets/logo/Novada_Logo_RGB_Donkerblauw.svg',
  logoAlt = 'NovAda Logo',
}: LogoProps): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        {/* Decorative blocks */}
        <div className={styles.blocks} aria-hidden="true">
          {blocks.map((block, index) => (
            <div
              key={index}
              className={styles.block}
              style={{
                left: `calc(50% + ${block.x}px)`,
                top: `calc(50% + ${block.y}px)`,
                width: `${block.size ?? blockSize}px`,
                height: `${block.size ?? blockSize}px`,
              }}
            />
          ))}
        </div>

        {/* Logo image */}
        <img src={logoSrc} alt={logoAlt} className={styles.logo} />
      </div>
    </div>
  );
}
