import{a as v,i as p,S as w}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();const S="https://pixabay.com/api/",x="44014136-e2da13f55dbc3b2e82126e922",g=async(s,t)=>{const r=new URLSearchParams({key:x,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}),a=await v.get(`${S}?${r}`);if(a.status!==200)throw new Error(a.statusText);return a.data},f=s=>s.map(({largeImageURL:t,id:r,webformatURL:a,tags:e,likes:i,views:o,comments:L,downloads:b})=>`<li class="box-item">
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
							  <p class="image-data">${o}</p>
						 </div>
						 <div class="characteristic-item">
							  <h3 class="image-title">Comments</h3>
							  <p class="image-data">${L}</p>
						 </div>
						 <div class="characteristic-item">
							  <h3 class="image-title">Downloads</h3>
							  <p class="image-data">${b}</p>
						 </div>
					</div>
			  </li>`).join(""),n=document.querySelector(".gallery-box-js"),E=document.querySelector(".search-form-js"),h=document.querySelector(".loader-js"),m=document.querySelector(".load-more");let l="",c=1,u,d=0;const y=()=>{u?u.refresh():u=new w(".box-link",{captions:!0,captionsData:"alt",captionDelay:250})},$=async s=>{if(s.preventDefault(),l=s.target.elements.search.value.trim(),c=1,l===""){n.innerHTML="",s.target.reset(),p.show({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}n.innerHTML="",h.classList.add("is-hidden"),m.classList.add("is-hidden");try{const t=await g(l,c);if(d=t.totalHits,d===0){p.show({message:"Sorry, there are no images for this query",position:"topRight",timeout:2e3,color:"red"});return}const r=f(t.hits);n.insertAdjacentHTML("afterbegin",r),y(),d>15&&m.classList.remove("is-hidden")}catch(t){console.log(t)}finally{s.target.reset(),h.classList.add("is-hidden")}},q=async()=>{c+=1,h.classList.remove("is-hidden");try{const s=await g(l,c),t=f(s.hits);n.insertAdjacentHTML("beforeend",t),y();const r=document.querySelector(".gallery-box").firstElementChild.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),c*15>=d&&(m.classList.add("is-hidden"),p.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"}))}catch(s){console.log(s)}finally{h.classList.add("is-hidden")}};E.addEventListener("submit",$);m.addEventListener("click",q);
//# sourceMappingURL=commonHelpers.js.map
