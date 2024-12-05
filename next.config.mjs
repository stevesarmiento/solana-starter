import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX({
  contentDirs: ['content/docs'],
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
};

export default withMDX(config);