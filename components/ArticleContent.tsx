"use client";

import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { PageLoader } from '@/components/PageLoader';
import { useState } from 'react';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import type { Article } from '@/lib/articles';

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [showLoader, setShowLoader] = useState(false);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowLoader(true);
    setTimeout(() => {
      window.location.href = '/articles';
    }, 1500);
  };

  const handleRelatedArticleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    setShowLoader(true);
    setTimeout(() => {
      window.location.href = `/articles/${slug}`;
    }, 1500);
  };

  if (showLoader) {
    return <PageLoader onComplete={() => {}} />;
  }

  return (
    <main className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-noise opacity-20 pointer-events-none"
        style={{ backgroundImage: 'url(/Article_BG.jpg)' }}
      />

      {/* Back Navigation */}
      <section className="relative pt-32 pb-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/articles"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#DEDBC8] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="relative pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-[#DEDBC8] mb-6 inline-block">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-[-0.03em] text-[#E1E0CC] mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative py-12 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <div className="text-[#DEDBC8] leading-relaxed space-y-6">
            <p className="text-xl font-light leading-relaxed opacity-90">
              You&apos;re looking at your screen, scrolling through Twitter, and suddenly it hits you — <strong className="text-[#E1E0CC]">everyone else is building incredible things while you&apos;re stuck.</strong>
            </p>

            <p>
              They&apos;re shipping features, launching products, getting funded. And you? You&apos;re just trying to figure out why your CSS won&apos;t center.
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-[#E1E0CC] mt-12 mb-4">You&apos;re Not Alone</h2>

            <p>
              Here&apos;s the thing nobody talks about: <strong className="text-[#E1E0CC]">everyone feels this way.</strong>
            </p>

            <p>
              That senior developer you admire? They&apos;ve had nights staring at code that wouldn&apos;t work. That founder who just raised? They&apos;ve questioned if they&apos;re qualified to be building this at all.
            </p>

            <p>
              The difference is they don&apos;t post about the doubts. They post about the wins.
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-[#E1E0CC] mt-12 mb-4">What Imposter Syndrome Actually Is</h2>

            <p>
              Imposter syndrome isn&apos;t a reflection of your ability. It&apos;s a reflection of your <strong className="text-[#E1E0CC]">awareness</strong>.
            </p>

            <p>
              The fact that you feel like an imposter means:
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <span className="text-[#E1E0CC] mt-1">•</span>
                <span>You care deeply about the quality of your work</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E1E0CC] mt-1">•</span>
                <span>You&apos;re aware of how much there is to learn (and there&apos;s always more)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E1E0CC] mt-1">•</span>
                <span>You have enough humility to question yourself</span>
              </li>
            </ul>

            <p>
              These aren&apos;t weaknesses. They&apos;re the very traits that make you grow.
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-[#E1E0CC] mt-12 mb-4">The Twitter Illusion</h2>

            <p>
              Social media creates a distorted reality. You see:
            </p>

            <div className="my-6 p-6 bg-[#101010] rounded-lg border-l-2 border-green-500">
              <p className="font-medium text-green-400 mb-2">What you see:</p>
              <ul className="space-y-2 text-sm">
                <li>✅ Shipped projects</li>
                <li>✅ Launched products</li>
                <li>✅ Funding announcements</li>
              </ul>
            </div>

            <div className="my-6 p-6 bg-[#101010] rounded-lg border-l-2 border-red-500">
              <p className="font-medium text-red-400 mb-2">What you don&apos;t see:</p>
              <ul className="space-y-2 text-sm">
                <li>❌ The 50 failed attempts before the shipped project</li>
                <li>❌ The nights spent debugging a single bug</li>
                <li>❌ The moments of &quot;I have no idea what I&apos;m doing&quot;</li>
              </ul>
            </div>

            <p className="text-lg">
              <strong className="text-[#E1E0CC]">Everyone starts somewhere.</strong> Every expert you admire was once a beginner staring at a screen, feeling exactly how you feel right now.
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-[#E1E0CC] mt-12 mb-4">Reframing the Thoughts</h2>

            <p>
              When that voice says <em>&quot;they&apos;re all better than me,&quot;</em> try replacing it with:
            </p>

            <ul className="space-y-4 my-6">
              <li className="p-4 bg-[#101010] rounded-lg">&quot;They&apos;re further along in their journey, not better as a person&quot;</li>
              <li className="p-4 bg-[#101010] rounded-lg">&quot;Everyone&apos;s path is different — comparison is meaningless&quot;</li>
              <li className="p-4 bg-[#101010] rounded-lg">&quot;I&apos;m learning, and that&apos;s what matters&quot;</li>
            </ul>

            <p>
              Growth isn&apos;t about being the best. It&apos;s about being better than you were yesterday.
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-[#E1E0CC] mt-12 mb-4">Practical Steps</h2>

            <ol className="space-y-4 my-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#E1E0CC] font-medium">1</span>
                <div>
                  <strong className="text-[#E1E0CC]">Keep a &quot;done&quot; list</strong>
                  <p className="text-gray-400 mt-1">Write down everything you&apos;ve learned, built, or fixed. Imposter syndrome thrives on forgetting your wins.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#E1E0CC] font-medium">2</span>
                <div>
                  <strong className="text-[#E1E0CC]">Share your struggles</strong>
                  <p className="text-gray-400 mt-1">When you talk about what you&apos;re learning (not just what you&apos;ve mastered), you&apos;ll find you&apos;re not alone.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#E1E0CC] font-medium">3</span>
                <div>
                  <strong className="text-[#E1E0CC]">Celebrate small progress</strong>
                  <p className="text-gray-400 mt-1">Did you fix a bug today? Learn a new concept? That&apos;s worth acknowledging.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#E1E0CC] font-medium">4</span>
                <div>
                  <strong className="text-[#E1E0CC]">Remember: no one has it all figured out</strong>
                  <p className="text-gray-400 mt-1">The most confident-looking people are often just better at hiding uncertainty.</p>
                </div>
              </li>
            </ol>

            <h2 className="text-2xl md:text-3xl font-medium text-[#E1E0CC] mt-12 mb-4">You Belong Here</h2>

            <p>
              You&apos;re in tech because you&apos;re curious, you&apos;re persistent, and you want to build things. That&apos;s enough.
            </p>

            <p>
              The feeling of not belonging doesn&apos;t mean you don&apos;t belong. It means you&apos;re pushing yourself, and that&apos;s exactly where growth happens.
            </p>

            <div className="my-12 p-8 bg-gradient-to-br from-[#1a1a1a] to-[#101010] rounded-xl border border-white/10">
              <p className="text-xl text-[#E1E0CC] font-medium mb-4">
                Remember:
              </p>
              <p className="text-lg text-[#DEDBC8]">
                You&apos;re not an imposter. You&apos;re a developer, on a journey, just like everyone else.
              </p>
            </div>

            <p className="text-base text-gray-400 italic">
              If you&apos;re struggling and need to talk, Calmify is here to listen. Sometimes just voicing these thoughts helps.
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="relative py-16 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl text-[#E1E0CC] mb-8">Related articles</h3>
          <div className="grid gap-4">
            {articles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 3)
              .map((related) => (
                <a
                  key={related.slug}
                  href={`/articles/${related.slug}`}
                  onClick={(e) => handleRelatedArticleClick(e, related.slug)}
                  className="bg-[#101010] rounded-lg p-6 hover:bg-[#1a1a1a] transition-colors group cursor-pointer"
                >
                  <span className="text-xs uppercase tracking-wider text-[#DEDBC8] mb-2 block">
                    {related.category}
                  </span>
                  <h4 className="text-lg text-[#E1E0CC] group-hover:text-[#DEDBC8] transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {related.excerpt}
                  </p>
                </a>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
