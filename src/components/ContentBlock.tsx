import Link from "next/link";
import { ContentBlockProps } from "@/config/props";

const ContentBlock: React.FC<{ props: ContentBlockProps }> = ({ props }) => {
    return (
        <article key={props.id} className="group cursor-pointer">
            <Link href={`/articles/${props.category}/${props.id}`}>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between">
                <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    {props.category}
                </span>
                <h3 className="text-2xl font-semibold mt-2 group-hover:text-blue-600 transition-colors">
                    {props.title}
                </h3>
                <p className="mt-3 text-gray-500 leading-relaxed max-w-2xl whitespace-pre-wrap">
                    {props.excerpt}
                </p>
                </div>
                <time className="text-sm text-gray-400 mt-4 md:mt-0 whitespace-nowrap">
                {props.date}
                </time>
            </div>
            </Link>
        </article>
    )
}

export { ContentBlock };