import Image from "next/image";
import Link from "next/link";
import { ContentBlock } from "@/components/ContentBlock";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import {  getPaginatedArticles, getArticlesMetaData } from "@/lib/article";
import { redirect } from "next/navigation";
import { Pagination } from "@/components/Pagination";

export default function Home() {
  // redirect("/page/1");
  // return null;

  // const articles = getArticlesMetaData();
  const { articles, totalPages } = getPaginatedArticles(1);

  return (
    <div className="min-h-[calc(80vh)] bg-white text-gray-900 font-sans relative">
      <main className="max-w-5xl mx-auto px-4 pb-20 pt-10">
        <div className="grid gap-12 items-center w-full">
          {articles.map((article) => (
            <ContentBlock key={article.id} props={article} />
          ))}
        </div>
      </main>

      <Pagination props={{ totalPages: totalPages, currentPage: 1 }} />
    </div>
  );
}
