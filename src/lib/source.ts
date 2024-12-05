import { docs, meta } from '@/../.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

if (!docs?.length || !meta?.length) {
  console.warn('Documentation arrays are empty:', { docs, meta });
}

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(
    Array.isArray(docs) ? docs : [docs],
    Array.isArray(meta) ? meta : [meta]
  ),
});