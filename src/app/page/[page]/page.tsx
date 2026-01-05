import Link from 'next/link';
import { getPaginatedArticles, getArticlesMetaData } from '@/lib/article';
import { ContentBlock } from '@/components/ContentBlock';
import { redirect } from 'next/navigation';
import { Pagination } from '@/components/Pagination';

const POSTS_PER_PAGE = 5;

export async function generateStaticParams() {
  const allPosts = getArticlesMetaData();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const currentPage = parseInt(page);

    if (currentPage == 1) {
        redirect("/");
        return null;
    }

    // const prevPage = currentPage - 1;
    // const nextPage = currentPage + 1;
  
    const { articles, totalPages } = getPaginatedArticles(currentPage);

    return (
        <div className="min-h-[calc(80vh)] bg-white text-gray-900 font-sans relative">
            <main className="max-w-5xl mx-auto px-4 pb-20 pt-10">
                <div className="grid gap-12 items-center w-full">
                    {articles.map((article) => (
                        <ContentBlock key={article.id} props={article} />
                    ))}
                </div>
            </main>

            <Pagination props={{ totalPages: totalPages, currentPage: currentPage }} />
        </div>
    );
}