import Link from 'next/link';
import { getAllChapters } from '@/lib/markdown';

export default async function Home() {
  const chapters = getAllChapters();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">📖 My Book</h1>
      <ul className="space-y-4">
        {chapters.map((chapter: any) => (
          <li key={chapter.slug}>
            <Link href={`/chapters/${chapter.slug}`} className="text-blue-600 hover:underline">
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
