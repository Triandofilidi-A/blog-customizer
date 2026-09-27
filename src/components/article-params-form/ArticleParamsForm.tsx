import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  contentWidthArr,
  fontSizeOptions,
  fontColors,
  backgroundColors,
} from 'src/constants/articleProps.ts';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup.tsx';
import { Select } from 'src/ui/select/Select.tsx';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType, OptionType } from 'src/constants/articleProps.ts';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export const ArticleParamsForm = ({
  onApply,
  isOpen,
  onToggle,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [draftSettings, setDraftSettings] =
    useState<ArticleStateType>(defaultArticleState);
  const containerRef = useRef<HTMLElement>(null);

  const handleChange =
    (field: keyof ArticleStateType): ((option: OptionType) => void) =>
    (option: OptionType): void => {
      setDraftSettings((prev) => ({
        ...prev,
        [field]: option,
      }));
    };

  const handleApplyClick = (): void => {
    onApply(draftSettings);
  };

  const handleResetClick = (): void => {
    setDraftSettings(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target as Node;
      const isClickInsideForm = containerRef.current?.contains(target);
      const isClickInsideArrow = (target as HTMLElement).closest(
        '[aria-label="Открыть/Закрыть форму параметров статьи"]'
      );

      if (!isClickInsideForm && !isClickInsideArrow) {
        onToggle();
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return (): void => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onToggle]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />

      <aside
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
        ref={containerRef}
      >
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.header}>
            <Text size={31} weight={800} uppercase>
              ЗАДАЙТЕ ПАРАМЕТРЫ
            </Text>
          </div>

          <Select
            title="ШРИФТ"
            options={fontFamilyOptions}
            selected={draftSettings.fontFamilyOption}
            onChange={handleChange('fontFamilyOption')}
          />

          <RadioGroup
            title="РАЗМЕР ШРИФТА"
            name="fontSize"
            options={fontSizeOptions}
            selected={draftSettings.fontSizeOption}
            onChange={handleChange('fontSizeOption')}
          />

          <Select
            title="ЦВЕТ ШРИФТА"
            options={fontColors}
            selected={draftSettings.fontColor}
            onChange={handleChange('fontColor')}
          />

          <Separator
            style={{
              background: '#C4C4C4',
              margin: '24px 0',
            }}
          />

          <Select
            title="ЦВЕТ ФОНА"
            options={backgroundColors}
            selected={draftSettings.backgroundColor}
            onChange={handleChange('backgroundColor')}
          />

          <Select
            title="ШИРИНА КОНТЕНТА"
            options={contentWidthArr}
            selected={draftSettings.contentWidth}
            onChange={handleChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="СБРОСИТЬ" type="clear" onClick={handleResetClick} />
            <Button title="ПРИМЕНИТЬ" type="apply" onClick={handleApplyClick} />
          </div>
        </form>
      </aside>
    </>
  );
};
