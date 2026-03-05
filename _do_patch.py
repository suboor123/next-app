#!/usr/bin/env python3
import re, sys, os

os.chdir('/Users/210093/Desktop/portfolio')
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print(f"Loaded {len(html)} chars")

# ═══ STEP 1: Extract code-demo section ═══════════════════════════════
m = re.search(r'(\s*<!-- CODE TERMINAL ANIMATION -->.*?</section>)', html, re.DOTALL)
if not m:
    sys.exit("ERROR: code-demo not found")
code_demo_block = m.group(1)
print(f"code-demo: {len(code_demo_block)} chars")

# ═══ STEP 2: Remove code-demo from after-hero position ═══════════════
# The pattern is: </section>\n\n    <div class="s-divider"></div>\n\n    <!-- CODE TERMINAL ANIMATION -->...
# We remove the leading s-divider + code-demo block, keep the trailing s-divider before ABOUT
search2 = '\n    <div class="s-divider"></div>' + code_demo_block
if search2 not in html:
    print("ERR: removal search2 not found, trying variant...")
    # Maybe there's no blank line
    search2 = '\n    <div class="s-divider"></div>' + code_demo_block.lstrip()
    if search2 not in html:
        sys.exit("ERROR: cannot find code-demo removal target")
html = html.replace(search2, '', 1)
print("Step 2 done: code-demo removed from hero area")

# ═══ STEP 3: Replace old hero with new hero ═══════════════════════════
OLD_HERO_OPEN = '    <!-- HERO -->\n    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-label="Hero introduction">'
NEW_HERO_OPEN = '    <!-- HERO -->\n    <section id="hero" class="relative min-h-screen flex items-center overflow-hidden pt-20" aria-label="Hero introduction">'

OLD_BLOBS = '''      <div class="blob w-[520px] h-[520px] dark:bg-purple-700 bg-purple-300 -top-20 -left-32" style="animation-delay:0s"></div>
      <div class="blob w-96      h-96      dark:bg-pink-700   bg-pink-300   bottom-10 right-0" style="animation-delay:3.5s"></div>
      <div class="blob w-72      h-72      dark:bg-indigo-700 bg-indigo-300 top-1/2 right-1/3" style="animation-delay:6s"></div>
      <div class="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style="background-image:radial-gradient(rgba(124,58,237,.7) 1px,transparent 1px);background-size:38px 38px" aria-hidden="true"></div>'''

NEW_BLOBS = '''      <div class="blob w-[620px] h-[620px] dark:bg-purple-700 bg-purple-300 -top-40 -left-40" style="animation-delay:0s"></div>
      <div class="blob w-[420px] h-[420px] dark:bg-pink-700 bg-pink-300 top-1/3 -right-24" style="animation-delay:3.5s"></div>
      <div class="blob w-80 h-80 dark:bg-indigo-700 bg-indigo-300 bottom-0 left-1/3" style="animation-delay:6s"></div>
      <div class="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.045]"
        style="background-image:radial-gradient(rgba(124,58,237,.75) 1px,transparent 1px);background-size:36px 36px" aria-hidden="true"></div>
      <div class="absolute left-0 right-0 top-1/2 h-px pointer-events-none" style="background:linear-gradient(90deg,transparent,rgba(124,58,237,.1),rgba(236,72,153,.1),transparent)" aria-hidden="true"></div>'''

