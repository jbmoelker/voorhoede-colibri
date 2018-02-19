// This file is generated by Sapper — do not edit it!
import _4xx from '../../routes/4xx.html';
import _5xx from '../../routes/5xx.html';
import en_blog from '../../routes/en/blog/index.html';
import en_blog_$slug$ from '../../routes/en/blog/[slug].html';
import $language$ from '../../routes/[language]/index.html';
import $language$_contact from '../../routes/[language]/contact.html';
import $language$_portfolio from '../../routes/[language]/portfolio/index.html';
import $language$_team from '../../routes/[language]/team.html';
import $language$_portfolio_$slug$ from '../../routes/[language]/portfolio/[slug].html';

export const routes = [
	{ error: '4xx', module: _4xx },
	{ error: '5xx', module: _5xx },
	{ id: 'en_blog', type: 'page', pattern: /^\/en\/blog\/?$/, params: () => ({}), module: en_blog },
	{ id: 'en_blog_$slug$', type: 'page', pattern: /^\/en\/blog(?:\/([^\/]+))?\/?$/, params: match => ({ slug: match[1] }), module: en_blog_$slug$ },
	{ id: '$language$', type: 'page', pattern: /^(?:\/([^\/]+))?\/?$/, params: match => ({ language: match[1] }), module: $language$ },
	{ id: '$language$_contact', type: 'page', pattern: /^\/([^\/]+)\/contact\/?$/, params: match => ({ language: match[1] }), module: $language$_contact },
	{ id: '$language$_portfolio', type: 'page', pattern: /^\/([^\/]+)\/portfolio\/?$/, params: match => ({ language: match[1] }), module: $language$_portfolio },
	{ id: '$language$_team', type: 'page', pattern: /^\/([^\/]+)\/team\/?$/, params: match => ({ language: match[1] }), module: $language$_team },
	{ id: '$language$_portfolio_$slug$', type: 'page', pattern: /^\/([^\/]+)\/portfolio(?:\/([^\/]+))?\/?$/, params: match => ({ language: match[1], slug: match[2] }), module: $language$_portfolio_$slug$ }
];