import Link from "next/link";
import { PaginationProps } from "@/config/props";

const Pagination: React.FC<{ props: PaginationProps }> = ({ props }) => {
    return (
        <div className="text-center absolute bottom-8 w-full">
            {Array.from({ length: props.totalPages }, (_, i) => (
                <Link
                    key={i + 1}
                    href={i == 0 ? `/` : `/page/${i + 1}`}
                    className={`${i + 1 === props.currentPage ? "text-black" : "text-gray-400"} mr-1 ml-1 inline-flex items-center text-xl font-bold hover:text-blue-600 hover:border-blue-600 transition-all`}
                >
                    {i + 1}
                </Link>
            ))}
      </div>
    );
}

export { Pagination };