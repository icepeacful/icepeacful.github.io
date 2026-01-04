import Image from "next/image";
import Link from "next/link";
import { ContentBlock } from "@/components/ContentBlock";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { getArticlesMetaData } from "@/lib/article";

export default function Home() {
  const articles = getArticlesMetaData();

  return (
    <div className="min-h-[calc(80vh)] bg-white text-gray-900 font-sans relative">
      <main className="max-w-5xl mx-auto px-4 pb-20 pt-10">
        <div className="grid gap-12 items-center w-full">
          {articles.map((article) => (
            <ContentBlock key={article.id} props={article} />
          ))}
        </div>
      </main>

      <div className="mt-16 text-center absolute bottom-10 w-full">
        <Link 
          href="/posts" 
          className="inline-flex items-center text-sm font-bold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
        >
          查看所有文章 →
        </Link>
      </div>
    </div>
  );
}