OLD_INNER = '''      <div id="hero-inner" class="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium dark:text-purple-300 text-purple-700 mb-8 animate-[fadeUp_.6s_ease_forwards]">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
          Available for new opportunities
        </div>
        <h1 class="font-display font-extrabold leading-none mb-6 animate-[fadeUp_.7s_.1s_ease_both]" style="font-size:clamp(3.5rem,10vw,9rem)">
          <span class="block dark:text-white text-gray-900">Suboor</span>
          <span class="grad-text block">Khan.</span>
        </h1>
        <p class="text-lg md:text-2xl dark:text-gray-400 text-gray-500 font-light tracking-wide mb-4 animate-[fadeUp_.7s_.2s_ease_both]">
          Full-Stack Developer &amp; Creative Technologist
        </p>
        <p class="max-w-xl mx-auto dark:text-gray-500 text-gray-400 text-sm md:text-base leading-relaxed mb-10 animate-[fadeUp_.7s_.3s_ease_both]">
          Crafting elegant digital experiences — pixel-perfect interfaces to scalable backend systems. Building products trusted by millions.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeUp_.7s_.4s_ease_both]">
          <a href="projects.html" class="btn-shimmer group px-8 py-3.5 rounded-full font-semibold text-sm text-white hover:scale-105 transition-transform shadow-lg shadow-purple-500/25">
            View My Work <span class="ml-1 group-hover:translate-x-1 inline-block transition-transform">&#8594;</span>
          </a>
          <a href="contact.html" class="px-8 py-3.5 rounded-full font-semibold text-sm glass dark:text-white text-gray-800 hover:scale-105 transition-transform border dark:border-white/10 border-gray-200">
            Let\'s Talk &#8594;
          </a>
        </div>
        <div class="mt-16 flex flex-wrap items-center justify-center gap-8 animate-[fadeUp_.7s_.6s_ease_both]">
          <div class="text-center"><p class="font-display font-bold text-3xl grad-text">5+</p><p class="text-xs dark:text-gray-500 text-gray-500 mt-1">Years Experience</p></div>
          <div class="w-px h-10 dark:bg-gray-700 bg-gray-200 hidden sm:block"></div>
          <div class="text-center"><p class="font-display font-bold text-3xl grad-text">40+</p><p class="text-xs dark:text-gray-500 text-gray-500 mt-1">Projects Shipped</p></div>
          <div class="w-px h-10 dark:bg-gray-700 bg-gray-200 hidden sm:block"></div>
          <div class="text-center"><p class="font-display font-bold text-3xl grad-text">10M+</p><p class="text-xs dark:text-gray-500 text-gray-500 mt-1">Users Reached</p></div>
          <div class="w-px h-10 dark:bg-gray-700 bg-gray-200 hidden sm:block"></div>
          <div class="text-center"><p class="font-display font-bold text-3xl grad-text">3.2K</p><p class="text-xs dark:text-gray-500 text-gray-500 mt-1">GitHub Stars</p></div>
        </div>
        <div class="mt-14 flex flex-col items-center gap-1.5 animate-bounce opacity-40" aria-hidden="true">
          <span class="text-[10px] tracking-[.2em] uppercase dark:text-gray-500 text-gray-400">Scroll</span>
          <svg class="w-4 h-4 dark:text-gray-500 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
    </section>'''

