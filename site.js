
document.addEventListener("DOMContentLoaded",()=>{
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
    })
  })
})
