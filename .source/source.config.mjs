// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import path from "path";
var { docs, meta } = defineDocs({
  dir: path.join(process.cwd(), "content/docs")
});
var source_config_default = defineConfig();
export {
  source_config_default as default,
  docs,
  meta
};
