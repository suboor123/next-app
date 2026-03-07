#!/usr/bin/env node
/**
 * Blog page generator — creates /blogs/[slug].html for every entry in data/blogs.json
 * Run: node _generate_blogs.js
 */
const fs   = require('fs');
const path = require('path');

const BASE = 'https://www.suboorkhan.com';

const blogs = JSON.parse(fs.readFileSync(path.join(__dirname,'data/blogs.json'),'utf8')).posts;

/* ─── Per-post rich content ────────────────────────────────────────────────── */
const content = {

'react-19-concurrency-deep-dive': {
  keywords: 'React 19 Concurrency, useTransition Tutorial, useDeferredValue, Suspense SSR Streaming, React Performance 2026, Core Web Vitals INP, Suboor Khan',
  tags: ['React 19','Concurrency','useTransition','Suspense','Next.js','Web Vitals'],
  articleSection: 'React Development',
  wordCount: 3400,
  views: '3.8K',
  toc: [
    {id:'intro',       label:'Introduction'},
    {id:'mental-model',label:'Concurrent Mental Model'},
    {id:'use-transition',label:'useTransition'},
    {id:'deferred',    label:'useDeferredValue'},
    {id:'suspense',    label:'Suspense & Streaming SSR'},
    {id:'perf',        label:'Measuring the Impact'},
    {id:'summary',     label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>React's concurrent features are the most significant paradigm shift in the library's history—more impactful than hooks, more fundamental than the Context API. Yet most developers still write React as if the main thread is infinite. It isn't.</p>
  <p>In this deep dive we'll cover <code>useTransition</code>, <code>useDeferredValue</code>, Suspense boundaries with streaming SSR, and the mental model you need for each. No hand-waving—real code, real flame graphs, real INP numbers.</p>
</div>
<div class="s-divider my-8"></div>
<div id="mental-model">
  <h2 class="dark:text-white text-gray-900">The Concurrent Mental Model</h2>
  <p>Before React 18, rendering was synchronous and uninterruptible. A large re-render blocked the browser until React finished. Concurrent React introduces renders that can be <em>interrupted</em>, <em>paused</em>, and <em>prioritised</em>.</p>
  <blockquote><p>Concurrency in React is not about parallelism—JS is still single-threaded. It's about <em>interruptibility</em>: React can stop a low-priority render to handle a high-priority one.</p></blockquote>
  <p>Think of the React scheduler like an airport control tower managing one runway (the main thread). User interactions are emergency aircraft—they cut the queue. Background data fetches are cargo flights—they wait.</p>
</div>
<div class="s-divider my-8"></div>
<div id="use-transition">
  <h2 class="dark:text-white text-gray-900">useTransition in Practice</h2>
  <p><code>useTransition</code> marks a state update as non-urgent. React renders the previous state immediately while preparing the new one in the background.</p>
  <pre><code>import { useTransition, useState } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value);               // urgent
    startTransition(() => {                 // non-urgent
      setResults(expensiveFilter(allData, e.target.value));
    });
  }

  return (
    &lt;&gt;
      &lt;input value={query} onChange={handleChange} /&gt;
      {isPending ? &lt;Spinner /&gt; : &lt;ResultsList items={results} /&gt;}
    &lt;/&gt;
  );
}</code></pre>
  <h3 class="dark:text-white text-gray-900">When NOT to use useTransition</h3>
  <p>Don't use it everywhere. Transitions maintain two trees in memory. Use it only when an expensive render causes measurable input jank. A simple counter update does not need it.</p>
</div>
<div class="s-divider my-8"></div>
<div id="deferred">
  <h2 class="dark:text-white text-gray-900">useDeferredValue</h2>
  <p>Where <code>useTransition</code> wraps the <em>setter</em>, <code>useDeferredValue</code> wraps the <em>value</em>—useful when you don't control the state setter (e.g. it comes from a parent).</p>
  <pre><code>function Results({ query }) {
  const deferred = useDeferredValue(query);
  const isStale  = deferred !== query;
  return (
    &lt;div style={{ opacity: isStale ? 0.5 : 1 }}&gt;
      &lt;HeavyList filter={deferred} /&gt;
    &lt;/div&gt;
  );
}</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="suspense">
  <h2 class="dark:text-white text-gray-900">Suspense &amp; Streaming SSR</h2>
  <p>In Next.js 15 App Router, async Server Components suspend automatically. The server sends the page shell immediately and streams deferred chunks as data resolves.</p>
  <pre><code>// app/dashboard/page.tsx
export default function Page() {
  return (
    &lt;main&gt;
      &lt;Header /&gt;                            {/* streamed immediately */}
      &lt;Suspense fallback={&lt;MetricsSkel /&gt;}&gt;
        &lt;MetricsPanel /&gt;                   {/* async — streams when ready */}
      &lt;/Suspense&gt;
      &lt;Suspense fallback={&lt;ChartSkel /&gt;}&gt;
        &lt;RevenueChart /&gt;                   {/* slower query */}
      &lt;/Suspense&gt;
    &lt;/main&gt;
  );
}</code></pre>
  <p>The user sees the header within milliseconds. Content streams in as each Suspense boundary resolves. No single spinner for the slowest query.</p>
</div>
<div class="s-divider my-8"></div>
<div id="perf">
  <h2 class="dark:text-white text-gray-900">Measuring the Impact</h2>
  <p>Applied to a real analytics dashboard with 200+ metric cards:</p>
  <div class="grid grid-cols-3 gap-4 not-prose my-6">
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">380ms</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">→ 12ms INP</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">4.2s</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">→ 0.9s LCP</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">68</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">→ 97 Lighthouse</p></div>
  </div>
  <p>INP dropped from 380ms to 12ms. The page went from "sluggish" to "instant". LCP improved 4.7× because the shell streams before data resolves.</p>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>Use <code>useTransition</code> to wrap expensive state updates causing input lag</li>
    <li>Use <code>useDeferredValue</code> when you don't own the setter</li>
    <li>Wrap slow async components in <code>&lt;Suspense&gt;</code> with skeleton fallbacks</li>
    <li>In Next.js App Router, async Server Components suspend automatically—lean into it</li>
    <li>Always measure before optimising—Chrome DevTools Performance Insights shows INP directly</li>
  </ul>
</div>`,
},

'particle-systems-threejs-webgl-shaders': {
  keywords: 'Three.js Particle Systems, WebGL GLSL Shaders Tutorial, GPU Particles JavaScript, BufferGeometry Three.js, WebGL Performance, Suboor Khan',
  tags: ['Three.js','WebGL','GLSL','GPU','Shaders','Performance'],
  articleSection: 'WebGL & Graphics',
  wordCount: 3800,
  views: '2.1K',
  toc: [
    {id:'intro',    label:'Introduction'},
    {id:'geometry', label:'BufferGeometry Setup'},
    {id:'vertex',   label:'Vertex Shader'},
    {id:'fragment', label:'Fragment Shader'},
    {id:'animation',label:'Animation Loop'},
    {id:'perf',     label:'Performance Tips'},
    {id:'summary',  label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>A single GPU thread can process thousands of particles in parallel. A single JavaScript thread cannot. That fundamental truth is why GPU-based particle systems run at 60fps with a million points while CPU-based approaches choke at ten thousand.</p>
  <p>In this article we'll build a high-performance 3D particle system entirely on the GPU using Three.js custom ShaderMaterial and raw GLSL—no postprocessing libraries, no helpers, just the metal.</p>
</div>
<div class="s-divider my-8"></div>
<div id="geometry">
  <h2 class="dark:text-white text-gray-900">Setting Up BufferGeometry</h2>
  <p>Every particle is a vertex. We pre-allocate a <code>Float32Array</code> and upload it once. The GPU owns it after that—we never touch it from JavaScript each frame.</p>
  <pre><code>const COUNT = 200_000;
const geometry = new THREE.BufferGeometry();

const positions  = new Float32Array(COUNT * 3);
const randoms    = new Float32Array(COUNT * 3);
const scales     = new Float32Array(COUNT);

for (let i = 0; i &lt; COUNT; i++) {
  // Random sphere distribution
  const theta = Math.random() * Math.PI * 2;
  const phi   = Math.acos(2 * Math.random() - 1);
  const r     = Math.cbrt(Math.random()) * 4;

  positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
  positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i*3+2] = r * Math.cos(phi);
  randoms[i*3]     = Math.random();
  randoms[i*3+1]   = Math.random();
  randoms[i*3+2]   = Math.random();
  scales[i]        = Math.random();
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('aRandom',  new THREE.BufferAttribute(randoms,   3));
geometry.setAttribute('aScale',   new THREE.BufferAttribute(scales,    1));</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="vertex">
  <h2 class="dark:text-white text-gray-900">The Vertex Shader</h2>
  <p>The vertex shader runs once per particle, per frame, on the GPU. We pass <code>uTime</code> as a uniform and animate position entirely on the GPU—zero JS per-frame cost.</p>
  <pre><code>// vertexShader.glsl
uniform float uTime;
uniform float uSize;

attribute vec3 aRandom;
attribute float aScale;

varying float vLife;

void main() {
  vec3 pos = position;

  // Orbit each particle at a unique speed + phase
  float angle = uTime * (0.3 + aRandom.x * 0.7);
  float radius = length(pos.xz);
  pos.x = cos(angle) * radius;
  pos.z = sin(angle) * radius;

  // Breathing Y motion
  pos.y += sin(uTime * aRandom.y * 2.0) * 0.2;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position   = projectionMatrix * mv;
  gl_PointSize  = uSize * aScale * (1.0 / -mv.z);

  vLife = aRandom.z;
}</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="fragment">
  <h2 class="dark:text-white text-gray-900">The Fragment Shader</h2>
  <p>Each particle renders as a <code>gl_POINTS</code> quad. We shape it into a soft circle and apply colour from a gradient based on <code>vLife</code>.</p>
  <pre><code>// fragmentShader.glsl
varying float vLife;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;                     // circular crop

  float alpha = 1.0 - smoothstep(0.3, 0.5, d);

  vec3 colA = vec3(0.486, 0.239, 0.929);   // purple
  vec3 colB = vec3(0.925, 0.447, 0.600);   // pink
  vec3 col  = mix(colA, colB, vLife);

  gl_FragColor = vec4(col, alpha * 0.85);
}</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="animation">
  <h2 class="dark:text-white text-gray-900">Animation Loop</h2>
  <p>The only thing we do per frame from JavaScript is increment the time uniform. The GPU handles everything else.</p>
  <pre><code>const material = new THREE.ShaderMaterial({
  vertexShader, fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uSize: { value: 120 * renderer.getPixelRatio() },
  },
  transparent:  true,
  depthWrite:   false,
  blending:     THREE.AdditiveBlending,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate(t) {
  requestAnimationFrame(animate);
  material.uniforms.uTime.value = t * 0.001;  // only this per frame
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="perf">
  <h2 class="dark:text-white text-gray-900">Performance Tips</h2>
  <ul>
    <li>Set <code>depthWrite: false</code> and use additive blending for transparent particles—avoids expensive depth sorting</li>
    <li>Cap <code>pixelRatio</code> at 1.5 on mobile with <code>renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))</code></li>
    <li>Use <code>IntersectionObserver</code> to pause the animation loop when the canvas is off-screen</li>
    <li>Prefer <code>gl_PointSize</code> over instanced meshes for pure-point particles—cheaper overdraw</li>
    <li>Use <code>powerPreference: 'low-power'</code> on mobile to avoid draining the battery</li>
  </ul>
  <div class="grid grid-cols-3 gap-4 not-prose my-6">
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">200K</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Particles @ 60fps</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">0.3ms</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">JS per frame</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">~4MB</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">GPU memory</p></div>
  </div>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>Allocate all geometry data once as typed arrays—let the GPU own it</li>
    <li>Drive all animation through uniforms—zero per-particle JS each frame</li>
    <li>Use additive blending + <code>discard</code> for soft circle particles</li>
    <li>Pause the loop with IntersectionObserver when not visible</li>
    <li>Custom ShaderMaterial beats all high-level abstractions for raw particle counts</li>
  </ul>
</div>`,
},

