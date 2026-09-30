document.addEventListener("DOMContentLoaded",()=> {
  const root=document.documentElement;

  // Existing nav/filter behavior.
  const btn=document.querySelector(".nav-toggle");
  const links=document.querySelector(".links");
  if(btn&&links) btn.addEventListener("click",()=>links.classList.toggle("open"));

  document.querySelectorAll(".filter").forEach(f=>{
    f.addEventListener("click",()=>{
      document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
      f.classList.add("active");
      const cat=f.dataset.filter;
      document.querySelectorAll(".project").forEach(p=>{
        p.classList.toggle("hide",cat!=="all" && !(p.dataset.cat||"").split(" ").includes(cat));
      });
    });
  });

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce) return;

  // Pointer-reactive hue + parallax field.
  let raf=0;
  window.addEventListener("pointermove",(e)=>{
    if(raf) cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{
      const nx=(e.clientX/window.innerWidth)-.5;
      const ny=(e.clientY/window.innerHeight)-.5;
      root.style.setProperty("--mp-x", (e.clientX/window.innerWidth*100).toFixed(2)+"%");
      root.style.setProperty("--mp-y", (e.clientY/window.innerHeight*100).toFixed(2)+"%");
      root.style.setProperty("--mp-hue", Math.round((nx+.5)*80-40)+"deg");
      root.style.setProperty("--home-x", (nx*18).toFixed(2)+"px");
      root.style.setProperty("--home-y", (ny*14).toFixed(2)+"px");
      root.style.setProperty("--home-logo-x", (nx*-10).toFixed(2)+"px");
      root.style.setProperty("--home-logo-y", (ny*-8).toFixed(2)+"px");
    });
  },{passive:true});

  // Designely-inspired magnetic micro-interaction, translated into MonteParlo.
  document.querySelectorAll(".btn,.filter").forEach(el=>{
    el.classList.add("magnetic");
    el.addEventListener("pointermove",(e)=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-(r.left+r.width/2))/r.width;
      const y=(e.clientY-(r.top+r.height/2))/r.height;
      el.style.setProperty("--mag-x",(x*12).toFixed(2)+"px");
      el.style.setProperty("--mag-y",(y*9).toFixed(2)+"px");
    });
    el.addEventListener("pointerleave",()=>{
      el.style.setProperty("--mag-x","0px");
      el.style.setProperty("--mag-y","0px");
    });
  });

  // Gentle 3D project-card tilt.
  document.querySelectorAll(".project,.tilt-card").forEach(card=>{
    card.addEventListener("pointermove",(e)=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty("--ry",(x*6).toFixed(2)+"deg");
      card.style.setProperty("--rx",(y*-5).toFixed(2)+"deg");
      card.style.setProperty("--shine-x",((x+.5)*100).toFixed(0)+"%");
      card.style.setProperty("--shine-y",((y+.5)*100).toFixed(0)+"%");
    });
    card.addEventListener("pointerleave",()=>{
      card.style.setProperty("--ry","0deg");
      card.style.setProperty("--rx","0deg");
    });
  });

  // Scroll reveal keeps dense archive pages from feeling static.
  const reveal=[...document.querySelectorAll(".project,.tl,.mini,.feature,.book-object")];
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("in-view")});
  },{threshold:.08});
  reveal.forEach(el=>{el.classList.add("reveal");io.observe(el)});
});