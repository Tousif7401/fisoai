import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { articles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import { ArticleContent } from '@/components/ArticleContent';

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <ArticleContent article={article} />
      <Footer />
    </div>
  );
}
