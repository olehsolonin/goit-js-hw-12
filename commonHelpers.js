import{a as w,i as l,S}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const x="https://pixabay.com/api/",E="44014136-e2da13f55dbc3b2e82126e922",f=async(s,t)=>{const r=new URLSearchParams({key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}),a=await w.get(`${x}?${r}`);if(a.status!==200)throw new Error(a.statusText);return a.data},y=s=>s.map(({largeImageURL:t,id:r,webformatURL:a,tags:e,likes:i,views:c,comments:b,downloads:v})=>`<li class="box-item">
					<a class="box-link" href="${t}">
						 <img
							  id="${r}"
							  class="box-image"
							  src="${a}"
							  alt="${e}"
							  width="100%"
							  height="152"
						 />
					</a>
					<div class="image-characteristics">
						 <div class="characteristic-item">
							  <h3 class="image-title">Likes</h3>
							  <p class="image-data">${i}</p>
						 </div>
						 <div class="characteristic-item">
							  <h3 class="image-title">Views</h3>
							  <p class="image-data">${c}</p>
						 </div>
						 <div class="characteristic-item">
							  <h3 class="image-title">Comments</h3>
							  <p class="image-data">${b}</p>
						 </div>
						 <div class="characteristic-item">
							  <h3 class="image-title">Downloads</h3>
							  <p class="image-data">${v}</p>
						 </div>
					</div>
			  </li>`).join(""),d=document.querySelector(".gallery-box-js"),$=document.querySelector(".search-form-js"),o=document.querySelector(".loader"),u=document.querySelector(".load-more");let h="",p=1,g,m=0,n=0;const L=()=>{g?g.refresh():g=new S(".box-link",{captions:!0,captionsData:"alt",captionDelay:250})},q=async s=>{if(s.preventDefault(),h=s.target.elements.search.value.trim(),p=1,n=0,d.innerHTML="",o.classList.remove("is-hidden"),h===""){d.innerHTML="",s.target.reset(),o.classList.add("is-hidden"),l.show({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}u.classList.add("is-hidden");try{const t=await f(h,p);if(o.classList.add("is-hidden"),m=t.totalHits,n+=t.hits.length,m===0){l.show({message:"Sorry, there are no images for this query",position:"topRight",timeout:2e3,color:"red"});return}const r=y(t.hits);d.insertAdjacentHTML("afterbegin",r),L(),n<m?u.classList.remove("is-hidden"):l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"})}catch(t){console.log(t)}finally{o.classList.add("is-hidden"),s.target.reset()}},H=async()=>{p+=1,o.classList.remove("is-hidden");try{const s=await f(h,p);o.classList.add("is-hidden"),n+=s.hits.length;const t=y(s.hits);d.insertAdjacentHTML("beforeend",t),L();const r=document.querySelector(".gallery-box").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),n>=m&&(u.classList.add("is-hidden"),l.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"}))}catch(s){console.log(s)}finally{o.classList.add("is-hidden")}};$.addEventListener("submit",q);u.addEventListener("click",H);
//# sourceMappingURL=commonHelpers.js.map
