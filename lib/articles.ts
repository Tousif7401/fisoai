export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  date: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    slug: 'overcoming-imposter-syndrome',
    title: 'Overcoming Imposter Syndrome as a Developer',
    excerpt: 'That feeling that everyone else is better than you? You\'re not alone. Here\'s how to reframe those thoughts.',
    readTime: '5 min read',
    category: 'Self-worth',
    date: '2025-01-15',
    featured: true
  },
  {
    slug: 'burnout-recovery-builders-guide',
    title: 'Burnout Recovery: A Builder\'s Guide',
    excerpt: 'When code feels like a burden and motivation has vanished. Practical steps to recover your spark.',
    readTime: '7 min read',
    category: 'Burnout',
    date: '2025-01-20',
    featured: true
  },
  {
    slug: 'shipping-anxiety-why-we-fear-done',
    title: 'Shipping Anxiety: Why We Fear Done',
    excerpt: 'The perfectionism trap that keeps us polishing instead of shipping. How to embrace "good enough".',
    readTime: '4 min read',
    category: 'Productivity',
    date: '2025-01-25',
    featured: true
  },
  {
    slug: 'context-switching-is-killing-creativity',
    title: 'Context Switching is Killing Your Creativity',
    excerpt: 'Every notification, every Slack ping, every "quick question" — they\'re not just interruptions. They\'re stealing your ability to do deep work.',
    readTime: '6 min read',
    category: 'Deep Work',
    date: '2025-02-01',
    featured: false
  },
  {
    slug: 'sunday-scaries-for-developers',
    title: 'Sunday Scaries for Developers',
    excerpt: 'When Sunday evening hits and the dread of Monday sets in. Here\'s how to break the anxiety cycle.',
    readTime: '5 min read',
    category: 'Anxiety',
    date: '2025-02-05',
    featured: false
  },
  {
    slug: 'lost-your-spark-its-not-discipline-its-rest',
    title: 'Lost Your Spark? It\'s Not Discipline, It\'s Rest',
    excerpt: 'You don\'t need more hustle. You don\'t need more discipline. You need actual rest — the kind most builders never get.',
    readTime: '6 min read',
    category: 'Motivation',
    date: '2025-02-10',
    featured: false
  }
];

export function getFeaturedArticles() {
  return articles.filter(a => a.featured);
}

export function getArticleBySlug(slug: string) {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string) {
  return articles.filter(a => a.category === category);
}

export const categories = [
  'Self-worth',
  'Burnout',
  'Productivity',
  'Deep Work',
  'Anxiety',
  'Motivation'
];
