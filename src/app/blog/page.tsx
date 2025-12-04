import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <PageHeader 
        title="BLOG" 
        description="Thoughts, tutorials, and updates on my journey." 
      />

      <div className="space-y-8">
        {allPostsData.map(({ id, date, title, description, tags }) => (
          <Link
            key={id}
            href={`/blog/${id}`}
            className="block group border-b border-border pb-8 hover:border-accent transition-colors"
          >
            <article className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <time>{date}</time>
                <div className="flex gap-2">
                  {tags?.map((tag) => (
                    <span key={tag} className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">
                {title}
              </h2>
              <p className="text-muted-foreground">{description}</p>
              <div className="flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Read more <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
