/// <reference path="../.astro/types.d.ts" />

// CDN imports — skipped by TypeScript, resolved at runtime
declare module 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs' {
  import mermaid from 'mermaid';
  export default mermaid;
}
