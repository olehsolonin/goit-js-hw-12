import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhotosByQuery } from "./js/pixabay-api.js";
import { createGalleryItemMarkup } from "./js/render-functions.js";

const galleryEl = document.querySelector(".gallery-box-js");
const searchFormEl = document.querySelector(".search-form-js");
const loaderEl = document.querySelector(".loader");
const loadMoreBtnEl = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let lightbox;
let totalHits = 0;
let loadedHits = 0;

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

const onSearchFormSubmit = async (event) => {
	event.preventDefault();
	searchQuery = event.target.elements.search.value.trim();
	page = 1;
	loadedHits = 0;

	galleryEl.innerHTML = '';
	loaderEl.classList.remove("is-hidden");

	if (searchQuery === '') {
		galleryEl.innerHTML = '';
		event.target.reset();
		loaderEl.classList.add("is-hidden");
		iziToast.show({
			message: 'Input field can not be empty',
			position: 'topRight',
			timeout: 2000,
			color: 'red',
		});
		return;
	}

	// galleryEl.innerHTML = '';
	loadMoreBtnEl.classList.add("is-hidden");
	// loaderEl.classList.remove("is-hidden");

	try {
		const imagesData = await fetchPhotosByQuery(searchQuery, page);
		loaderEl.classList.add("is-hidden");
		totalHits = imagesData.totalHits;
		loadedHits += imagesData.hits.length;

		if (totalHits === 0) {
			iziToast.show({
				message: 'Sorry, there are no images for this query',
				position: 'topRight',
				timeout: 2000,
				color: 'red',
			});
			return;
		}

		const markup = createGalleryItemMarkup(imagesData.hits);
		galleryEl.insertAdjacentHTML("afterbegin", markup);
		initializeOrUpdateLightbox();

		if (loadedHits < totalHits) {
			loadMoreBtnEl.classList.remove("is-hidden");
		}
		else {
			iziToast.show({
				message: "We're sorry, but you've reached the end of search results.",
				position: 'topRight',
				timeout: 2000,
				color: 'red',
			});
		}

	} catch (error) {
		console.log(error);
	} finally {
		loaderEl.classList.add("is-hidden");
		event.target.reset();
	}
};

const onLoadMore = async () => {
	page += 1;
	loaderEl.classList.remove("is-hidden");

	try {
		const imagesData = await fetchPhotosByQuery(searchQuery, page);
		loaderEl.classList.add("is-hidden");
		loadedHits += imagesData.hits.length;

		const markup = createGalleryItemMarkup(imagesData.hits);
		galleryEl.insertAdjacentHTML("beforeend", markup);
		initializeOrUpdateLightbox();

		const cardHeight = document.querySelector('.gallery-box').firstElementChild.getBoundingClientRect().height;
		window.scrollBy({
			top: cardHeight * 2,
			behavior: 'smooth',
		});

		if (loadedHits >= totalHits) {
			loadMoreBtnEl.classList.add("is-hidden");
			iziToast.show({
				message: "We're sorry, but you've reached the end of search results.",
				position: 'topRight',
				timeout: 2000,
				color: 'red',
			});
		}

	} catch (error) {
		console.log(error);
		// loaderEl.classList.add("is-hidden");
	} finally {
		loaderEl.classList.add("is-hidden");
	}
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);