NEW_INNER = '''      <div id="hero-inner" class="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <div class="grid lg:grid-cols-2 gap-16 items-center">

          <!-- LEFT: text -->
          <div>
            <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium dark:text-purple-300 text-purple-700 mb-8" style="animation:fadeUp .55s ease both;opacity:0">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
              Available for new opportunities
            </div>

            <h1 class="font-display font-extrabold leading-none mb-5" style="font-size:clamp(3rem,7.5vw,7rem);animation:fadeUp .7s .1s ease both;opacity:0">
              <span class="block dark:text-white text-gray-900">Suboor</span>
              <span class="grad-text block">Khan.</span>
            </h1>

            <div class="flex flex-wrap items-center gap-2 mb-6 min-h-[2.2rem]" style="animation:fadeUp .7s .25s ease both;opacity:0">
              <span class="text-lg md:text-xl dark:text-gray-300 text-gray-600 font-light">I build</span>
              <span class="text-lg md:text-xl font-semibold grad-text" id="hero-role-text"></span><span class="hero-tw-cursor text-xl font-light text-purple-400">|</span>
            </div>

            <p class="max-w-lg dark:text-gray-400 text-gray-500 text-sm md:text-base leading-relaxed mb-10" style="animation:fadeUp .7s .4s ease both;opacity:0">
              Crafting elegant digital experiences &#8212; pixel-perfect interfaces to scalable backend systems. Building products trusted by millions worldwide.
            </p>

            <div class="flex flex-col sm:flex-row items-start gap-4 mb-12" style="animation:fadeUp .7s .52s ease both;opacity:0">
              <a href="projects.html" class="btn-shimmer group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white hover:scale-105 transition-transform shadow-lg shadow-purple-500/30">
                View My Work
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="contact.html" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm glass dark:text-white text-gray-800 hover:scale-105 transition-transform border dark:border-white/10 border-gray-200">
                Let\'s Talk
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            <div class="flex flex-wrap gap-2" style="animation:fadeUp .7s .65s ease both;opacity:0">
              <span class="hero-tech-pill">&#x269B; React</span>
              <span class="hero-tech-pill">&#x25B2; Next.js</span>
              <span class="hero-tech-pill">&#x1F7E2; Node.js</span>
              <span class="hero-tech-pill">&#x1F537; TypeScript</span>
              <span class="hero-tech-pill">&#x1F40D; Python</span>
              <span class="hero-tech-pill">&#x2601; AWS</span>
            </div>
          </div>

          <!-- RIGHT: visual -->
          <div class="hidden lg:flex items-center justify-center relative h-[500px]" style="animation:fadeUp .9s .35s ease both;opacity:0" aria-hidden="true">
            <!-- Orbit rings -->
            <div class="absolute w-[360px] h-[360px] rounded-full border dark:border-purple-500/15 border-purple-400/20 animate-[spinSlow_28s_linear_infinite]"></div>
            <div class="absolute w-[450px] h-[450px] rounded-full border dark:border-pink-500/10 border-pink-400/15" style="animation:spinSlow 40s linear infinite reverse"></div>

            <!-- Orbiting badges -->
            <div class="hero-orbit" style="--angle:0deg"><div class="hero-orbit-badge" style="background:rgba(97,218,251,.1);border-color:rgba(97,218,251,.3);color:#61dafb">&#x269B; React</div></div>
            <div class="hero-orbit" style="--angle:60deg"><div class="hero-orbit-badge" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15)">&#x25B2; Next.js</div></div>
            <div class="hero-orbit" style="--angle:120deg"><div class="hero-orbit-badge" style="background:rgba(104,211,145,.1);border-color:rgba(104,211,145,.3);color:#68d391">&#x1F7E2; Node</div></div>
            <div class="hero-orbit" style="--angle:180deg"><div class="hero-orbit-badge" style="background:rgba(49,130,206,.1);border-color:rgba(49,130,206,.3);color:#63b3ed">&#x1F537; TypeScript</div></div>
            <div class="hero-orbit" style="--angle:240deg"><div class="hero-orbit-badge" style="background:rgba(255,213,79,.08);border-color:rgba(255,213,79,.25);color:#f6e05e">&#x1F40D; Python</div></div>
            <div class="hero-orbit" style="--angle:300deg"><div class="hero-orbit-badge" style="background:rgba(252,129,74,.08);border-color:rgba(252,129,74,.25);color:#fc8149">&#x2601; AWS</div></div>

            <!-- Center card -->
            <div class="relative z-10 glass rounded-3xl p-7 text-center w-52 shadow-2xl shadow-purple-900/50 float">
              <div class="relative w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center font-display font-bold text-3xl text-white" style="background:linear-gradient(135deg,#7c3aed,#ec4899)">
                SK
                <div class="absolute -inset-2 rounded-3xl opacity-25 -z-10" style="background:linear-gradient(135deg,#7c3aed,#ec4899);filter:blur(16px)"></div>
              </div>
              <p class="font-display font-bold text-base dark:text-white text-gray-900 mb-0.5">Suboor Khan</p>
              <p class="text-xs dark:text-gray-400 text-gray-500 mb-4">Full-Stack Developer</p>
              <div class="flex items-center justify-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-xs dark:text-gray-400 text-gray-500">Open to work</span>
              </div>
            </div>

            <!-- Stat chips -->
            <div class="absolute top-8 right-6 glass rounded-2xl px-3.5 py-2.5 float-slow">
              <p class="text-[10px] dark:text-gray-400 text-gray-500 mb-0.5 font-medium">Projects Shipped</p>
              <p class="font-display font-bold text-xl grad-text">40+</p>
            </div>
            <div class="absolute bottom-10 left-4 glass rounded-2xl px-3.5 py-2.5 float" style="animation-delay:1s">
              <p class="text-[10px] dark:text-gray-400 text-gray-500 mb-0.5 font-medium">GitHub Stars</p>
              <p class="font-display font-bold text-xl grad-text">3.2K</p>
            </div>
            <div class="absolute top-1/2 -translate-y-1/2 right-0 glass rounded-2xl px-3.5 py-2.5 float-slow" style="animation-delay:1.8s">
              <p class="text-[10px] dark:text-gray-400 text-gray-500 mb-0.5 font-medium">Users Reached</p>
              <p class="font-display font-bold text-xl grad-text">10M+</p>
            </div>
          </div>
        </div>

        <!-- Stats row -->
        <div class="mt-20 pt-10 border-t dark:border-white/[.06] border-gray-200/60 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center" style="animation:fadeUp .7s .8s ease both;opacity:0">
          <div><p class="font-display font-bold text-4xl grad-text hero-counter" data-target="5" data-suffix="+">0+</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1.5 tracking-wider uppercase">Years Exp</p></div>
          <div><p class="font-display font-bold text-4xl grad-text hero-counter" data-target="40" data-suffix="+">0+</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1.5 tracking-wider uppercase">Projects</p></div>
          <div><p class="font-display font-bold text-4xl grad-text">10M+</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1.5 tracking-wider uppercase">Users Reached</p></div>
          <div><p class="font-display font-bold text-4xl grad-text">3.2K</p><p class="text-xs dark:text-gray-500 text-gray-400 mt-1.5 tracking-wider uppercase">GitHub Stars</p></div>
        </div>

        <!-- Scroll indicator -->
        <div class="mt-14 flex flex-col items-center gap-2 opacity-50" aria-hidden="true">
          <span class="text-[10px] tracking-[.2em] uppercase dark:text-gray-500 text-gray-400">Scroll</span>
          <div class="w-5 h-8 rounded-full border dark:border-gray-600 border-gray-400 flex items-start justify-center pt-1.5">
            <div class="w-1 h-2 rounded-full dark:bg-gray-400 bg-gray-500 hero-scroll-dot"></div>
          </div>
        </div>
      </div>

      <style>
        .hero-tech-pill{font-size:.72rem;padding:.3rem .85rem;border-radius:9999px;background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.18);color:#a78bfa;font-weight:500;letter-spacing:.01em;transition:background .2s,transform .2s,box-shadow .2s}
        .hero-tech-pill:hover{background:rgba(124,58,237,.16);transform:translateY(-2px);box-shadow:0 4px 16px rgba(124,58,237,.18)}
        html:not(.dark) .hero-tech-pill{background:rgba(124,58,237,.07);color:#7c3aed;border-color:rgba(124,58,237,.2)}
        .hero-orbit{position:absolute;left:50%;top:50%;width:0;height:0;animation:heroSpin 20s linear infinite}
        @keyframes heroSpin{from{transform:rotate(var(--angle,0deg))}to{transform:rotate(calc(var(--angle,0deg) + 360deg))}}
        .hero-orbit-badge{position:absolute;transform:translateX(175px) translateY(-50%) rotate(calc(-1 * var(--angle,0deg)));display:inline-flex;align-items:center;gap:5px;padding:5px 13px;border-radius:9999px;border:1px solid;font-size:.65rem;font-weight:600;letter-spacing:.03em;white-space:nowrap;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
        html:not(.dark) .hero-orbit-badge{color:#374151!important;background:rgba(255,255,255,.78)!important;border-color:rgba(0,0,0,.12)!important;box-shadow:0 2px 12px rgba(0,0,0,.07)}
        .hero-orbit:nth-child(3){animation-duration:22s}.hero-orbit:nth-child(4){animation-duration:19s}.hero-orbit:nth-child(5){animation-duration:25s}.hero-orbit:nth-child(6){animation-duration:18s}.hero-orbit:nth-child(7){animation-duration:21s}.hero-orbit:nth-child(8){animation-duration:24s}
        .hero-tw-cursor{animation:twBlink 1s step-end infinite}
        @keyframes twBlink{0%,100%{opacity:1}50%{opacity:0}}
        .hero-scroll-dot{animation:scrollDot 1.8s ease-in-out infinite}
        @keyframes scrollDot{0%,100%{transform:translateY(0);opacity:1}70%{transform:translateY(14px);opacity:0}}
      </style>

      <script>
      (function(){
        var roles=['React apps','Node.js APIs','full-stack products','scalable systems','AI-powered apps','Next.js experiences'];
        var el=document.getElementById(\'hero-role-text\');
        var ri=0,ci=0,del=false;
        function type(){var w=roles[ri];if(!del){el.textContent=w.slice(0,++ci);if(ci===w.length){del=true;return setTimeout(type,1800);}}else{el.textContent=w.slice(0,--ci);if(ci===0){del=false;ri=(ri+1)%roles.length;}}setTimeout(type,del?50:88);}
        setTimeout(type,1000);
        setTimeout(function(){
          document.querySelectorAll(\'.hero-counter\').forEach(function(el){
            var t=+el.dataset.target,s=el.dataset.suffix||\'\',c=0,step=Math.max(1,Math.floor(t/35));
            function tick(){c=Math.min(c+step,t);el.textContent=c+s;if(c<t)requestAnimationFrame(tick);}tick();
          });
        },1300);
      })();
      </script>
    </section>'''

