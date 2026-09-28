import { clsx } from 'clsx';
import { useState } from 'react';
import { ArticleParamsForm } from 'src/components/article-params-form';
import { Article } from 'src/components/article/Article.tsx';
import { defaultArticleState } from 'src/constants/articleProps.ts';

import type { CSSProperties } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [appliedSettings, setAppliedSettings] =
    useState<ArticleStateType>(defaultArticleState);

  const handleApplySettings = (newSettings: ArticleStateType): void => {
    setAppliedSettings(newSettings);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedSettings.fontFamilyOption.value,
          '--font-size': appliedSettings.fontSizeOption.value,
          '--font-color': appliedSettings.fontColor.value,
          '--container-width': appliedSettings.contentWidth.value,
          '--bg-color': appliedSettings.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onApplySettings={handleApplySettings} />
      <Article />
    </main>
  );
};
