import type { FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/utils/class-names';
import { Text } from '../text';
import { TrailIcon, type TrailIconVariant } from '../trail-icon';
import styles from './styles.module.scss';

export type SectionWrapperPadding = 'none' | 'hero' | 'header-aligned';
export type SectionWrapperMinHeight = 'auto' | 'screen';

export type SectionWrapperBackgroundLoading = 'lazy' | 'eager';

export type SectionWrapperOverlayVariant = 'default' | 'dark';

export type SectionWrapperBackgroundFit = 'cover' | 'contain';

export type SectionWrapperProps = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  /** When set, shows trail row (icon + text). Text color follows `trailIconVariant`. */
  trailIconText?: ReactNode;
  trailIconVariant?: TrailIconVariant;
  /** Vite-resolved image URL (e.g. `import bg from '...png'`) */
  backgroundImage?: string;
  /** Native image loading for section backgrounds. Default: lazy. */
  backgroundImageLoading?: SectionWrapperBackgroundLoading;
  /** Cover on desktop; contain from tablet breakpoint down. */
  backgroundImageFit?: SectionWrapperBackgroundFit;
  /** Dark gradient over the background */
  overlay?: boolean;
  overlayVariant?: SectionWrapperOverlayVariant;
  paddingVariant?: SectionWrapperPadding;
  minHeight?: SectionWrapperMinHeight;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>;

export const SectionWrapper: FC<SectionWrapperProps> = ({
  children,
  className: classNameProp,
  contentClassName: contentClassNameProp,
  trailIconText,
  trailIconVariant = 'primary',
  backgroundImage,
  backgroundImageLoading = 'lazy',
  backgroundImageFit = 'cover',
  overlay = false,
  overlayVariant = 'default',
  paddingVariant = 'hero',
  minHeight = 'auto',
  style: styleProp,
  ...rest
}) => {
  const mergedClassName = classNames(
    styles['section-wrapper'],
    styles[`section-wrapper--padding-${paddingVariant}`],
    styles[`section-wrapper--min-h-${minHeight}`],
    classNameProp
  );

  const trailColor = trailIconVariant === 'primary' ? 'primary' : 'secondary';

  return (
    <section className={mergedClassName} style={styleProp} {...rest}>
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden
          loading={backgroundImageLoading}
          decoding="async"
          fetchPriority={backgroundImageLoading === 'eager' ? 'high' : 'auto'}
          className={classNames(
            styles['section-wrapper-bg-image'],
            backgroundImageFit === 'contain' && styles['section-wrapper-bg-image--contain']
          )}
        />
      ) : null}
      {overlay ? (
        <div
          className={classNames(
            styles['section-wrapper-overlay'],
            overlayVariant === 'dark' && styles['section-wrapper-overlay--dark']
          )}
          aria-hidden
        />
      ) : null}
      <div className={classNames(styles['section-wrapper-inner'], contentClassNameProp)}>
        {trailIconText ? (
          <div className={styles['section-wrapper-trail']}>
            <TrailIcon variant={trailIconVariant} />
            <Text
              as="span"
              size="trail"
              family="albert-sans"
              color={trailColor}
              weight="regular"
              textTransform="uppercase"
            >
              {trailIconText}
            </Text>
          </div>
        ) : null}
        <div className={styles['section-wrapper-content']}>{children}</div>
      </div>
    </section>
  );
};
