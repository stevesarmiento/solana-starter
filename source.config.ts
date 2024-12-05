import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import path from 'path';

export const { docs, meta } = defineDocs({
  dir: path.join(process.cwd(), 'content/docs'),
});

export default defineConfig();
