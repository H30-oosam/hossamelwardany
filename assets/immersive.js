(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 700px)').matches;
  const canvas = document.querySelector('#executiveScene');
  if (!canvas) return;

  const fallback = () => {
    canvas.classList.add('scene-fallback');
  };

  async function initThree() {
    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
      const renderer = new THREE.WebGLRenderer({canvas, antialias: !mobile, alpha:true, powerPreference:'high-performance'});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0b1f3a, 0.038);
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0,0,13);

      const group = new THREE.Group();
      group.position.set(mobile ? 1.8 : 3.25, 0.15, 0);
      scene.add(group);

      const gold = new THREE.MeshPhysicalMaterial({color:0xc9a227,metalness:.78,roughness:.22,clearcoat:.7,clearcoatRoughness:.18});
      const glass = new THREE.MeshPhysicalMaterial({color:0x75a8ca,metalness:.12,roughness:.12,transmission:.38,transparent:true,opacity:.34,thickness:1.2,ior:1.35});

      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.45,.035,12,180),gold); ring1.rotation.set(.9,.18,.2); group.add(ring1);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.72,.022,12,180),glass); ring2.rotation.set(.45,-.55,.35); group.add(ring2);
      const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(.72,3),glass); sphere.position.set(.2,.05,.18); group.add(sphere);

      const nodeGeo = new THREE.SphereGeometry(.055,12,12); const nodes=[];
      for(let i=0;i<(mobile?18:34);i++){
        const node=new THREE.Mesh(nodeGeo,i%5===0?gold:glass);
        const a=i*2.399,r=.9+(i%7)*.38;
        node.position.set(Math.cos(a)*r,Math.sin(a)*r,(i%6-.5)*.48);
        nodes.push(node);group.add(node);
      }
      const lineMat=new THREE.LineBasicMaterial({color:0xc9a227,transparent:true,opacity:.28});
      for(let i=0;i<nodes.length-1;i+=2){const geo=new THREE.BufferGeometry().setFromPoints([nodes[i].position,nodes[i+1].position]);group.add(new THREE.Line(geo,lineMat));}

      const particleCount=mobile?75:180;
      const positions=new Float32Array(particleCount*3);
      for(let i=0;i<particleCount;i++){positions[i*3]=(Math.random()-0.5)*24;positions[i*3+1]=(Math.random()-0.5)*12;positions[i*3+2]=(Math.random()-0.5)*10}
      const pGeo=new THREE.BufferGeometry();pGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
      const pMat=new THREE.PointsMaterial({color:0xc9a227,size:mobile?.018:.025,transparent:true,opacity:.48,sizeAttenuation:true});
      const particles=new THREE.Points(pGeo,pMat);scene.add(particles);

      scene.add(new THREE.AmbientLight(0xadc8df,1.2));
      const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(-4,6,8);scene.add(key);
      const rim=new THREE.DirectionalLight(0x79a6d5,2.1);rim.position.set(5,-2,4);scene.add(rim);

      const pointer={x:0,y:0};
      window.addEventListener('pointermove',e=>{pointer.x=(e.clientX/window.innerWidth-.5);pointer.y=(e.clientY/window.innerHeight-.5)},{passive:true});
      let visible=true;
      if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{rootMargin:'200px'}).observe(canvas)}

      function resize(){const r=canvas.parentElement.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()}
      resize();window.addEventListener('resize',resize,{passive:true});

      const clock=new THREE.Clock();
      function render(){requestAnimationFrame(render);if(!visible||document.hidden)return;
        const t=clock.elapsedTime;
        if(!reduced){ring1.rotation.z=t*.035;ring2.rotation.z=-t*.025;sphere.rotation.y=t*.06;particles.rotation.y=t*.006;group.position.y=.15+Math.sin(t*.38)*.12}
        camera.position.x+=(pointer.x*.22-camera.position.x)*.025;camera.position.y+=(-pointer.y*.12-camera.position.y)*.025;
        camera.lookAt(group.position.x*.12,0,0);renderer.render(scene,camera);
      }render();
    } catch (e) { console.info('3D fallback enabled'); fallback(); }
  }

  initThree();

  const cards=document.querySelectorAll('.service-card,.case-card,.article-card,.profile-card');
  if(!reduced&&!mobile){cards.forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*3.5}deg) rotateY(${x*3.5}deg) translateY(-5px)`});card.addEventListener('pointerleave',()=>{card.style.transform=''})})}

  const header=document.querySelector('.site-header');
  const setHeader=()=>header?.classList.toggle('scrolled',window.scrollY>28);
  setHeader();window.addEventListener('scroll',setHeader,{passive:true});

  if(!reduced){
    document.querySelectorAll('.section,.practice-overview,.page-hero,.quote-section,.final-cta').forEach(section=>{
      section.classList.add('cinematic-reveal');
    });
    const revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('cinematic-visible');revealObserver.unobserve(entry.target)}});
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.cinematic-reveal').forEach(section=>revealObserver.observe(section));

    const profile=document.querySelector('.profile-frame');
    if(profile){
      profile.addEventListener('pointermove',e=>{const r=profile.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;profile.style.transform=`perspective(1100px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateZ(12px)`});
      profile.addEventListener('pointerleave',()=>profile.style.transform='');
    }
  }
})();