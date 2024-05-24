const BASE_URL = "https://pixabay.com/api/";
const KEY = "44014136-e2da13f55dbc3b2e82126e922";

export const fetchPhotosByQuery = (searchQuery) => {

	const searchParams = new URLSearchParams({
		key: KEY,
		q: searchQuery,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: true,

	});

	return fetch(`${BASE_URL}?${searchParams}`).then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	})
};



