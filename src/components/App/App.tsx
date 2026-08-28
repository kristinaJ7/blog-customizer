import { useState } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { ArticleSettings } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] = useState<ArticleSettings>({
		font: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		textColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.font,
					'--font-size': articleSettings.fontSize,
					'--font-color': articleSettings.textColor,
					'--bg-color': articleSettings.backgroundColor,
					'--container-width': articleSettings.contentWidth,
				} as React.CSSProperties
			}>
			<ArticleParamsForm onApply={setArticleSettings} />
			<Article articleSettings={articleSettings} />
		</main>
	);
};
