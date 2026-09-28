import { clsx } from 'clsx';

import type { CSSProperties } from 'react';

import styles from './index.module.scss';

type SeparatorProps = {
  className?: string;
  style?: CSSProperties;
};

export const Separator = ({ className, style }: SeparatorProps): React.JSX.Element => {
  return <div className={clsx(styles.separator, className)} style={style} />;
};
