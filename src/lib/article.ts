import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import html from 'remark-html';
import { remark } from 'remark';
import { readAllFilesInDirectory } from './file';

const articlesPath = path.join(process.cwd(), 'content/articles');
const ARTICLES_PER_PAGE = 5;

export function getPaginatedArticles(page: number) {
  const allArticles = getArticlesMetaData();
  const totalArticles = allArticles.length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  const offset = (page - 1) * ARTICLES_PER_PAGE;
  const articles = allArticles.slice(offset, offset + ARTICLES_PER_PAGE);

  return {
    articles,
    totalPages,
    currentPage: page
  };
}

export function getArticlesMetaData() {
  const files = readAllFilesInDirectory(articlesPath);
  
  const allArticlesData = files.map((file) => {
    if (!file.endsWith('.md')) {
        return null;
    }
    const id = file.replace(/\.md$/, '');

    const fileContents = fs.readFileSync(file, 'utf8');

    const matterResult = matter(fileContents);
    matterResult.data.excerpt = matterResult.data.excerpt === '' ? matterResult.content.slice(0, 40) + "..." : matterResult.data.excerpt;

    return {
      id,
      ...(matterResult.data as { title: string; date: string; category: string; excerpt: string }),
    };
  }).filter((item): item is { id: string; title: string; excerpt: string; date: string; category: string; } => item !== null);

  return allArticlesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleData(id: string, category: string) {
  const fileName = `${id}.md`;
  const articlePath = path.join(articlesPath, category, fileName);
  const fileContents = fs.readFileSync(articlePath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; category: string; excerpt: string }),
  };
}