# Apply replacements
if OLD_HERO_OPEN not in html:
    sys.exit("ERROR: OLD_HERO_OPEN not found")
html = html.replace(OLD_HERO_OPEN, NEW_HERO_OPEN, 1)
print("Hero open tag replaced")

if OLD_BLOBS not in html:
    sys.exit("ERROR: OLD_BLOBS not found")
html = html.replace(OLD_BLOBS, NEW_BLOBS, 1)
print("Hero blobs replaced")

if OLD_INNER not in html:
    sys.exit("ERROR: OLD_INNER not found")
html = html.replace(OLD_INNER, NEW_INNER, 1)
print("Hero inner div replaced")

# ═══ STEP 4: Insert code-demo after SKILLS, before AI & TOOLS ════════
# Find the s-divider right before AI & TOOLS
candidates = [
    '\n    <div class="s-divider"></div>\n\n    <!-- AI & TOOLS -->',
    '\n    <div class="s-divider"></div>\n\n    <!-- AI &amp; TOOLS -->',
]
marker = None
for c in candidates:
    if c in html:
        marker = c
        break
if not marker:
    idx = html.find('<!-- AI')
    print(f"Near AI section (idx={idx}):", repr(html[max(0,idx-120):idx+30]))
    sys.exit("ERROR: AI & TOOLS marker not found")

replacement = '\n    <div class="s-divider"></div>\n' + code_demo_block + '\n\n    <div class="s-divider"></div>\n\n    <!-- AI &amp; TOOLS -->'
html = html.replace(marker, replacement, 1)
print("code-demo inserted after SKILLS")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print(f"SUCCESS — file written ({len(html)} chars)")
