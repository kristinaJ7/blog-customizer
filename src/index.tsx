import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	ArticleSettings,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для хранения текущих настроек статьи
	const [articleSettings, setArticleSettings] = useState<ArticleSettings>({
		font: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		textColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	// Применяем настройки как CSS-переменные
	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty('--font-family', articleSettings.font);
		root.style.setProperty('--font-size', articleSettings.fontSize);
		root.style.setProperty('--font-color', articleSettings.textColor);
		root.style.setProperty('--bg-color', articleSettings.backgroundColor);
		root.style.setProperty('--container-width', articleSettings.contentWidth);
	}, [articleSettings]);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.font,
					'--font-size': articleSettings.fontSize,
					'--font-color': articleSettings.textColor,
					'--container-width': articleSettings.contentWidth,
					'--bg-color': articleSettings.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={setArticleSettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
