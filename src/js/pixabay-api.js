import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/";
const KEY = "44014136-e2da13f55dbc3b2e82126e922";

export const fetchPhotosByQuery = async (query, page) => {
	const searchParams = new URLSearchParams({
		key: KEY,
		q: query,
		image_type: "photo",
		orientation: "horizontal",
		safesearch: true,
		page,
		per_page: 15,
	});

	const response = await axios.get(`${BASE_URL}?${searchParams}`);
	if (response.status !== 200) {
		throw new Error(response.statusText);
	}
	return response.data;
};
