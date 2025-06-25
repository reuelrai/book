import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = path.join(process.cwd(), 'content');

export async function getChapter(slug: string) {
    const filePath = path.join(contentDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        title: data.title,
        date: data.date,
        contentHtml,
    };
}

export function getAllChapters() {
    const files = fs.readdirSync(contentDir);

    return files.map((file) => {
        const slug = file.replace(/\.md$/, '');
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        return {
            slug,
            title: data.title,
            date: data.date,
        };
    });
}
