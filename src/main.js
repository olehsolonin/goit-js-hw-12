import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPhotosByQuery } from "./js/pixabay-api.js";
import { createGalleryItemMarkup } from "./js/render-functions.js";

const galleryEl = document.querySelector(".gallery-box-js");
const searchFormEl = document.querySelector(".search-form-js");
const loaderEl = document.querySelector(".loader-js");

let lightbox;
const initializeOrUpdateLightbox = () => {
	if (lightbox) {
		lightbox.refresh();
	} else {
		lightbox = new SimpleLightbox('.box-link', {
			captions: true,
			captionsData: 'alt',
			captionDelay: 250,
		});
	}
};

function onSearchFormSubmit(event) {
	event.preventDefault();
	const searchQuery = event.target.elements.search.value.trim();

	if (searchQuery === '') {
		galleryEl.innerHTML = '';
		event.target.reset();
		iziToast.show({
			message: 'Input field can not be empty',
			position: 'topRight',
			timeout: 2000,
			color: 'red',
		});

		return;
	}
	galleryEl.innerHTML = '';
	loaderEl.classList.remove("is-hidden");

	fetchPhotosByQuery(searchQuery)
		.then(imagesData => {
			if (imagesData.total === 0) {
				iziToast.show({
					message: 'Sorry, there are no images for this query',
					position: 'topRight',
					timeout: 2000,
					color: 'red',
				});
			}
			return imagesData;
		})
		.then((imageData) => {
			const markup = createGalleryItemMarkup(imageData.hits.slice(0, 9));
			galleryEl.insertAdjacentHTML("afterbegin", markup);
			initializeOrUpdateLightbox();

		})

		.catch(error => console.log(error))
		.finally(() => {
			event.target.reset();
			loaderEl.classList.add("is-hidden");
		});
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);





