import { clsx } from 'clsx';
import { useState } from 'react';
import { ArticleParamsForm } from 'src/components/article-params-form';
import { defaultArticleState } from 'src/constants/articleProps.ts';

import { Article } from '../article/Article';

import type { ArticleStateType } from '@/constants/articleProps';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [appliedSettings, setAppliedSettings] =
    useState<ArticleStateType>(defaultArticleState);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const handleToggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };
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
      <ArticleParamsForm
        onApply={handleApplySettings}
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
      />
      <Article />
    </main>
  );
};
