/* ═══════════════════════════════════════════
   KRAPTON SHARED NAV + FOOTER COMPONENT
   Injects navbar, full-page menu & footer
═══════════════════════════════════════════ */
(function(){

/* ── Determine active page ── */
const path = window.location.pathname.split('/').pop() || 'index.html';

function isActive(href){ return path === href ? ' active' : ''; }

/* ══════════════════════════════════════
   NAV ITEMS CONFIG
══════════════════════════════════════ */
const menuItems = [
  { href:'index.html',         label:'Home',           sub:'Back to Homepage',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 7.5L9 2l7 5.5V16H11v-4H7v4H2V7.5z" stroke="#00c16a" stroke-width="1.5" stroke-linejoin="round"/></svg>` },
  { href:'ai-development.html',label:'AI Development', sub:'Machine Learning & Gen AI',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.5" stroke="#00c16a" stroke-width="1.5"/><path d="M9 5v4l3 2" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="3" r="1" fill="#00c16a"/><circle cx="15" cy="9" r="1" fill="#00c16a"/><circle cx="3" cy="9" r="1" fill="#00c16a"/><circle cx="9" cy="15" r="1" fill="#00c16a"/></svg>` },
  { href:'services.html',      label:'Services',       sub:'What We Build & Deliver',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#00c16a" stroke-width="1.5"/><rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#00c16a" stroke-width="1.5"/><rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#00c16a" stroke-width="1.5"/><rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#00c16a" stroke-width="1.5"/></svg>` },
  { href:'technologies.html',  label:'Technologies',   sub:'99+ Stacks & Frameworks',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 6l-3 3 3 3M13 6l3 3-3 3M11 3l-4 12" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { href:'case-studies.html',  label:'Case Studies',   sub:'150+ Projects Delivered',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="#00c16a" stroke-width="1.5"/><path d="M6 8l2.5 2.5L12 7" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { href:'blog.html',          label:'Blogs',          sub:'Insights & Technical Articles',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="#00c16a" stroke-width="1.5"/><path d="M5 6h8M5 9h8M5 12h5" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { href:'careers.html',       label:'Careers',        sub:"Join Krapton's Team",
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="5" y="4" width="8" height="4" rx="1.5" stroke="#00c16a" stroke-width="1.5"/><rect x="2" y="8" width="14" height="8" rx="2" stroke="#00c16a" stroke-width="1.5"/></svg>` },
  { href:'hire-us.html#pricing',label:'Pricing',       sub:'Transparent Team Models',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v2M9 14v2M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M2 9h2M14 9h2M4.2 13.8l1.4-1.4M12.4 5.6l1.4-1.4" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="3" stroke="#00c16a" stroke-width="1.5"/></svg>` },
  { href:'hire-web-developer.html',label:'Get a Website', sub:'Web Apps & Landing Pages',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="11" rx="2" stroke="#00c16a" stroke-width="1.5"/><path d="M6 16h6M9 14v2" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round"/><path d="M5 8l2 2-2 2" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10h4" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { href:'hire-us.html',       label:'Hire Us',        sub:'Start Your Project Today',
    icon:`<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 14c0-3 2.7-5 6-5h2c3.3 0 6 2 6 5" stroke="#00c16a" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="6" r="3.5" stroke="#00c16a" stroke-width="1.5"/><path d="M13 8l1.5 1.5L16 8" stroke="#00c16a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    highlight: true },
];

/* ══════════════════════════════════════
   INJECT NAVBAR
══════════════════════════════════════ */
function buildNav(){
  const desktopLinks = ['services.html','ai-development.html','technologies.html','case-studies.html','blog.html','careers.html'];
  const linkHtml = desktopLinks.map(href=>{
    const item = menuItems.find(m=>m.href===href);
    if(!item) return '';
    return `<li><a href="${item.href}" class="nav-link${isActive(item.href)}">${item.label}</a></li>`;
  }).join('');

  return `
<header id="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="https://www.krapton.com/assets/custom_icons/krapton-logo.webp" alt="Krapton" width="34" height="34" style="height:34px;width:auto"/>
      <span class="nav-logo-text">Krapton</span>
    </a>
    <ul class="nav-links" style="display:flex;list-style:none;gap:28px">
      ${linkHtml}
    </ul>
    <div class="nav-actions">
      <a href="hire-us.html" class="btn-outline-sm">Get a Quote</a>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
        <div class="ham-line"></div>
        <div class="ham-line"></div>
        <div class="ham-line"></div>
      </button>
    </div>
  </div>
</header>`;
}

/* ══════════════════════════════════════
   INJECT FULL-PAGE MENU
══════════════════════════════════════ */
function buildMenu(){
  const itemsHtml = menuItems.map((item,i)=>`
    <li class="menu-nav-item" data-idx="${i}">
      <a href="${item.href}" class="menu-nav-link${isActive(item.href)}${item.highlight?' menu-nav-link-highlight':''}">
        <div class="menu-nav-icon">${item.icon}</div>
        <div class="menu-nav-label">
          <div style="font-size:1rem;font-weight:600;color:${item.highlight?'#00c16a':'inherit'};line-height:1.3">${item.label}</div>
          <div style="font-size:.75rem;color:#6b7280;font-weight:400;margin-top:1px">${item.sub}</div>
        </div>
        <svg class="menu-nav-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#9ca3af" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </li>`).join('');

  return `
<div id="menu-backdrop"></div>
<div id="fullmenu" role="dialog" aria-modal="true" aria-label="Navigation menu">
  <button class="menu-close-btn" id="menu-close" aria-label="Close menu">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="#9ca3af" stroke-width="1.6" stroke-linecap="round"/></svg>
  </button>
  <div class="menu-inner">
    <a href="index.html" class="menu-logo">
      <img src="https://www.krapton.com/assets/custom_icons/krapton-logo.webp" alt="Krapton" width="38" height="38" style="height:38px;width:auto"/>
      <span class="menu-logo-text">Krapton</span>
    </a>
    <nav class="menu-nav">
      <ul class="menu-nav-list">${itemsHtml}</ul>
    </nav>
    <div class="menu-cta-strip">
      <a href="hire-us.html" class="menu-cta-primary">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M8 2l5 5.5L8 13" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Get Free Consultation
      </a>
      <a href="hire-web-developer.html" class="menu-cta-outline">Get a Website</a>
    </div>
    <div class="menu-contact-strip">
      <div class="menu-contact-item">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h9v7H2V3z" stroke="#6b7280" stroke-width="1.2" stroke-linejoin="round"/><path d="M2 3l4.5 4L11 3" stroke="#6b7280" stroke-width="1.2" stroke-linecap="round"/></svg>
        <a href="mailto:info@krapton.com">info@krapton.com</a>
      </div>
      <div class="menu-contact-item">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5C2 3.5 2.5 2 4 2c.5 0 1 .5 1.5 1.5s.5 1.5.5 1.5L5 6c.5 1 1.5 2.5 2 3l1-.5c.5-.5 1.5-.5 2 .5s.5 1.5 0 2c-.5.5-1.5 1-2.5.5C5.5 10.5 2 6.5 2 3.5z" stroke="#6b7280" stroke-width="1.2" stroke-linejoin="round"/></svg>
        <a href="tel:+918448163667">+91-8448163667</a>
      </div>
    </div>
    <div class="menu-social">
      <a href="https://www.linkedin.com/company/krapton" target="_blank" class="menu-social-link" aria-label="LinkedIn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2 4.5h2v7H2V4.5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM5 4.5h2v1C7.4 5 8.1 4.5 9.2 4.5 11 4.5 12 5.7 12 7.8V11.5h-2V8.2C10 7 9.6 6.3 8.8 6.3S7 7 7 8.3v3.2H5V4.5z"/></svg>
      </a>
      <a href="https://twitter.com/krapton786" target="_blank" class="menu-social-link" aria-label="Twitter">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M10.5 2h2l-4 4.7L13 12h-3.7L6.7 8.7 3.7 12H1.7l4.3-5L1.5 2h3.8l2.4 3.2L10.5 2zm-.7 9h1L4.2 3H3L9.8 11z"/></svg>
      </a>
      <a href="https://github.com/krapton" target="_blank" class="menu-social-link" aria-label="GitHub">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path fill-rule="evenodd" d="M7 .5C3.4.5.5 3.4.5 7.1c0 3 1.9 5.5 4.6 6.4.3.1.4-.1.4-.3V12c-1.9.4-2.3-.8-2.3-.8-.3-.8-.8-1-1.1-1-.5-.4.1-.4.1-.4.7.1 1 .7 1 .7.6 1 1.6.7 2 .5 0-.4.2-.7.5-.9-1.6-.2-3.2-.8-3.2-3.5 0-.8.3-1.4.8-1.9-.1-.2-.4-.9.1-1.9 0 0 .6-.2 2 .7.6-.2 1.2-.2 1.7-.2.6 0 1.2.1 1.7.2 1.4-.9 2-.7 2-.7.4 1 .2 1.7.1 1.9.5.5.8 1.1.8 1.9 0 2.7-1.6 3.3-3.2 3.5.3.2.5.6.5 1.2v1.8c0 .2.1.4.4.3C11.6 12.6 13.5 10.1 13.5 7.1 13.5 3.4 10.6.5 7 .5z"/></svg>
      </a>
      <a href="https://www.instagram.com/krapton786/" target="_blank" class="menu-social-link" aria-label="Instagram">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="10.2" cy="3.8" r=".7" fill="currentColor"/></svg>
      </a>
    </div>
  </div>
</div>`;
}

/* ══════════════════════════════════════
   INJECT FOOTER
══════════════════════════════════════ */
function buildFooter(){
  return `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:4px">
          <img src="https://www.krapton.com/assets/custom_icons/krapton-logo.webp" alt="Krapton" width="32" height="32" style="height:32px;width:auto"/>
          <span class="footer-logo-text">Krapton</span>
        </a>
        <p class="footer-desc">Top-rated IT services &amp; software development company in New Delhi, India. Trusted by startups &amp; enterprises in the US, UK, UAE &amp; India since 2019.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/company/krapton" target="_blank" class="footer-social-btn" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2 4.5h2v7H2V4.5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM5 4.5h2v1C7.4 5 8.1 4.5 9.2 4.5 11 4.5 12 5.7 12 7.8V11.5h-2V8.2C10 7 9.6 6.3 8.8 6.3S7 7 7 8.3v3.2H5V4.5z"/></svg></a>
          <a href="https://twitter.com/krapton786" target="_blank" class="footer-social-btn" aria-label="Twitter"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M10.5 2h2l-4 4.7L13 12h-3.7L6.7 8.7 3.7 12H1.7l4.3-5L1.5 2h3.8l2.4 3.2L10.5 2zm-.7 9h1L4.2 3H3L9.8 11z"/></svg></a>
          <a href="https://github.com/krapton" target="_blank" class="footer-social-btn" aria-label="GitHub"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path fill-rule="evenodd" d="M7 .5C3.4.5.5 3.4.5 7.1c0 3 1.9 5.5 4.6 6.4.3.1.4-.1.4-.3V12c-1.9.4-2.3-.8-2.3-.8-.3-.8-.8-1-1.1-1-.5-.4.1-.4.1-.4.7.1 1 .7 1 .7.6 1 1.6.7 2 .5 0-.4.2-.7.5-.9-1.6-.2-3.2-.8-3.2-3.5 0-.8.3-1.4.8-1.9-.1-.2-.4-.9.1-1.9 0 0 .6-.2 2 .7.6-.2 1.2-.2 1.7-.2.6 0 1.2.1 1.7.2 1.4-.9 2-.7 2-.7.4 1 .2 1.7.1 1.9.5.5.8 1.1.8 1.9 0 2.7-1.6 3.3-3.2 3.5.3.2.5.6.5 1.2v1.8c0 .2.1.4.4.3C11.6 12.6 13.5 10.1 13.5 7.1 13.5 3.4 10.6.5 7 .5z"/></svg></a>
          <a href="https://www.instagram.com/krapton786/" target="_blank" class="footer-social-btn" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="10.2" cy="3.8" r=".7" fill="currentColor"/></svg></a>
        </div>
        <div style="margin-top:16px;font-size:.78rem;color:#374151;font-family:'Plus Jakarta Sans',sans-serif;display:flex;flex-direction:column;gap:5px">
          <span>📞 <a href="tel:+918448163667" style="color:#6b7280;text-decoration:none">+91-8448163667</a></span>
          <span>✉️ <a href="mailto:info@krapton.com" style="color:#6b7280;text-decoration:none">info@krapton.com</a></span>
          <span style="color:#4b5563">📍 New Delhi, India</span>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Services</div>
        <div class="footer-links">
          <a href="ai-development.html" class="footer-link">AI Development</a>
          <a href="services.html" class="footer-link">Web Development</a>
          <a href="services.html" class="footer-link">App Development</a>
          <a href="services.html" class="footer-link">DevOps &amp; Cloud</a>
          <a href="services.html" class="footer-link">UI/UX Design</a>
          <a href="services.html" class="footer-link">Blockchain</a>
          <a href="services.html" class="footer-link">QA &amp; Testing</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Hire Developers</div>
        <div class="footer-links">
          <a href="hire-react-developer.html" class="footer-link">Hire React Developers</a>
          <a href="hire-web-developer.html" class="footer-link">Hire Web Developers</a>
          <a href="hire-us.html" class="footer-link">Hire Node.js Dev</a>
          <a href="hire-us.html" class="footer-link">Hire Python Dev</a>
          <a href="hire-us.html" class="footer-link">Hire Flutter Dev</a>
          <a href="hire-us.html" class="footer-link">Hire Full Stack Dev</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Company</div>
        <div class="footer-links">
          <a href="case-studies.html" class="footer-link">Case Studies</a>
          <a href="blog.html" class="footer-link">Blog</a>
          <a href="careers.html" class="footer-link">Careers</a>
          <a href="technologies.html" class="footer-link">Technologies</a>
          <a href="hire-us.html" class="footer-link">Contact Us</a>
          <a href="hire-us.html#pricing" class="footer-link">Pricing</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2025 Krapton Technologies Private Limited. All rights reserved. New Delhi, India.</p>
      <div class="footer-legal">
        <a href="#" class="footer-link" style="font-size:.77rem">Privacy Policy</a>
        <a href="#" class="footer-link" style="font-size:.77rem">Terms of Service</a>
        <a href="https://www.krapton.com/sitemap.xml" class="footer-link" style="font-size:.77rem">Sitemap</a>
      </div>
    </div>
  </div>
</footer>`;
}

/* ══════════════════════════════════════
   INJECT INTO PAGE
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function(){
  // // Inject nav before first element in body
  // const navEl = document.createElement('div');
  // navEl.innerHTML = buildNav() + buildMenu();
  // document.body.insertBefore(navEl.firstElementChild, document.body.firstChild);
  // // menu backdrop + fullmenu after nav
  // const menuDiv = document.createElement('div');
  // menuDiv.innerHTML = buildMenu();
  // document.body.insertBefore(menuDiv.firstElementChild, document.body.childNodes[1]);
  // document.body.insertBefore(menuDiv.firstElementChild, document.body.childNodes[2]);

  // // Inject footer
  const footerEl = document.createElement('div');
  footerEl.innerHTML = buildFooter();
  document.body.appendChild(footerEl.firstElementChild);

  initNav();
});

/* ══════════════════════════════════════
   NAV LOGIC
══════════════════════════════════════ */
function initNav(){
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('nav-hamburger');
  const fullmenu = document.getElementById('fullmenu');
  const backdrop = document.getElementById('menu-backdrop');
  const closeBtn = document.getElementById('menu-close');
  const menuItems = document.querySelectorAll('.menu-nav-item');
  let menuOpen = false;

  // Scroll effect
  window.addEventListener('scroll', function(){
    nav && (window.scrollY > 50 ? nav.classList.add('sc') : nav.classList.remove('sc'));
  }, {passive:true});

  // Open menu
  function openMenu(){
    menuOpen = true;
    fullmenu.classList.add('open');
    backdrop.classList.add('open');
    hamburger.classList.add('active');
    document.body.classList.add('menu-open');
    // Stagger items
    menuItems.forEach(function(item, i){
      setTimeout(function(){ item.classList.add('visible'); }, 80 + i * 45);
    });
  }

  // Close menu
  function closeMenu(){
    menuOpen = false;
    fullmenu.classList.remove('open');
    backdrop.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuItems.forEach(function(item){ item.classList.remove('visible'); });
  }

  hamburger && hamburger.addEventListener('click', function(){ menuOpen ? closeMenu() : openMenu(); });
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  backdrop && backdrop.addEventListener('click', closeMenu);

  // Close on ESC
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && menuOpen) closeMenu(); });

  // Cursor
  const cdot = document.getElementById('cdot');
  const cring = document.getElementById('cring');
  if(cdot && cring){
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove', function(e){
      mx=e.clientX; my=e.clientY;
      cdot.style.left=mx-3.5+'px'; cdot.style.top=my-3.5+'px';
    });
    (function animR(){
      rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
      cring.style.left=rx-17+'px'; cring.style.top=ry-17+'px';
      requestAnimationFrame(animR);
    })();
    document.querySelectorAll('a,button').forEach(function(el){
      el.addEventListener('mouseenter',function(){ cring.style.width='50px'; cring.style.height='50px'; cring.style.borderColor='rgba(0,193,106,.7)'; });
      el.addEventListener('mouseleave',function(){ cring.style.width='34px'; cring.style.height='34px'; cring.style.borderColor='rgba(0,193,106,.4)'; });
    });
  }

  // Scroll reveal
  const rvEls = document.querySelectorAll('.rv');
  const rvObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('vs'); rvObs.unobserve(e.target); } });
  }, {threshold:.08, rootMargin:'0px 0px -30px 0px'});
  rvEls.forEach(function(el){ rvObs.observe(el); });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){ e.preventDefault(); closeMenu(); setTimeout(function(){ target.scrollIntoView({behavior:'smooth', block:'start'}); }, 100); }
    });
  });
}

})();
