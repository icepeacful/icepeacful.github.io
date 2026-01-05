export interface ContentBlockProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
}

export interface PaginationProps {
    totalPages: number;
    currentPage: number;
}