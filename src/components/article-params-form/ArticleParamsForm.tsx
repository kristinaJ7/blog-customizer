import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

// Тип настроек статьи
export type ArticleSettings = {
	font: string;
	fontSize: string;
	textColor: string;
	backgroundColor: string;
	contentWidth: string;
};

// Начальные значения
const INITIAL_SETTINGS: ArticleSettings = {
	font: fontFamilyOptions[0].value,
	fontSize: fontSizeOptions[0].value,
	textColor: fontColors[0].value,
	backgroundColor: backgroundColors[0].value,
	contentWidth: contentWidthArr[0].value,
};

// Пропсы компонента
type ArticleParamsFormProps = {
	onApply: (settings: ArticleSettings) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [settings, setSettings] = useState<ArticleSettings>(INITIAL_SETTINGS);
	// Реф для отслеживания кликов
	const formRef = useRef<HTMLDivElement>(null);

	// Хук для закрытия при клике вне формы
	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: formRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	// Обработка отправки формы
	const handleApply = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(settings); // Передаём настройки в родитель
		setIsOpen(false); // Добавляем закрытие
	};

	// Сброс настроек
	const handleReset = () => {
		setSettings(INITIAL_SETTINGS);
		onApply(INITIAL_SETTINGS); // Сразу применяем дефолтные
		setIsOpen(false);
	};

	//Кнопка открытия/закрытия
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

			{isOpen && (
				<aside //Панель настроек (появляется при isOpen === true)
					className={clsx(styles.container, isOpen && styles.container_open)}
					ref={formRef}>
					<form className={styles.form} onSubmit={handleApply}>
						<Text
							as='h2'
							size={31}
							weight={800}
							align='left'
							family='open-sans'>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>

						<Select //Поля настройки
							options={fontFamilyOptions}
							selected={
								fontFamilyOptions.find(
									(option) => option.value === settings.font
								) ?? fontFamilyOptions[0]
							}
							onChange={(option) =>
								setSettings((prev) => ({
									...prev,
									font: option.value,
								}))
							}
							title='Шрифт'
						/>

						<RadioGroup
							name='fontSize'
							options={fontSizeOptions} //список доступных шрифтов
							selected={
								//текущий выбранный шрифт
								fontSizeOptions.find(
									(option) => option.value === settings.fontSize
								) ?? fontSizeOptions[0]
							}
							onChange={(
								option //— обновляет settings при выборе нового значения
							) =>
								setSettings((prev) => ({
									...prev,
									fontSize: option.value,
								}))
							}
							title='Размер шрифта'
						/>

						<Select
							options={fontColors}
							selected={
								fontColors.find(
									(option) => option.value === settings.textColor
								) ?? fontColors[0]
							}
							onChange={(option) =>
								setSettings((prev) => ({
									...prev,
									textColor: option.value,
								}))
							}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={
								backgroundColors.find(
									(option) => option.value === settings.backgroundColor
								) ?? backgroundColors[0]
							}
							onChange={(option) =>
								setSettings((prev) => ({
									...prev,
									backgroundColor: option.value,
								}))
							}
							title='Цвет фона'
						/>

						<Select
							options={contentWidthArr}
							selected={
								contentWidthArr.find(
									(option) => option.value === settings.contentWidth
								) ?? contentWidthArr[0]
							}
							onChange={(option) =>
								setSettings((prev) => ({
									...prev,
									contentWidth: option.value,
								}))
							}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button // Сбросить — вызывает handleReset
								title='Сбросить'
								htmlType='button'
								type='clear'
								onClick={handleReset}
							/>

							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
