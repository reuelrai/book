// app/chapters/[slug]/page.tsx
import { getChapter, getAllChapters } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams(): Promise<
    { params: { slug: string } }[]
> {
    const chapters = getAllChapters();
    return chapters.map((chapter: any) => ({
        params: { slug: chapter.slug },
    }));
}

export default async function ChapterPage({
    params,
}: {
    params: { slug: string };
}) {
    const chapter = await getChapter(params.slug);

    if (!chapter) return notFound();

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
            <article
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: chapter.contentHtml }}
            />
        </main>
    );
}
