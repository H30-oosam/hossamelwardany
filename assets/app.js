(function(){'use strict';const SETTINGS_KEY='he_settings_v2', PASSWORD_KEY='he_admin_password_v2', SESSION_KEY='he_settings_session_v2';
const defaults={
 nameAr:'المستشار حسام الورداني',nameEn:'Hossam Elwardany',title:'HR Consultant | Legal Consultant | Internationally Certified Trainer',
 phone:'01200716861',email:'hossamelwardany132@gmail.com',whatsapp:'201200716861',address:'مصر',
 bio:'محامٍ ومستشار قانوني، ومستشار موارد بشرية ومدرب دولي معتمد، أساعد المؤسسات والأفراد على بناء أنظمة عمل أكثر تنظيمًا وكفاءة.',about:'أنا المستشار حسام الورداني، محامٍ ومستشار قانوني، ومستشار موارد بشرية ومدرب دولي معتمد، أعمل على الجمع بين المعرفة القانونية والخبرة العملية في إدارة وتطوير الموارد البشرية لبناء أنظمة أكثر تنظيمًا وكفاءة داخل المؤسسات. بدأت مسيرتي المهنية عام 2017، وأركز على تنظيم الموارد البشرية، توظيف التكنولوجيا والذكاء الاصطناعي، وتحسين الأداء والسياسات والإجراءات والعلاقات العمالية.',
 linkedin:'',facebook:'',instagram:'',profileImage:'',coverImage:'',
 services:[
  {title:'استشارات الموارد البشرية',description:'تطوير أنظمة الموارد البشرية بما يتناسب مع طبيعة المؤسسة واحتياجاتها.'},
  {title:'الاستشارات القانونية',description:'قراءة عملية للمسائل المرتبطة بعلاقات العمل وفق القواعد السارية ووقائع كل حالة.'},
  {title:'التدريب والتطوير',description:'برامج عملية في الموارد البشرية والإدارة والقيادة والمهارات المهنية والذكاء الاصطناعي.'},
  {title:'تطوير أنظمة الموارد البشرية',description:'بناء الأنظمة والسياسات والإجراءات والأدوات والعمليات المؤسسية.'},
  {title:'التوظيف واختيار الكفاءات',description:'تحليل الاحتياج الوظيفي والاختيار والمقابلات والإلحاق بالعمل.'},
  {title:'تقييم الأداء وKPIs',description:'تصميم مؤشرات الأداء وخطط التقييم والتحسين.'},
  {title:'سياسات وإجراءات العمل',description:'إعداد وتنظيم لوائح وسياسات وإجراءات واضحة ومتوازنة.'},
  {title:'التحول الرقمي في HR',description:'تحسين وتبسيط عمليات الموارد البشرية باستخدام الأدوات الرقمية.'},
  {title:'الذكاء الاصطناعي في الموارد البشرية',description:'تطبيقات عملية لتحسين القرار والتحليل والتقارير والأتمتة.'}
 ],
 projects:[{name:'إعادة الهيكلة التنظيمية',description:'تصميم هيكل ووصف وظيفي وخطوط تبعية.',services:'Organization Design & HR Systems',result:'',image:'',link:''},{name:'تطوير نظام تقييم الأداء',description:'تصميم مؤشرات أداء وربطها بالتقييم.',services:'Performance Management',result:'',image:'',link:''}],
 books:[{title:'',description:'',image:'',link:'',buyLink:''}],
 certificates:[{title:'',issuer:'',year:'',image:''}],
 articles:[{title:'كيف تبني نظام موارد بشرية أكثر كفاءة داخل المؤسسة؟',image:'',content:'مقال تطبيقي يشرح أساس بناء نظام موارد بشرية واضح وقابل للتنفيذ.',date:'',category:'الموارد البشرية',published:true}]
};
let settings;
try{settings={...defaults,...JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}')};}catch(e){settings={...defaults};}
window.HossamSite={defaults,settings,PASSWORD_KEY,SESSION_KEY,SETTINGS_KEY};
function esc(s){return String(s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function telHref(){return 'tel:+20'+settings.phone.replace(/^0/,'')}
function waHref(){return 'https://wa.me/'+(settings.whatsapp||('20'+settings.phone.replace(/^0/,''))) }
window.HossamSite.esc=esc;
function applyText(){
 document.querySelectorAll('[data-setting=name-ar]').forEach(e=>e.textContent=settings.nameAr||defaults.nameAr);
 document.querySelectorAll('[data-setting=name-en]').forEach(e=>e.textContent=settings.nameEn||defaults.nameEn);
 document.querySelectorAll('[data-setting=title]').forEach(e=>e.textContent=settings.title||defaults.title);
 document.querySelectorAll('[data-setting=phone]').forEach(e=>e.textContent=settings.phone||defaults.phone);
 document.querySelectorAll('[data-setting=email]').forEach(e=>e.textContent=settings.email||defaults.email);
 document.querySelectorAll('[data-setting=bio]').forEach(e=>e.textContent=settings.bio||defaults.bio);
 document.querySelectorAll('[data-setting=about]').forEach(e=>e.textContent=settings.about||defaults.about);
 document.querySelectorAll('[data-setting=address]').forEach(e=>e.textContent=settings.address||defaults.address);
 document.querySelectorAll('[data-contact=phone]').forEach(e=>e.href=telHref());
 document.querySelectorAll('[data-contact=email]').forEach(e=>e.href='mailto:'+encodeURIComponent(settings.email||defaults.email));
 document.querySelectorAll('[data-contact=whatsapp]').forEach(e=>e.href=waHref());
 document.querySelectorAll('[data-contact=linkedin]').forEach(e=>{e.hidden=!settings.linkedin;e.href=settings.linkedin||'#'});
 document.querySelectorAll('[data-contact=facebook]').forEach(e=>{e.hidden=!settings.facebook;e.href=settings.facebook||'#'});
 document.querySelectorAll('[data-contact=instagram]').forEach(e=>{e.hidden=!settings.instagram;e.href=settings.instagram||'#'});
 document.querySelectorAll('[data-profile-image]').forEach(e=>{if(settings.profileImage)e.src=settings.profileImage});
 document.querySelectorAll('[data-cover-image]').forEach(e=>{if(settings.coverImage)e.src=settings.coverImage});
}
function addSettingsButton(){
 document.querySelectorAll('.nav').forEach(nav=>{if(nav.querySelector('[data-settings-link]'))return;const a=document.createElement('a');a.href='settings.html';a.dataset.settingsLink='';a.className='settings-link';a.textContent='⚙ الإعدادات';nav.appendChild(a)});
}
function renderServices(){
 document.querySelectorAll('[data-services-grid]').forEach(grid=>{grid.innerHTML=(settings.services||[]).map((s,i)=>`<article class="service-card ${i<2?'featured':''}"><span class="service-no">${String(i+1).padStart(2,'0')}</span><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></article>`).join('')});
}
function renderProjects(){
 document.querySelectorAll('[data-projects-grid]').forEach(grid=>{grid.innerHTML=(settings.projects||[]).filter(p=>p.name).map(p=>`<article class="case-card">${p.image?`<img class="case-image" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`:''}<h3>${esc(p.name)}</h3><div class="case-row"><b>الوصف</b><span>${esc(p.description)}</span></div><div class="case-row"><b>الخدمات</b><span>${esc(p.services)}</span></div>${p.result?`<div class="case-row"><b>النتائج</b><span>${esc(p.result)}</span></div>`:''}${p.link?`<a class="text-link" href="${esc(p.link)}" target="_blank" rel="noopener">عرض المشروع ↗</a>`:''}</article>`).join('')});
}
function renderBooks(){document.querySelectorAll('[data-books-grid]').forEach(grid=>{grid.innerHTML=(settings.books||[]).filter(b=>b.title).map(b=>`<article class="article-card">${b.image?`<img class="article-image" src="${esc(b.image)}" alt="${esc(b.title)}" loading="lazy">`:''}<div class="article-body"><h3>${esc(b.title)}</h3><p>${esc(b.description)}</p><div>${b.link?`<a class="text-link" href="${esc(b.link)}" target="_blank" rel="noopener">عرض الكتاب ↗</a>`:''}${b.buyLink?` <a class="text-link" href="${esc(b.buyLink)}" target="_blank" rel="noopener">رابط الشراء ↗</a>`:''}</div></div></article>`).join('')})}
function renderCertificates(){document.querySelectorAll('[data-certificates-grid]').forEach(grid=>{grid.innerHTML=(settings.certificates||[]).filter(c=>c.title).map(c=>`<article class="case-card">${c.image?`<img class="case-image" src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy">`:''}<h3>${esc(c.title)}</h3><p>${esc(c.issuer)} ${c.year?'— '+esc(c.year):''}</p></article>`).join('')})}
function renderArticles(){document.querySelectorAll('[data-articles-grid]').forEach(grid=>{grid.innerHTML=(settings.articles||[]).filter(a=>a.published&&a.title).map(a=>`<article class="article-card">${a.image?`<img class="article-image" src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy">`:''}<div class="article-body"><span class="category">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.content).slice(0,180)}</p><div class="article-meta"><span>${esc(a.date)}</span></div></div></article>`).join('')})}
function setupContact(){
 document.querySelectorAll('form[data-demo],form[data-contact-form]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const subject='رسالة من موقع المستشار حسام الورداني';const body=`الاسم: ${fd.get('name')}\nالهاتف: ${fd.get('phone')}\nالبريد: ${fd.get('email')||''}\nالرسالة:\n${fd.get('message')}`;let status=form.querySelector('[data-form-status]');if(!status){status=document.createElement('p');status.dataset.formStatus='';form.appendChild(status)}status.textContent='تم استلام رسالتك بنجاح وسأتواصل معك في أقرب وقت.';status.className='notice success';let mail=form.querySelector('[data-mail-link]');if(!mail){mail=document.createElement('a');mail.className='text-link';mail.dataset.mailLink='';status.after(mail)}mail.href='mailto:'+encodeURIComponent(settings.email||defaults.email)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);mail.textContent='إرسال نسخة من الرسالة بالبريد';form.reset()})})
}
function setupMobileMenu(){const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}}
window.HossamSite.saveSettings=function(v){settings={...settings,...v};localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));window.HossamSite.settings=settings;return settings};
document.addEventListener('DOMContentLoaded',()=>{setupMobileMenu();addSettingsButton();applyText();renderServices();renderProjects();renderBooks();renderCertificates();renderArticles();setupContact();});
})();
// Centralized public-page enhancements