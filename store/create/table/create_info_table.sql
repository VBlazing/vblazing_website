DROP TABLE IF EXISTS home_info;
DROP TABLE IF EXISTS blog_summaries;
DROP TABLE IF EXISTS about_me;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE home_info (
	locale VARCHAR(50) NOT NULL,
	welcome VARCHAR(100) NOT NULL,
	title VARCHAR(100) NOT NULL,
	subtitle TEXT NOT NULL,
	PRIMARY KEY (locale)
);

INSERT INTO home_info
VALUES
	('en', 'Welcome to my personal website', 'Technology, Stories & Thoughts', 'A collection of reflections on technology, life, and everything in between. Join me on this journey of discovery and growth.'),
	('zh', '欢迎来到我的个人网页', '技术、故事与思考', '收录关于技术、生活和各种感悟的文章合集。与我一起踏上这段发现和成长的旅程。');

CREATE TABLE blog_summaries (
	id UUID NOT NULL DEFAULT uuid_generate_v4(),
	locale VARCHAR(50) NOT NULL,
	title VARCHAR(50) NOT NULL,
	content TEXT NOT NULL,
	PRIMARY KEY (id, locale)
);

INSERT INTO blog_summaries (locale, title, content)
VALUES
	('en', 'Travel experiences', 'Interesting stories seen and heard during the journey'),
	('zh', '旅途见闻', '旅途中看到听到的有趣故事'),
	('en', 'Tech blog', 'Technical articles with personal insights, continuously updated with high-quality content'),
	('zh', '技术博客', '技术文章与个人理解，持续更新高质量内容'),
	('en', 'Reflections on life', 'On the way to the pier for some fries, my head is filled with whimsical and wandering thoughts'),
	('zh', '人生思考', '去码头整点薯条的路上脑子里装一些奇思妙想、胡思乱想');

CREATE TABLE about_me (
	locale VARCHAR(50) NOT NULL,
	avatar VARCHAR(1024) NOT NULL,
	title VARCHAR(50) NOT NULL,
	subtitle TEXT NOT NULL,
	story TEXT NOT NULL,
	interests VARCHAR(50)[] NOT NULL,
	PRIMARY KEY (locale)
);

INSERT INTO about_me
VALUES
	('en', 'https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/avatar_200x200.png', 'Hello, I''m Blazer', 'Dedicated to becoming a freelance developer who provides value to others, sharing thoughts on technology, life, and everything in between', '### Who am I

Front-end developer, AI enthusiast, a knowledge-hungry, and a fitness lover.

### What am I supposed to do here

- Share technical blogs, express opinions, and share perspectives
- Record creative ideas and showcase personal projects
- Document personal plans
- Share interesting stories from travels
- Let more people get to know me
- Offer small bits of value to those who stumble upon this site, contribute a little light to the internet, and leave behind some traces of myself', '{"technology", "finance", "movie", "fitness", "swimming", "books", "Intense competition"}'),
	('zh', 'https://vblazing-blog-1253367486.cos.accelerate.myqcloud.com/image/avatar_200x200.png', '你好陌生人，叫我布雷泽', '致力于成为一名能为他人提供价值的自由开发者，分享对科技、生活以及一切事物的看法～', '### 我是谁

前端开发工程师、AI 技术追随者、对知识足够贪婪、健身爱好者

### 在这里要做什么

- 在这里分享一些技术博客、发表一些看法、输出一些观点
- 记录自己的脑洞、展示自己的产品
- 记录个人规划
- 搬运旅途中的趣事
- 希望大家认识我
- 为不小心点进网站的人提供一些微不足道的价值，为互联网发光发热，为自己留下一些痕迹', '{"科技", "金融", "电影", "健身", "游泳", "书籍", "激烈的比赛"}');
	