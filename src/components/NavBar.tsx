import Link from "next/link";

export function NavBar() {
    return (
        <nav className="border-b">
        <div className="mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">春月间桐会</Link>
          <div className="space-x-6 text-sm font-medium mr-4">
            {/* <Link href="/posts" className="hover:text-blue-600 transition">文章</Link> */}
            <Link href="/about" className="hover:text-blue-600 transition">关于</Link>
          </div>
        </div>
      </nav>
    )
}