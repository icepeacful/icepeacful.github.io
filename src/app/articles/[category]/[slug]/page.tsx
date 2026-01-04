import Link from 'next/link';
import { Metadata } from 'next';
import { getArticleData, getArticlesMetaData } from '@/lib/article';
import '@/app/articles/article.css';
import { NavBar } from '@/components/NavBar';

export async function generateStaticParams() {
  const articles = getArticlesMetaData();
  return articles.map((article) => ({
    category: article.category,
    slug: article.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string; category: string } }): Promise<{ title: string; description: string }> {
  const { slug, category } = await params;
  const articleData = await getArticleData(slug, category);
  return {
    title: articleData.title,
    description: articleData.excerpt,
  };
}

// 2. 页面组件
export default async function PostPage({ params }: { params: { slug: string; category: string } }) {
  const { slug, category } = await params;
  const postData = await getArticleData(slug, category);

  return (
    <article className="max-w-220 mx-auto px-4 pt-10 py-20">
      <header className="mb-10">
        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">
          {postData.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4">
          {postData.title}
        </h1>
        <time className="text-gray-400">{postData.date}</time>
      </header>

      <div 
        className="prose prose-slate lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </article>
  );
}