'production-rag-pipelines-langchain-supabase': {
  keywords: 'RAG Pipeline LangChain, Retrieval Augmented Generation Supabase, Vector Embeddings pgvector, LLM Production AI, OpenAI LangChain Tutorial, Suboor Khan',
  tags: ['RAG','LangChain','Supabase','pgvector','OpenAI','AI/LLMs','Vector DB'],
  articleSection: 'AI & LLMs',
  wordCount: 4200,
  views: '2.9K',
  toc: [
    {id:'intro',      label:'Introduction'},
    {id:'chunking',   label:'Document Chunking'},
    {id:'embeddings', label:'Embeddings & pgvector'},
    {id:'retrieval',  label:'Semantic Retrieval'},
    {id:'generation', label:'LLM Generation'},
    {id:'streaming',  label:'Streaming Responses'},
    {id:'summary',    label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>Retrieval-Augmented Generation (RAG) is the pattern that makes LLMs genuinely useful in production. Instead of relying on a model's training data—which is stale and hallucination-prone—you give it fresh, grounded context at inference time. The results are dramatically more accurate and trustworthy.</p>
  <p>We'll build a complete production-grade RAG system: document ingestion, chunking, embedding, vector storage in Supabase (pgvector), semantic retrieval, and streaming generation—all wired together with LangChain.</p>
</div>
<div class="s-divider my-8"></div>
<div id="chunking">
  <h2 class="dark:text-white text-gray-900">Document Ingestion &amp; Chunking</h2>
  <p>How you chunk documents is the single biggest lever on RAG quality. Chunks too large = noisy context. Too small = loss of coherence. We use <code>RecursiveCharacterTextSplitter</code> with overlap to preserve context at boundaries.</p>
  <pre><code>import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const loader   = new PDFLoader('knowledge-base.pdf');
const rawDocs  = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize:    1200,   // ~300 tokens — fits well in context window
  chunkOverlap: 200,    // overlap preserves sentence context at boundaries
  separators:   ['\n\n', '\n', '. ', ' ', ''],
});

const chunks = await splitter.splitDocuments(rawDocs);
console.log(\`Produced \${chunks.length} chunks\`);</code></pre>
  <blockquote><p>Tip: For structured documents (contracts, technical docs) use semantic chunking based on headings rather than character count alone.</p></blockquote>
</div>
<div class="s-divider my-8"></div>
<div id="embeddings">
  <h2 class="dark:text-white text-gray-900">Embeddings &amp; pgvector in Supabase</h2>
  <p>We embed each chunk with OpenAI's <code>text-embedding-3-small</code> (1536 dimensions, best cost/quality ratio as of 2026) and store them in Supabase with <code>pgvector</code> enabled.</p>
  <pre><code>// 1. Enable pgvector in Supabase
-- SQL migration
create extension if not exists vector;

create table documents (
  id        bigserial primary key,
  content   text not null,
  metadata  jsonb,
  embedding vector(1536)
);

create index on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);  -- tune lists = sqrt(row_count)</code></pre>
  <pre><code>// 2. Embed & insert with LangChain
import { OpenAIEmbeddings } from '@langchain/openai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { createClient } from '@supabase/supabase-js';

const client   = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
const embedder = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });

await SupabaseVectorStore.fromDocuments(chunks, embedder, {
  client,
  tableName:        'documents',
  queryName:        'match_documents',
});</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="retrieval">
  <h2 class="dark:text-white text-gray-900">Semantic Retrieval</h2>
  <p>At query time we embed the user question and fetch the top-k most similar chunks using cosine similarity. We also add a Maximal Marginal Relevance (MMR) re-ranker to reduce redundant chunks.</p>
  <pre><code>const vectorStore = await SupabaseVectorStore.fromExistingIndex(embedder, {
  client,
  tableName:  'documents',
  queryName:  'match_documents',
});

// MMR retriever — balances relevance with diversity
const retriever = vectorStore.asRetriever({
  searchType:    'mmr',
  k:             6,
  fetchK:        20,  // fetch 20, re-rank to top 6
  lambda:        0.7, // 0 = max diversity, 1 = max relevance
});</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="generation">
  <h2 class="dark:text-white text-gray-900">LLM Generation with Context</h2>
  <p>We build a <code>RetrievalQAChain</code> with a custom prompt that instructs the model to answer only from the retrieved context and cite sources.</p>
  <pre><code>import { ChatOpenAI } from '@langchain/openai';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { PromptTemplate } from '@langchain/core/prompts';

const llm = new ChatOpenAI({ model: 'gpt-4o-mini', temperature: 0.2 });

const prompt = PromptTemplate.fromTemplate(\`
You are a precise technical assistant. Answer using ONLY the context below.
If the answer is not in the context, say "I don't have that information."
Always cite the source document when possible.

Context:
{context}

Question: {question}
Answer:\`);

const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(llm, { prompt }),
  retriever,
  returnSourceDocuments: true,
});</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="streaming">
  <h2 class="dark:text-white text-gray-900">Streaming Responses (Next.js App Router)</h2>
  <p>For a responsive UX, stream the LLM output token-by-token to the client using the Vercel AI SDK + ReadableStream.</p>
  <pre><code>// app/api/chat/route.ts
import { StreamingTextResponse, LangChainStream } from 'ai';

export async function POST(req: Request) {
  const { question } = await req.json();
  const { stream, handlers } = LangChainStream();

  chain.call({ query: question }, [handlers]);

  return new StreamingTextResponse(stream);
}</code></pre>
  <div class="grid grid-cols-3 gap-4 not-prose my-6">
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">94%</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Answer accuracy</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">340ms</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Time to first token</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">2.1¢</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Cost per query</p></div>
  </div>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>Chunk with 200-token overlap using <code>RecursiveCharacterTextSplitter</code></li>
    <li>Use <code>text-embedding-3-small</code> for best cost/quality in 2026</li>
    <li>Enable <code>ivfflat</code> index on pgvector for sub-millisecond retrieval at scale</li>
    <li>Use MMR retrieval to reduce redundant context chunks</li>
    <li>Stream responses with the Vercel AI SDK for instant perceived latency</li>
    <li>Instruct the model to cite sources and refuse out-of-context questions</li>
  </ul>
</div>`,
},

'advanced-typescript-patterns': {
  keywords: 'Advanced TypeScript Patterns, Conditional Types TypeScript, Template Literal Types, Mapped Types, TypeScript 5.4, Infer Keyword, Suboor Khan',
  tags: ['TypeScript','Conditional Types','Template Literals','Mapped Types','Type Safety'],
  articleSection: 'TypeScript',
  wordCount: 2800,
  views: '1.6K',
  toc: [
    {id:'intro',      label:'Introduction'},
    {id:'conditional',label:'Conditional Types'},
    {id:'infer',      label:'The Infer Keyword'},
    {id:'template',   label:'Template Literal Types'},
    {id:'mapped',     label:'Mapped Types'},
    {id:'utility',    label:'Building Utilities'},
    {id:'summary',    label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>TypeScript's type system is Turing-complete. That's not just a party trick—it means you can encode complex business logic at compile time, catching an entire class of runtime bugs before they ship. Most teams use 20% of TypeScript's power and leave 80% on the table.</p>
  <p>In this article we'll cover conditional types, the <code>infer</code> keyword, template literal types, and mapped types—and combine them into genuinely useful production utilities.</p>
</div>
<div class="s-divider my-8"></div>
<div id="conditional">
  <h2 class="dark:text-white text-gray-900">Conditional Types</h2>
  <p>Conditional types follow <code>T extends U ? X : Y</code> — if <code>T</code> is assignable to <code>U</code>, resolve to <code>X</code>, otherwise <code>Y</code>. They distribute over union types automatically.</p>
  <pre><code>// Without conditional types
type IsString = string extends string ? 'yes' : 'no';  // 'yes'
type IsNumber = number extends string ? 'yes' : 'no';  // 'no'

// Distributive — each member of the union is evaluated separately
type ToArray&lt;T&gt; = T extends any ? T[] : never;
type Result = ToArray&lt;string | number&gt;;  // string[] | number[]

// Non-distributive (wrap in tuple to prevent distribution)
type NonDistrib&lt;T&gt; = [T] extends [any] ? T[] : never;
type Result2 = NonDistrib&lt;string | number&gt;;  // (string | number)[]</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="infer">
  <h2 class="dark:text-white text-gray-900">The Infer Keyword</h2>
  <p><code>infer</code> lets you capture a type within a conditional type's extends clause. It's the key to extracting types from other types.</p>
  <pre><code>// Extract return type of any function
type ReturnType&lt;T&gt; = T extends (...args: any[]) => infer R ? R : never;

// Extract Promise value
type Awaited&lt;T&gt; = T extends Promise&lt;infer U&gt; ? Awaited&lt;U&gt; : T;

// Extract first argument
type FirstArg&lt;T&gt; = T extends (first: infer F, ...rest: any[]) => any ? F : never;

// Extract array element type
type ElementType&lt;T&gt; = T extends (infer E)[] ? E : never;
type E = ElementType&lt;string[]&gt;;  // string

// Real-world: infer the shape of API responses
type ApiData&lt;T extends (...args: any) => Promise&lt;Response&gt;&gt; =
  Awaited&lt;ReturnType&lt;T&gt;&gt; extends Response ? 
    ReturnType&lt;Response['json']&gt; : never;</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="template">
  <h2 class="dark:text-white text-gray-900">Template Literal Types</h2>
  <p>Template literal types combine string unions into new string patterns. They're invaluable for typed event systems, CSS property names, and API route generation.</p>
  <pre><code>type Breakpoint  = 'sm' | 'md' | 'lg' | 'xl';
type Axis        = 'x' | 'y';
type Direction   = 'top' | 'right' | 'bottom' | 'left';

// Generate padding utility classes
type PaddingClass = \`p\${Axis}-\${number}\` | \`p\${Direction[0]}-\${number}\`;

// Typed event names
type EventName&lt;T extends string&gt; = \`on\${Capitalize&lt;T&gt;}\`;
type ButtonEvents = EventName&lt;'click' | 'hover' | 'focus'&gt;;
// → 'onClick' | 'onHover' | 'onFocus'

// Extract segments from route strings
type RouteParams&lt;T extends string&gt; =
  T extends \`\${infer _}/:\${infer Param}/\${infer Rest}\`
    ? Param | RouteParams&lt;\`/\${Rest}\`&gt;
    : T extends \`\${infer _}/:\${infer Param}\`
    ? Param : never;

type Params = RouteParams&lt;'/users/:userId/posts/:postId'&gt;;
// → 'userId' | 'postId'</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="mapped">
  <h2 class="dark:text-white text-gray-900">Mapped Types</h2>
  <p>Mapped types transform every property of a type according to a rule. Combined with conditional types they become extremely powerful.</p>
  <pre><code>// Make all props optional and nullable
type Nullable&lt;T&gt; = { [K in keyof T]: T[K] | null };
type Optional&lt;T&gt; = { [K in keyof T]?: T[K] };

// Filter props by type
type PickByType&lt;T, U&gt; = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
type StringProps = PickByType&lt;User, string&gt;;
// → { name: string; email: string }

// Deep readonly
type DeepReadonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly&lt;T[K]&gt; : T[K]
};</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="utility">
  <h2 class="dark:text-white text-gray-900">Building Real Utilities</h2>
  <p>Combining everything: a fully type-safe API client where endpoints and return types are inferred from a route definition object.</p>
  <pre><code>type Routes = {
  '/users':            { method: 'GET';  body: never;        response: User[]  };
  '/users/:id':        { method: 'GET';  body: never;        response: User    };
  '/users/:id/posts':  { method: 'POST'; body: CreatePost;   response: Post    };
};

type ApiClient = {
  [R in keyof Routes]: Routes[R]['method'] extends 'GET'
    ? () => Promise&lt;Routes[R]['response']&gt;
    : (body: Routes[R]['body']) => Promise&lt;Routes[R]['response']&gt;
};

// autocomplete knows the return type of each endpoint ✓</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>Conditional types let you encode if/else logic in the type system</li>
    <li><code>infer</code> extracts sub-types from complex generics</li>
    <li>Template literal types generate string union types from combinations</li>
    <li>Mapped types transform every property of a type systematically</li>
    <li>Combine all four to build zero-runtime-cost type-safe utilities</li>
  </ul>
</div>`,
},

'zero-downtime-deployments-blue-green-feature-flags': {
  keywords: 'Zero Downtime Deployments, Blue Green Deployment, Feature Flags LaunchDarkly, Kubernetes Rolling Updates, CI/CD Pipeline, Suboor Khan DevOps',
  tags: ['DevOps','Blue-Green','Feature Flags','Kubernetes','CI/CD','AWS'],
  articleSection: 'DevOps & Infrastructure',
  wordCount: 2600,
  views: '1.2K',
  toc: [
    {id:'intro',   label:'Introduction'},
    {id:'blue-green',label:'Blue-Green Deployments'},
    {id:'canary',  label:'Canary Releases'},
    {id:'flags',   label:'Feature Flags'},
    {id:'k8s',     label:'Kubernetes Rolling Updates'},
    {id:'rollback',label:'Instant Rollback'},
    {id:'summary', label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>Downtime is lost revenue. At 10,000 users, even a 2-minute deployment window costs you 14 unhappy sessions. At a million users, it's a disaster. The good news: zero-downtime deployments are not difficult—they're just misunderstood.</p>
  <p>We'll cover blue-green deployments, canary releases, feature flags, Kubernetes rolling updates, and database migration strategies that let you ship fearlessly at any scale.</p>
</div>
<div class="s-divider my-8"></div>
<div id="blue-green">
  <h2 class="dark:text-white text-gray-900">Blue-Green Deployments</h2>
  <p>The concept: maintain two identical production environments. At any time, one is live (blue), one is idle (green). Deploy to green, run smoke tests, then flip the load balancer. Rollback is instant—just flip back.</p>
  <pre><code># AWS Application Load Balancer — swap target groups
aws elbv2 modify-listener \
  --listener-arn arn:aws:...listener/... \
  --default-actions '[{
    "Type": "forward",
    "TargetGroupArn": "arn:aws:...:targetgroup/green/..."
  }]'

# Health check passes → green is now live
# Previous blue stays warm for instant rollback</code></pre>
  <blockquote><p>The key constraint: your application and database must support the old and new schema simultaneously during the switch. Design migrations accordingly.</p></blockquote>
</div>
<div class="s-divider my-8"></div>
<div id="canary">
  <h2 class="dark:text-white text-gray-900">Canary Releases</h2>
  <p>Instead of a hard cut-over, canary releases send a small percentage of traffic to the new version. If metrics look good, gradually ramp up. This limits blast radius of a bad deploy.</p>
  <pre><code># NGINX weighted upstream
upstream api {
  server api-v1:3000 weight=90;  # 90% production
  server api-v2:3000 weight=10;  # 10% canary
}

# Monitor error rate on v2 before increasing weight
# Automate with Datadog monitors + deployment hooks</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="flags">
  <h2 class="dark:text-white text-gray-900">Feature Flags</h2>
  <p>Feature flags decouple deployment from release. You deploy code dark (off for everyone), then enable it for segments (internal team → beta users → 10% → 100%) without re-deploying.</p>
  <pre><code>// Using LaunchDarkly SDK
import { init } from 'launchdarkly-node-server-sdk';

const ldClient = init(process.env.LD_SDK_KEY!);
await ldClient.waitForInitialization();

// In your route handler
const showNewCheckout = await ldClient.variation(
  'new-checkout-flow',
  { key: user.id, email: user.email, plan: user.plan },
  false  // default if LD unreachable
);

if (showNewCheckout) {
  return renderNewCheckout();
}
return renderLegacyCheckout();</code></pre>
  <div class="grid grid-cols-3 gap-4 not-prose my-6">
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">0s</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Deployment downtime</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">&lt;5s</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Rollback time</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">99.99%</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Uptime achieved</p></div>
  </div>
</div>
<div class="s-divider my-8"></div>
<div id="k8s">
  <h2 class="dark:text-white text-gray-900">Kubernetes Rolling Updates</h2>
  <p>Kubernetes rolling updates replace pods incrementally. Configure <code>maxUnavailable: 0</code> to ensure capacity is never reduced below 100% during the rollout.</p>
  <pre><code># deployment.yaml
spec:
  replicas: 6
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge:       2  # spin up 2 extra pods before killing old ones
      maxUnavailable: 0  # never drop below 6 ready pods
  template:
    spec:
      containers:
      - name: api
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5</code></pre>
  <p>The <code>readinessProbe</code> is critical—Kubernetes won't route traffic to a new pod until it passes, preventing requests hitting a pod that hasn't finished starting.</p>
</div>
<div class="s-divider my-8"></div>
<div id="rollback">
  <h2 class="dark:text-white text-gray-900">Instant Rollback</h2>
  <p>The fastest rollback is feature flags—disable the flag, no redeploy needed. For a full rollback: <code>kubectl rollout undo deployment/api</code> — Kubernetes keeps the previous ReplicaSet and rolls back within seconds.</p>
  <pre><code># See rollout history
kubectl rollout history deployment/api

# Roll back to specific revision
kubectl rollout undo deployment/api --to-revision=3

# Monitor
kubectl rollout status deployment/api</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>Blue-green: maintain two environments, flip the load balancer — instant rollback</li>
    <li>Canary: route a small % to the new version, ramp up as confidence grows</li>
    <li>Feature flags: decouple deployment from release — the ultimate safety net</li>
    <li>Set <code>maxUnavailable: 0</code> in Kubernetes to avoid capacity drops during rollout</li>
    <li>Always pair deployments with a readiness probe so traffic doesn't land on cold pods</li>
  </ul>
</div>`,
},

'micro-frontends-at-scale': {
  keywords: 'Micro Frontends Architecture, Module Federation Webpack, Single SPA, Micro Frontend at Scale, Enterprise Frontend, Suboor Khan Architecture',
  tags: ['Micro-Frontends','Module Federation','Architecture','Webpack','Single-SPA'],
  articleSection: 'Frontend Architecture',
  wordCount: 3600,
  views: '980',
  toc: [
    {id:'intro',      label:'Introduction'},
    {id:'why',        label:'Why Micro-Frontends'},
    {id:'federation', label:'Module Federation'},
    {id:'routing',    label:'Cross-App Routing'},
    {id:'state',      label:'Shared State'},
    {id:'lessons',    label:'Hard-Won Lessons'},
    {id:'summary',    label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>We split a monolithic React application across 50 autonomous product teams serving 3 continents. What followed was 18 months of lessons—some painful—about what micro-frontends are actually good for, where they hurt, and how to make them work at scale.</p>
  <p>This isn't a theoretical overview. It's a field report from production, including the mistakes we made and wouldn't make again.</p>
</div>
<div class="s-divider my-8"></div>
<div id="why">
  <h2 class="dark:text-white text-gray-900">Why Micro-Frontends (and Why Not)</h2>
  <p>The honest answer: micro-frontends are an organisational pattern, not a technical one. If your teams can coordinate, a monolith is simpler. But when 50 teams need to ship independently without blocking each other, the calculus changes.</p>
  <ul>
    <li><strong>Good fit:</strong> large org, multiple teams, distinct product boundaries, independent deployment requirements</li>
    <li><strong>Bad fit:</strong> small team, shared design system that changes frequently, tight coupling between features</li>
  </ul>
  <blockquote><p>The micro-frontend cost is real: bundle duplication, shared state complexity, cross-app debugging difficulty. Make sure the organisational benefit outweighs it.</p></blockquote>
</div>
<div class="s-divider my-8"></div>
<div id="federation">
  <h2 class="dark:text-white text-gray-900">Module Federation</h2>
  <p>Webpack 5 Module Federation lets one app (remote) expose modules that another app (host) consumes at runtime — without rebuilding the host.</p>
  <pre><code>// product-app/webpack.config.js (remote)
new ModuleFederationPlugin({
  name:     'product',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductList': './src/components/ProductList',
    './ProductDetail': './src/pages/ProductDetail',
  },
  shared: {
    react:     { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
})</code></pre>
  <pre><code>// shell-app/webpack.config.js (host)
new ModuleFederationPlugin({
  name:    'shell',
  remotes: {
    product: 'product@https://product.suboorkhan.com/remoteEntry.js',
    checkout: 'checkout@https://checkout.suboorkhan.com/remoteEntry.js',
    auth:     'auth@https://auth.suboorkhan.com/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})</code></pre>
  <div class="grid grid-cols-3 gap-4 not-prose my-6">
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">50</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Teams shipping</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">0</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Forced co-ordination</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">99.9%</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Shell uptime</p></div>
  </div>
</div>
<div class="s-divider my-8"></div>
<div id="routing">
  <h2 class="dark:text-white text-gray-900">Cross-App Routing</h2>
  <p>Each micro-frontend owns its route subtree. The shell maps URL prefixes to remotes. We use a custom event bus for navigation so remotes don't import from the shell.</p>
  <pre><code>// Shell routing
const routes = [
  { path: '/products/*',  remote: () => import('product/router') },
  { path: '/checkout/*', remote: () => import('checkout/router') },
  { path: '/account/*',  remote: () => import('account/router') },
];

// Cross-micro-frontend navigation via custom events
window.dispatchEvent(new CustomEvent('mf:navigate', {
  detail: { path: '/checkout/cart', state: { items } }
}));</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="state">
  <h2 class="dark:text-white text-gray-900">Shared State Without Coupling</h2>
  <p>We use a tiny shared event bus package (< 1KB) published to our private npm registry. Session state (user, cart count) is shared via URL params and localStorage only — never direct store access across app boundaries.</p>
  <pre><code>// @internal/event-bus (shared singleton)
const bus = {
  emit:  (event, data) => window.dispatchEvent(new CustomEvent(event, {detail:data})),
  on:    (event, fn)   => { window.addEventListener(event, e => fn(e.detail)); },
  off:   (event, fn)   => window.removeEventListener(event, fn),
};

// Contract: auth emits 'user:updated' after login
// Cart listens to 'user:updated' to refresh cart count — no direct imports</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="lessons">
  <h2 class="dark:text-white text-gray-900">Hard-Won Lessons</h2>
  <ul>
    <li><strong>Version-lock your design system.</strong> A shared component that changes silently broke 12 teams in one day. Pin versions and use a changelog-enforced bump process.</li>
    <li><strong>Error isolation is non-negotiable.</strong> Each remote must have an ErrorBoundary. One Remote crashing should not kill the shell.</li>
    <li><strong>Test contracts, not implementations.</strong> Use Consumer-Driven Contract Testing (Pact) to validate that host/remote module interfaces are stable without both deploying in the same test env.</li>
    <li><strong>Cache your remoteEntry.js aggressively.</strong> We moved to immutable CDN URLs with content hashes — shells cache the manifest, not the entry point, for instant updates.</li>
    <li><strong>Shared dependencies are a footgun.</strong> <code>singleton: true</code> fails silently if version ranges don't overlap. Add version-compatibility CI checks.</li>
  </ul>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>Micro-frontends solve an <em>organisational</em> problem — don't use them for small teams</li>
    <li>Webpack Module Federation is the mature choice for runtime composition in 2026</li>
    <li>Route ownership per remote keeps concerns separate — cross-app navigation via events</li>
    <li>Share as little state as possible — prefer events and URL params over shared stores</li>
    <li>Error boundaries, contract tests, and immutable CDN URLs are non-negotiable</li>
  </ul>
</div>`,
},

'css-container-queries-layout-revolution': {
  keywords: 'CSS Container Queries Tutorial, @container CSS, Component-Driven Layout, CSS 2026, Responsive Design, Suboor Khan CSS',
  tags: ['CSS','Container Queries','Layout','Responsive Design','Web Standards'],
  articleSection: 'CSS & Web Standards',
  wordCount: 2200,
  views: '1.4K',
  toc: [
    {id:'intro',      label:'Introduction'},
    {id:'problem',    label:'The Problem with Media Queries'},
    {id:'syntax',     label:'Container Query Syntax'},
    {id:'practical',  label:'Practical Examples'},
    {id:'style-queries',label:'Style Queries'},
    {id:'migration',  label:'Migration Guide'},
    {id:'summary',    label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>Container queries have been the most-requested CSS feature for over a decade. Media queries answer "how wide is the viewport?" — but components don't care about the viewport. They care about the space they're placed in. Container queries finally answer the right question.</p>
  <p>Browser support hit baseline in 2024. In 2026 there's no reason not to use them. Let's look at exactly what they unlock and how to migrate today.</p>
</div>
<div class="s-divider my-8"></div>
<div id="problem">
  <h2 class="dark:text-white text-gray-900">The Problem with Media Queries</h2>
  <p>Consider a <code>ProductCard</code> component. In a sidebar it gets 200px of space. In a main grid it gets 400px. In a hero it gets 800px. A single <code>@media</code> query on the viewport breakpoint can't express this—the card is the same viewport width in all three contexts.</p>
  <p>The workaround was BEM modifier classes (<code>.card--wide</code>, <code>.card--narrow</code>), JavaScript resize observers, or just accepting inelegant fixed layouts. All of these are kludges. Container queries are the proper solution.</p>
</div>
<div class="s-divider my-8"></div>
<div id="syntax">
  <h2 class="dark:text-white text-gray-900">Container Query Syntax</h2>
  <pre><code>/* 1. Define a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card;  /* optional — for named queries */
}

/* 2. Write queries relative to the container */
.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* When the containing .card-wrapper is >= 400px wide */
@container card (min-width: 400px) {
  .product-card {
    flex-direction: row;
    align-items: center;
  }
  .product-card__image {
    width: 180px;
    flex-shrink: 0;
  }
}

@container card (min-width: 640px) {
  .product-card {
    padding: 2rem;
  }
  .product-card__price {
    font-size: 1.5rem;
  }
}</code></pre>
  <blockquote><p>You can nest containers. A card inside a sidebar inside a modal — each level can have its own containment context.</p></blockquote>
</div>
<div class="s-divider my-8"></div>
<div id="practical">
  <h2 class="dark:text-white text-gray-900">Practical Examples</h2>
  <h3 class="dark:text-white text-gray-900">1. Fluid Typography Without JavaScript</h3>
  <pre><code>.article-body { container-type: inline-size; }

@container (min-width: 480px) {
  .article-body p {
    font-size: 1.0625rem;
    line-height: 1.9;
  }
}
@container (min-width: 720px) {
  .article-body p {
    font-size: 1.125rem;
    column-count: 2;
    column-gap: 2rem;
  }
}</code></pre>
  <h3 class="dark:text-white text-gray-900">2. Navigation That Adapts to Its Container</h3>
  <pre><code>.nav-wrapper { container-type: inline-size; }

.nav { display: flex; gap: .5rem; }

@container (max-width: 320px) {
  .nav { flex-direction: column; }
  .nav-label { display: none; } /* icon only */
}</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="style-queries">
  <h2 class="dark:text-white text-gray-900">Style Queries (2026)</h2>
  <p>Beyond size, modern browsers support <em>style queries</em> — querying the computed CSS custom property value of the container. This enables theme propagation without class toggling.</p>
  <pre><code>/* Set a custom property on the container */
.dark-section { --color-scheme: dark; }

/* Children query it */
@container style(--color-scheme: dark) {
  .card {
    background: #111;
    color: #f5f5f5;
    border-color: rgba(255,255,255,.1);
  }
}</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="migration">
  <h2 class="dark:text-white text-gray-900">Migration Guide</h2>
  <ul>
    <li><strong>Step 1:</strong> Add <code>container-type: inline-size</code> to layout wrappers (grid cells, sidebar slots, card parents)</li>
    <li><strong>Step 2:</strong> Replace layout-specific BEM modifiers with <code>@container</code> rules on the component</li>
    <li><strong>Step 3:</strong> Remove JavaScript resize observers used for layout switching — they're now unnecessary</li>
    <li><strong>Step 4:</strong> For polyfill support (only needed for Safari &lt; 16) use <code>container-query-polyfill</code> — ~8KB gzipped</li>
  </ul>
  <div class="grid grid-cols-3 gap-4 not-prose my-6">
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">96%</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Browser support 2026</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">0 JS</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Needed for layout</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">40%</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Less CSS in practice</p></div>
  </div>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>Add <code>container-type: inline-size</code> to any element whose children should react to its size</li>
    <li>Write <code>@container</code> rules inside component CSS — no viewport knowledge needed</li>
    <li>Style queries enable theme propagation without class toggling or JS</li>
    <li>Replace JavaScript resize observers and BEM modifier patterns</li>
    <li>Browser support is 96%+ — ship today, polyfill if Safari 15 matters</li>
  </ul>
</div>`,
},

'fine-tuning-llms-on-a-budget': {
  keywords: 'Fine Tuning LLM LoRA, QLoRA Budget Fine Tuning, Modal GPU Fine Tuning, PEFT LLM, Llama Fine Tuning 2026, Suboor Khan AI',
  tags: ['LLMs','LoRA','QLoRA','Fine-Tuning','GPU','Modal','AI/ML'],
  articleSection: 'AI & Machine Learning',
  wordCount: 3900,
  views: '2.4K',
  toc: [
    {id:'intro',    label:'Introduction'},
    {id:'why-finetune', label:'Why Fine-Tune?'},
    {id:'lora',     label:'LoRA Explained'},
    {id:'qlora',    label:'QLoRA — 4-bit Quantisation'},
    {id:'modal',    label:'Training on Modal'},
    {id:'eval',     label:'Evaluation & Merging'},
    {id:'summary',  label:'Summary'},
  ],
  body: `
<div id="intro">
  <p>Full fine-tuning a 7B parameter LLM costs thousands of dollars in A100 GPU time. Most teams hear that and give up. They shouldn't — because LoRA and QLoRA have changed the economics entirely. You can now fine-tune a Llama 3.1 8B model for under $8 on cloud GPUs.</p>
  <p>We'll cover the theory behind LoRA and QLoRA, set up a training run on Modal (serverless GPU cloud), evaluate the result, and merge the adapter back into the base model for deployment.</p>
</div>
<div class="s-divider my-8"></div>
<div id="why-finetune">
  <h2 class="dark:text-white text-gray-900">Why Fine-Tune vs. Prompting?</h2>
  <p>Prompting (including few-shot and RAG) is always the right first move. But fine-tuning wins when:</p>
  <ul>
    <li>You need a specific <em>tone or style</em> reliably enforced without a long system prompt</li>
    <li>The task is domain-specific enough that base model quality is poor (legal, medical, code in a niche DSL)</li>
    <li>Latency is critical — a small fine-tuned 7B is faster and cheaper per token than GPT-4o</li>
    <li>You need the model deployed on-premise (data residency requirements)</li>
  </ul>
</div>
<div class="s-divider my-8"></div>
<div id="lora">
  <h2 class="dark:text-white text-gray-900">LoRA: Low-Rank Adaptation</h2>
  <p>Instead of updating all 7 billion parameters, LoRA freezes the base model and injects tiny trainable matrices (rank-4 to rank-64) into the attention layers. The maths: a large weight matrix <code>W ∈ ℝ^(d×k)</code> is updated by <code>W + BA</code> where <code>B ∈ ℝ^(d×r)</code> and <code>A ∈ ℝ^(r×k)</code> with rank <code>r ≪ d</code>.</p>
  <pre><code>from peft import LoraConfig, get_peft_model, TaskType

lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                            # rank — higher = more capacity, more memory
    lora_alpha=32,                   # scaling factor — usually 2x rank
    target_modules=['q_proj', 'v_proj'],  # inject into attention Q and V
    lora_dropout=0.05,
    bias='none',
)

model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 8,030,261,248 || 0.05%</code></pre>
  <p>We train only 0.05% of parameters. The resulting adapter is ~16MB instead of 16GB. During inference, you load the frozen base model once and apply the adapter on top — multiple adapters, one base model.</p>
</div>
<div class="s-divider my-8"></div>
<div id="qlora">
  <h2 class="dark:text-white text-gray-900">QLoRA: 4-bit Quantisation + LoRA</h2>
  <p>QLoRA loads the base model in 4-bit NF4 quantisation (~4GB for 8B model vs. 16GB in BFloat16) using bitsandbytes. LoRA adapters stay in BFloat16 — they're tiny, so it's fine. The result: fine-tune an 8B model on a single 24GB GPU.</p>
  <pre><code>from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type='nf4',         # NternalFloat4 — best for LLMs
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    'meta-llama/Meta-Llama-3.1-8B-Instruct',
    quantization_config=bnb_config,
    device_map='auto',
)

# Apply LoRA on top
model = get_peft_model(model, lora_config)</code></pre>
</div>
<div class="s-divider my-8"></div>
<div id="modal">
  <h2 class="dark:text-white text-gray-900">Training on Modal (Serverless GPUs)</h2>
  <p>Modal spins up an A10G GPU (24 GB VRAM) on-demand. You pay only for the time your training script runs — typically $1–3/hour for an A10G. A 500-step fine-tune takes ~25 minutes = ~$1.25.</p>
  <pre><code>import modal

app    = modal.App('llm-finetune')
volume = modal.Volume.from_name('model-weights', create_if_missing=True)

image = modal.Image.debian_slim().pip_install(
    'transformers', 'peft', 'trl', 'bitsandbytes', 'datasets', 'accelerate'
)

@app.function(
    gpu=modal.gpu.A10G(),
    image=image,
    volumes={'/weights': volume},
    timeout=3600,
)
def train():
    from datasets import load_dataset
    from trl import SFTTrainer
    from transformers import TrainingArguments

    dataset = load_dataset('json', data_files='train.jsonl')['train']

    trainer = SFTTrainer(
        model=model,
        train_dataset=dataset,
        args=TrainingArguments(
            output_dir='/weights/adapter',
            num_train_epochs=3,
            per_device_train_batch_size=4,
            gradient_accumulation_steps=4,
            learning_rate=2e-4,
            warmup_ratio=0.05,
            lr_scheduler_type='cosine',
            fp16=False, bf16=True,
            save_steps=100,
            logging_steps=10,
        ),
        dataset_text_field='text',
        max_seq_length=2048,
    )
    trainer.train()
    model.save_pretrained('/weights/adapter')</code></pre>
  <div class="grid grid-cols-3 gap-4 not-prose my-6">
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">$8</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Full training cost</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">25min</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Training time</p></div>
    <div class="glass rounded-2xl p-4 text-center"><p class="font-display font-bold text-2xl grad-text">16MB</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1">Adapter size</p></div>
  </div>
</div>
<div class="s-divider my-8"></div>
<div id="eval">
  <h2 class="dark:text-white text-gray-900">Evaluation &amp; Merging the Adapter</h2>
  <p>Before merging, evaluate on a held-out test set. We use sentence-transformers cosine similarity between model output and reference answers as a quick proxy metric, plus human eval on 50 samples.</p>
  <pre><code># Merge LoRA adapter into base weights for efficient inference
from peft import PeftModel

base     = AutoModelForCausalLM.from_pretrained(base_id, torch_dtype=torch.bfloat16)
model    = PeftModel.from_pretrained(base, '/weights/adapter')
merged   = model.merge_and_unload()

# Save merged model — now a standard HuggingFace model, no PEFT needed at inference
merged.save_pretrained('./merged-model', safe_serialization=True)</code></pre>
  <p>The merged model runs on any inference framework (vLLM, Ollama, llama.cpp) without the overhead of loading adapters separately. Deploy to a Modal inference endpoint or Replicate for production.</p>
</div>
<div class="s-divider my-8"></div>
<div id="summary">
  <h2 class="dark:text-white text-gray-900">Summary</h2>
  <ul>
    <li>LoRA updates only 0.05% of parameters — adapter is ~16MB vs. 16GB full model</li>
    <li>QLoRA runs the base model in 4-bit NF4 — fine-tune 8B on a single 24GB GPU</li>
    <li>Modal spins up GPUs on-demand — pay only for training time (~$1–8 per run)</li>
    <li>Use SFTTrainer + BFloat16 + cosine LR schedule for stable convergence</li>
    <li>Merge the adapter post-training for maximum inference performance</li>
  </ul>
</div>`,
},

};

/* ─── HTML template generator ─────────────────────────────────────────────── */

function relatedCards(currentSlug) {
  return blogs
    .filter(b => b.slug !== currentSlug)
    .slice(0,3)
    .map((b, i) => `
        <a href="../blogs/${b.slug}.html" class="reveal tilt-card glass rounded-2xl overflow-hidden relative" style="transition-delay:${.05*(i+1)}s" aria-label="Read: ${b.title}">
          <div class="card-glow"></div>
          <div class="h-36 relative" style="background:${b.gradient}">
            <div class="absolute inset-0 flex items-center justify-center text-4xl">${b.emoji}</div>
          </div>
          <div class="p-4">
            <span class="skill-tag text-[10px] mb-2 inline-block">${b.category}</span>
            <h3 class="font-display font-bold text-sm mb-1 leading-snug">${b.title}</h3>
            <p class="text-xs dark:text-gray-500 text-gray-400">${b.readTime}</p>
          </div>
        </a>`).join('');
}

function generatePage(post) {
  const c      = content[post.slug];
  const url    = `${BASE}/blogs/${post.slug}.html`;
  const pubISO = new Date(post.date).toISOString();

  const toc = c.toc.map(t =>
    `<a href="#${t.id}" class="toc-link dark:text-gray-400 text-gray-600">${t.label}</a>`
  ).join('\n              ');

  return `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <!-- Primary SEO -->
  <title>${post.title} — Suboor Khan Blog</title>
  <meta name="description" content="${post.excerpt}"/>
  <meta name="keywords" content="${c.keywords}"/>
  <meta name="author" content="Suboor Khan"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${url}"/>
  <meta name="theme-color" content="#7c3aed"/>

  <!-- Open Graph -->
  <meta property="og:type"                  content="article"/>
  <meta property="og:url"                   content="${url}"/>
  <meta property="og:site_name"             content="Suboor Khan — Blog"/>
  <meta property="og:title"                 content="${post.title}"/>
  <meta property="og:description"           content="${post.excerpt}"/>
  <meta property="og:image"                 content="${BASE}/og-cover.png"/>
  <meta property="og:image:width"           content="1200"/>
  <meta property="og:image:height"          content="630"/>
  <meta property="og:image:alt"             content="${post.title} — Suboor Khan"/>
  <meta property="og:locale"                content="en_GB"/>
  <meta property="article:author"           content="${BASE}/"/>
  <meta property="article:published_time"   content="${pubISO}"/>
  <meta property="article:modified_time"    content="2026-03-05T00:00:00+00:00"/>
  <meta property="article:section"          content="${post.category}"/>
  ${c.tags.map(t => `<meta property="article:tag" content="${t}"/>`).join('\n  ')}

  <!-- Twitter / X Card -->
  <meta name="twitter:card"        content="summary_large_image"/>
  <meta name="twitter:site"        content="@suboorkhan"/>
  <meta name="twitter:creator"     content="@suboorkhan"/>
  <meta name="twitter:title"       content="${post.title}"/>
  <meta name="twitter:description" content="${post.excerpt}"/>
  <meta name="twitter:image"       content="${BASE}/og-cover.png"/>
  <meta name="twitter:label1"      content="Reading time"/>
  <meta name="twitter:data1"       content="${post.readTime}"/>
  <meta name="twitter:label2"      content="Category"/>
  <meta name="twitter:data2"       content="${post.category}"/>

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "${url}#article",
        "url": "${url}",
        "headline": "${post.title}",
        "description": "${post.excerpt}",
        "image": {
          "@type": "ImageObject",
          "url": "${BASE}/og-cover.png",
          "width": 1200,
          "height": 630
        },
        "author": {
          "@type": "Person",
          "@id": "${BASE}/#person",
          "name": "Suboor Khan",
          "url": "${BASE}/",
          "sameAs": ["https://github.com/suboor123","https://www.linkedin.com/in/suboor-khan-314136158/","https://twitter.com/suboorkhan"]
        },
        "publisher": {
          "@type": "Person",
          "name": "Suboor Khan",
          "url": "${BASE}/"
        },
        "datePublished": "${pubISO}",
        "dateModified": "2026-03-05T00:00:00+00:00",
        "inLanguage": "en-GB",
        "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" },
        "keywords": [${c.tags.map(t => `"${t}"`).join(',')}],
        "articleSection": "${c.articleSection}",
        "wordCount": ${c.wordCount},
        "timeRequired": "PT${parseInt(post.readTime)}M",
        "isPartOf": {
          "@type": "Blog",
          "@id": "${BASE}/blog.html",
          "name": "Suboor Khan — Tech Blog",
          "url": "${BASE}/blog.html"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",        "item": "${BASE}/" },
            { "@type": "ListItem", "position": 2, "name": "Blog",        "item": "${BASE}/blog.html" },
            { "@type": "ListItem", "position": 3, "name": "${post.title}", "item": "${url}" }
          ]
        }
      }
    ]
  }
  <\/script>

  <!-- Tailwind -->
  <link rel="stylesheet" href="..\/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@700;800&display=swap"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet"/>
  <style>
    *{cursor:none !important}
    #cursor{width:12px;height:12px;background:#7c3aed;border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .15s,height .15s,background .3s;mix-blend-mode:difference}
    #cursor.hovered{width:36px;height:36px;background:#ec4899}
    #cursor.clicking{width:8px;height:8px}
    #cursor-follower{width:38px;height:38px;border:1.5px solid rgba(124,58,237,.55);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.6}
    #progress-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#7c3aed,#ec4899,#f97316);z-index:1001;transition:width .08s linear;border-radius:0 2px 2px 0}
    .glass{background:rgba(255,255,255,.055);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1)}
    html:not(.dark) .glass{background:rgba(255,255,255,.65);border:1px solid rgba(0,0,0,.08)}
    .blob{position:absolute;border-radius:9999px;filter:blur(90px);opacity:.2;animation:blob 9s infinite;pointer-events:none}
    .grad-text{background:linear-gradient(135deg,#7c3aed 0%,#ec4899 50%,#f97316 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .reveal{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .7s ease}
    .reveal.visible{opacity:1;transform:translateY(0)}
    .tilt-card{transform-style:preserve-3d;transition:transform .08s linear,box-shadow .35s ease;will-change:transform}
    .tilt-card:hover{box-shadow:0 24px 60px rgba(124,58,237,.22),0 0 0 1px rgba(124,58,237,.12)}
    .card-glow{position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:2;opacity:0;transition:opacity .35s;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(124,58,237,.22) 0%,transparent 65%)}
    .tilt-card:hover .card-glow{opacity:1}
    .skill-tag{font-size:.7rem;padding:.2rem .65rem;border-radius:9999px;background:rgba(124,58,237,.12);color:#a78bfa;border:1px solid rgba(124,58,237,.2);font-weight:500}
    html:not(.dark) .skill-tag{background:rgba(124,58,237,.08);color:#7c3aed;border-color:rgba(124,58,237,.15)}
    .btn-shimmer{background-size:200% auto;background-image:linear-gradient(135deg,#7c3aed 0%,#ec4899 40%,#f97316 60%,#7c3aed 100%);animation:shimmer 3s ease infinite}
    .s-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(124,58,237,.25),transparent)}
    *,*::before,*::after{transition:background-color .3s ease,border-color .3s ease,color .2s ease}
    .prose h2{font-family:'Syne',sans-serif;font-weight:800;font-size:1.5rem;margin:2.5rem 0 1rem;line-height:1.3}
    .prose h3{font-family:'Syne',sans-serif;font-weight:700;font-size:1.15rem;margin:2rem 0 .75rem}
    .prose p{margin-bottom:1.25rem;line-height:1.85;font-size:.925rem}
    .prose ul,.prose ol{margin:1rem 0 1.5rem 1.25rem}
    .prose ul{list-style:disc}.prose ol{list-style:decimal}
    .prose li{margin-bottom:.5rem;font-size:.925rem;line-height:1.75}
    .prose blockquote{border-left:3px solid #7c3aed;padding:.75rem 1.25rem;margin:1.5rem 0;background:rgba(124,58,237,.06);border-radius:0 .75rem .75rem 0}
    .prose blockquote p{margin:0;color:#a78bfa;font-style:italic}
    html:not(.dark) .prose blockquote p{color:#7c3aed}
    .prose code{font-size:.8rem;background:rgba(124,58,237,.12);color:#a78bfa;padding:.15rem .4rem;border-radius:.3rem;font-family:'Courier New',monospace}
    html:not(.dark) .prose code{background:rgba(124,58,237,.08);color:#6d28d9}
    .prose pre{background:#0d0d1a;border:1px solid rgba(124,58,237,.2);border-radius:1rem;padding:1.25rem 1.5rem;margin:1.5rem 0;overflow-x:auto}
    html:not(.dark) .prose pre{background:#f5f3ff}
    .prose pre code{background:none;color:#e2e8f0;padding:0;font-size:.8rem}
    html:not(.dark) .prose pre code{color:#3730a3}
    .toc-link{font-size:.8rem;padding:.3rem .75rem;border-radius:.5rem;transition:all .2s;display:block}
    .toc-link:hover,.toc-link.active{background:rgba(124,58,237,.12);color:#a78bfa}
    html:not(.dark) .toc-link:hover,html:not(.dark) .toc-link.active{color:#7c3aed}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    .float{animation:float 4s ease-in-out infinite}
  </style>
</head>
<body class="dark:bg-[#06060f] bg-gray-50 dark:text-gray-100 text-gray-900 font-sans antialiased overflow-x-hidden">
<a href="#article-body" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:text-sm">Skip to article</a>
<div id="cursor" aria-hidden="true"></div>
<div id="cursor-follower" aria-hidden="true"></div>
<div id="progress-bar" style="width:0%" aria-hidden="true"></div>

<header>
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" aria-label="Main navigation">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="../index.html" class="font-display text-xl font-bold grad-text tracking-tight" aria-label="Suboor Khan — Home">SK.</a>
      <ul class="hidden md:flex items-center gap-8 text-sm font-medium" role="list">
        <li><a href="../index.html#about"  class="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">About</a></li>
        <li><a href="../projects.html"     class="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">Projects</a></li>
        <li><a href="../blog.html"         class="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors text-accent font-semibold">Blog</a></li>
        <li><a href="../ai-skills.html"    class="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">AI &amp; Skills</a></li>
        <li><a href="../resume.html"       class="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">Resume</a></li>
        <li><a href="../contact.html"      class="dark:text-gray-300 text-gray-600 hover:text-accent transition-colors">Contact</a></li>
        <li><a href="../hire-me.html"      class="px-4 py-2 rounded-full btn-shimmer text-white font-semibold text-sm hover:scale-105 transition-transform shadow-md shadow-purple-500/25">Hire Me</a></li>
      </ul>
      <div class="flex items-center gap-3">
        <button id="theme-toggle" aria-label="Toggle theme" class="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-yellow-400 hidden dark:block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="w-5 h-5 text-gray-700 block dark:hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button id="menu-btn" class="md:hidden w-10 h-10 glass rounded-full flex flex-col items-center justify-center gap-[5px]" aria-label="Open menu" aria-expanded="false">
          <span class="w-5 h-0.5 dark:bg-white bg-gray-800 rounded transition-all" id="bar1"></span>
          <span class="w-5 h-0.5 dark:bg-white bg-gray-800 rounded transition-all" id="bar2"></span>
          <span class="w-4 h-0.5 dark:bg-white bg-gray-800 rounded transition-all" id="bar3"></span>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden md:hidden glass mx-4 mb-4 rounded-2xl overflow-hidden" role="menu">
      <ul class="flex flex-col p-4 gap-2 text-sm font-medium">
        <li><a href="../index.html#about" class="mobile-link block px-4 py-2.5 rounded-xl hover:bg-purple-500/10 transition">About</a></li>
        <li><a href="../projects.html"    class="mobile-link block px-4 py-2.5 rounded-xl hover:bg-purple-500/10 transition">Projects</a></li>
        <li><a href="../blog.html"        class="mobile-link block px-4 py-2.5 rounded-xl hover:bg-purple-500/10 transition">Blog</a></li>
        <li><a href="../ai-skills.html"   class="mobile-link block px-4 py-2.5 rounded-xl hover:bg-purple-500/10 transition">AI &amp; Skills</a></li>
        <li><a href="../resume.html"      class="mobile-link block px-4 py-2.5 rounded-xl hover:bg-purple-500/10 transition">Resume</a></li>
        <li><a href="../contact.html"     class="mobile-link block px-4 py-2.5 rounded-xl hover:bg-purple-500/10 transition">Contact</a></li>
        <li><a href="../hire-me.html"     class="mobile-link block px-4 py-2.5 rounded-xl bg-purple-600/20 text-purple-400 font-semibold">✦ Hire Me</a></li>
      </ul>
    </div>
  </nav>
</header>

<main>
  <!-- HERO -->
  <section class="relative pt-32 pb-0 overflow-hidden" aria-label="Article header">
    <div class="blob w-[32rem] h-[32rem] dark:bg-indigo-800 bg-indigo-200 -top-32 -right-32" style="animation-delay:0s" aria-hidden="true"></div>
    <div class="blob w-64 h-64 dark:bg-pink-700 bg-pink-200 bottom-0 left-0" style="animation-delay:6s" aria-hidden="true"></div>
    <div class="max-w-5xl mx-auto px-6">

      <!-- Breadcrumb (also in JSON-LD above) -->
      <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs dark:text-gray-500 text-gray-400 mb-8 animate-[fadeUp_.5s_ease_forwards]">
        <a href="../index.html" class="hover:dark:text-purple-300 hover:text-purple-600 transition-colors">Home</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        <a href="../blog.html" class="hover:dark:text-purple-300 hover:text-purple-600 transition-colors">Blog</a>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        <span class="dark:text-gray-300 text-gray-600 truncate max-w-[200px]">${post.title}</span>
      </nav>

      <!-- Meta -->
      <div class="flex flex-wrap items-center gap-3 mb-5 animate-[fadeUp_.5s_.05s_ease_both]">
        <span class="skill-tag">${post.category}</span>
        <span class="text-xs dark:text-gray-500 text-gray-400">${post.dateLabel}</span>
        <span class="dark:text-gray-700 text-gray-300" aria-hidden="true">·</span>
        <span class="text-xs dark:text-gray-500 text-gray-400">${post.readTime}</span>
        <span class="dark:text-gray-700 text-gray-300" aria-hidden="true">·</span>
        <span class="text-xs dark:text-gray-500 text-gray-400">${c.views} views</span>
      </div>

      <h1 class="font-display font-extrabold leading-tight mb-6 animate-[fadeUp_.6s_.1s_ease_both]" style="font-size:clamp(1.8rem,5vw,3.5rem)">${post.title}</h1>
      <p class="dark:text-gray-400 text-gray-500 text-base leading-relaxed mb-8 max-w-2xl animate-[fadeUp_.6s_.12s_ease_both]">${post.excerpt}</p>

      <!-- Author -->
      <div class="flex items-center gap-4 mb-12 animate-[fadeUp_.6s_.15s_ease_both]">
        <div class="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-lg flex-shrink-0" style="background:rgba(124,58,237,.4)" aria-hidden="true">SK</div>
        <div>
          <p class="font-semibold text-sm">Suboor Khan</p>
          <p class="text-xs dark:text-gray-500 text-gray-400">Full-Stack Developer &amp; Technical Writer</p>
        </div>
        <div class="ml-auto flex gap-2 flex-shrink-0">
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}" target="_blank" rel="noopener noreferrer" class="glass w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform" aria-label="Share on X (Twitter)">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <button onclick="navigator.clipboard.writeText(location.href).then(()=>this.textContent='✓')" class="glass px-3 h-9 rounded-full text-xs font-semibold hover:scale-110 transition-transform" aria-label="Copy link to clipboard">Copy link</button>
        </div>
      </div>

      <!-- Cover -->
      <div class="rounded-3xl overflow-hidden mb-0 float" style="background:${post.gradient};height:340px;position:relative" role="img" aria-label="Article cover: ${post.emoji}">
        <div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(rgba(167,139,250,.6) 1px,transparent 1px);background-size:28px 28px" aria-hidden="true"></div>
        <div class="absolute inset-0 flex items-center justify-center text-[5rem]" style="filter:drop-shadow(0 0 60px rgba(167,139,250,.5))" aria-hidden="true">${post.emoji}</div>
        <div class="absolute bottom-5 right-6 glass px-3 py-1.5 rounded-xl text-xs font-semibold dark:text-purple-300 text-purple-700">${post.category}</div>
      </div>
    </div>
  </section>

  <!-- ARTICLE + SIDEBAR -->
  <section class="py-20" aria-label="Article content">
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid lg:grid-cols-[1fr_260px] gap-12 items-start">

        <!-- ARTICLE BODY -->
        <article id="article-body" class="prose dark:text-gray-300 text-gray-700">
          ${c.body}
        </article>

        <!-- SIDEBAR -->
        <aside class="lg:sticky lg:top-28 space-y-5" aria-label="Article sidebar">

          <!-- ToC -->
          <div class="glass rounded-2xl p-5 reveal">
            <p class="text-xs tracking-widest uppercase dark:text-gray-500 text-gray-400 font-semibold mb-3">In This Article</p>
            <nav aria-label="Table of contents">
              ${toc}
            </nav>
          </div>

          <!-- Article info -->
          <div class="glass rounded-2xl p-5 reveal space-y-3 text-xs">
            <p class="text-xs tracking-widest uppercase dark:text-gray-500 text-gray-400 font-semibold">Article Info</p>
            <div class="flex justify-between"><span class="dark:text-gray-500 text-gray-400">Published</span><time datetime="${pubISO}" class="font-medium">${post.dateLabel}</time></div>
            <div class="flex justify-between"><span class="dark:text-gray-500 text-gray-400">Read time</span><span class="font-medium">${post.readTime}</span></div>
            <div class="flex justify-between"><span class="dark:text-gray-500 text-gray-400">Views</span><span class="font-medium">${c.views}</span></div>
            <div class="flex justify-between"><span class="dark:text-gray-500 text-gray-400">Words</span><span class="font-medium">${c.wordCount.toLocaleString()}</span></div>
            <div class="flex justify-between"><span class="dark:text-gray-500 text-gray-400">Category</span><span class="font-medium">${post.category}</span></div>
          </div>

          <!-- Tags -->
          <div class="glass rounded-2xl p-5 reveal">
            <p class="text-xs tracking-widest uppercase dark:text-gray-500 text-gray-400 font-semibold mb-3">Tags</p>
            <div class="flex flex-wrap gap-2">
              ${c.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
            </div>
          </div>

          <!-- Share -->
          <div class="glass rounded-2xl p-5 reveal">
            <p class="text-xs tracking-widest uppercase dark:text-gray-500 text-gray-400 font-semibold mb-3">Share</p>
            <div class="space-y-2">
              <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title + ' by @suboorkhan')}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-xs font-semibold dark:text-gray-400 text-gray-600 hover:dark:text-sky-400 hover:text-sky-600 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Share on X
              </a>
              <a href="https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-xs font-semibold dark:text-gray-400 text-gray-600 hover:dark:text-blue-400 hover:text-blue-600 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452H17.01v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.584V9h3.302v1.561h.046c.458-.87 1.579-1.796 3.25-1.796 3.483 0 4.126 2.291 4.126 5.271v6.416z"/></svg>
                Share on LinkedIn
              </a>
              <button onclick="navigator.clipboard.writeText(location.href).then(()=>this.textContent='✓ Link copied!')" class="flex items-center gap-2 text-xs font-semibold dark:text-gray-400 text-gray-600 hover:dark:text-purple-400 hover:text-purple-600 transition-colors w-full text-left">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                Copy link
              </button>
            </div>
          </div>

          <!-- Hire me CTA -->
          <a href="../hire-me.html" class="glass block rounded-2xl p-5 reveal text-center hover:scale-[1.02] transition-transform border-purple-500/20 border">
            <p class="text-xs dark:text-purple-400 text-purple-600 font-semibold mb-1">Like what you read?</p>
            <p class="font-display font-bold text-sm mb-2">Work with me</p>
            <span class="btn-shimmer text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block">Hire Me →</span>
          </a>

        </aside>
      </div>
    </div>
  </section>

  <div class="s-divider max-w-5xl mx-auto px-6 my-4"></div>

  <!-- MORE ARTICLES -->
  <section class="py-16" aria-label="Related articles">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="font-display font-bold text-2xl mb-8 reveal">More <span class="grad-text">Articles</span></h2>
      <div class="grid sm:grid-cols-3 gap-5">
        ${relatedCards(post.slug)}
      </div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="pb-24" aria-label="Newsletter signup">
    <div class="max-w-5xl mx-auto px-6">
      <div class="reveal glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div class="blob w-64 h-64 dark:bg-purple-700 bg-purple-200 -top-10 -right-10" style="animation-delay:1s" aria-hidden="true"></div>
        <div class="relative z-10">
          <p class="text-xs tracking-widest uppercase dark:text-purple-400 text-purple-600 font-semibold mb-4">Stay Updated</p>
          <h3 class="font-display font-bold text-3xl mb-3">Enjoyed this article?</h3>
          <p class="dark:text-gray-400 text-gray-600 text-sm mb-8 max-w-md mx-auto">Deep-dive articles on React, AI, WebGL, and software craft — twice a month. No spam, ever.</p>
          <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onsubmit="return false" aria-label="Newsletter signup form">
            <label for="email-input" class="sr-only">Email address</label>
            <input id="email-input" type="email" placeholder="your@email.com" autocomplete="email" class="flex-1 rounded-xl px-4 py-3 text-sm dark:text-gray-100 text-gray-800 outline-none border dark:border-white/10 border-gray-200 focus:border-purple-500 dark:bg-white/5 bg-white/70"/>
            <button type="submit" class="btn-shimmer text-white font-semibold text-sm px-6 py-3 rounded-xl hover:scale-105 transition-transform whitespace-nowrap">Subscribe Free</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="py-12 border-t dark:border-white/5 border-gray-100" aria-label="Site footer">
  <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
    <div class="text-center md:text-left">
      <p class="font-display font-bold text-xl grad-text mb-1">Suboor Khan</p>
      <p class="text-xs dark:text-gray-600 text-gray-400">Crafting digital experiences since 2018</p>
    </div>
    <nav aria-label="Social links"><ul class="flex items-center gap-3" role="list">
      <li><a href="https://github.com/suboor123" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="w-10 h-10 glass rounded-full flex items-center justify-center hover:scale-110 transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0012 0z"/></svg></a></li>
      <li><a href="https://www.linkedin.com/in/suboor-khan-314136158/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-10 h-10 glass rounded-full flex items-center justify-center hover:scale-110 transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452H17.01v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.584V9h3.302v1.561h.046c.458-.87 1.579-1.796 3.25-1.796 3.483 0 4.126 2.291 4.126 5.271v6.416z"/></svg></a></li>
      <li><a href="https://twitter.com/suboorkhan" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" class="w-10 h-10 glass rounded-full flex items-center justify-center hover:scale-110 transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a></li>
    </ul></nav>
    <p class="text-xs dark:text-gray-600 text-gray-400">&copy; 2026 Suboor Khan</p>
  </div>
</footer>

<script>
(() => {
  const html=document.documentElement;
  const saved=localStorage.getItem('theme');
  if(saved==='light')html.classList.remove('dark');else html.classList.add('dark');
  document.getElementById('theme-toggle').addEventListener('click',()=>{html.classList.toggle('dark');localStorage.setItem('theme',html.classList.contains('dark')?'dark':'light');});
  const pb=document.getElementById('progress-bar');
  window.addEventListener('scroll',()=>{pb.style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';},{passive:true});
  const navbar=document.getElementById('navbar');
  window.addEventListener('scroll',()=>{if(window.scrollY>50){navbar.style.background='rgba(6,6,15,.85)';navbar.style.backdropFilter='blur(20px)';navbar.style.borderBottom='1px solid rgba(255,255,255,.05)';}else{navbar.style.background=navbar.style.backdropFilter=navbar.style.borderBottom='';}},{passive:true});
  const menuBtn=document.getElementById('menu-btn'),mobileMenu=document.getElementById('mobile-menu');
  const b1=document.getElementById('bar1'),b2=document.getElementById('bar2'),b3=document.getElementById('bar3');
  let open=false;
  menuBtn.addEventListener('click',()=>{open=!open;menuBtn.setAttribute('aria-expanded',open);mobileMenu.classList.toggle('hidden',!open);b1.style.transform=open?'rotate(45deg) translateY(7px)':'';b2.style.opacity=open?'0':'1';b3.style.transform=open?'rotate(-45deg) translateY(-7px)':'';});
  document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{open=false;mobileMenu.classList.add('hidden');b1.style.transform=b3.style.transform='';b2.style.opacity='1';}));
  const cur=document.getElementById('cursor'),fol=document.getElementById('cursor-follower');
  let mx=0,my=0,fx=0,fy=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  document.addEventListener('mousedown',()=>cur.classList.add('clicking'));
  document.addEventListener('mouseup',()=>cur.classList.remove('clicking'));
  document.querySelectorAll('a,button,input,textarea,.tilt-card,summary').forEach(el=>{el.addEventListener('mouseenter',()=>cur.classList.add('hovered'));el.addEventListener('mouseleave',()=>cur.classList.remove('hovered'));});
  (function tick(){fx+=(mx-fx)*.1;fy+=(my-fy)*.1;fol.style.left=fx+'px';fol.style.top=fy+'px';requestAnimationFrame(tick);})();
  const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target);}});},{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));
  document.querySelectorAll('.tilt-card').forEach(card=>{
    const glow=card.querySelector('.card-glow');
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(800px) rotateX('+(-y*10)+'deg) rotateY('+(x*10)+'deg) scale3d(1.02,1.02,1.02)';if(glow){glow.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');glow.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');}});
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
})();

// Active ToC on scroll
(() => {
  const tocLinks=document.querySelectorAll('.toc-link');
  if(!tocLinks.length) return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        tocLinks.forEach(l=>l.classList.remove('active'));
        const active=[...tocLinks].find(l=>l.getAttribute('href')==='#'+e.target.id);
        if(active)active.classList.add('active');
      }
    });
  },{rootMargin:'-15% 0px -75% 0px'});
  document.querySelectorAll('article [id]').forEach(s=>obs.observe(s));
})();
<\/script>
</body>
</html>`;
}

/* ─── Write files ──────────────────────────────────────────────────────────── */
const outDir = path.join(__dirname, 'blogs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

let generated = 0;
blogs.forEach(post => {
  if (!content[post.slug]) {
    console.warn(`⚠  No content defined for slug: ${post.slug}`);
    return;
  }
  const html = generatePage(post);
  const file = path.join(outDir, `${post.slug}.html`);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`✓  blogs/${post.slug}.html`);
  generated++;
});

console.log(`\n✅ Generated ${generated} blog pages in /blogs/`);

/* ─── Update blogs.json links ──────────────────────────────────────────────── */
const jsonPath = path.join(__dirname, 'data/blogs.json');
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
jsonData.posts.forEach(p => { p.link = `blogs/${p.slug}.html`; });
fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');
console.log('✓  data/blogs.json links updated');
