import{a as w,i as n,S}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const x="https://pixabay.com/api/",E="44014136-e2da13f55dbc3b2e82126e922",f=async(s,t)=>{const r=new URLSearchParams({key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}),o=await w.get(`${x}?${r}`);if(o.status!==200)throw new Error(o.statusText);return o.data},y=s=>s.map(({largeImageURL:t,id:r,webformatURL:o,tags:e,likes:i,views:a,comments:b,downloads:v})=>`<li class="box-item">
					<a class="box-link" href="${t}">
						 <img
							  id="${r}"
							  class="box-image"
							  src="${o}"
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
							  <p class="image-data">${a}</p>
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
			  </li>`).join(""),l=document.querySelector(".gallery-box-js"),$=document.querySelector(".search-form-js"),m=document.querySelector(".loader-js"),u=document.querySelector(".load-more");let d="",p=1,g,h=0,c=0;const L=()=>{g?g.refresh():g=new S(".box-link",{captions:!0,captionsData:"alt",captionDelay:250})},q=async s=>{if(s.preventDefault(),d=s.target.elements.search.value.trim(),p=1,c=0,d===""){l.innerHTML="",s.target.reset(),n.show({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}l.innerHTML="",m.classList.remove("is-hidden"),u.classList.add("is-hidden");try{const t=await f(d,p);if(h=t.totalHits,c+=t.hits.length,h===0){n.show({message:"Sorry, there are no images for this query",position:"topRight",timeout:2e3,color:"red"});return}const r=y(t.hits);l.insertAdjacentHTML("afterbegin",r),L(),c<h?u.classList.remove("is-hidden"):n.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"})}catch(t){console.log(t)}finally{s.target.reset(),m.classList.add("is-hidden")}},H=async()=>{p+=1,m.classList.remove("is-hidden");try{const s=await f(d,p);c+=s.hits.length;const t=y(s.hits);l.insertAdjacentHTML("beforeend",t),L();const r=document.querySelector(".gallery-box").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),c>=h&&(u.classList.add("is-hidden"),n.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"}))}catch(s){console.log(s)}finally{m.classList.add("is-hidden")}};$.addEventListener("submit",q);u.addEventListener("click",H);
//# sourceMappingURL=commonHelpers.js.map
