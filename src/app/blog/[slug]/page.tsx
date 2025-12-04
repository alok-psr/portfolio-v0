import { getPostData } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
      </Link>

      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <div className="mb-8 border-b border-border pb-8">
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <time>{postData.date}</time>
            <div className="flex gap-2">
              {postData.tags?.map((tag) => (
                <span key={tag} className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}
