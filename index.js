const API_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=`;
const FETCH_RESPONSE = document.getElementById('fetchResponse');
const ERROR_MESSAGE = document.getElementById('errorMessage');
const SEARCH_BAR = document.getElementById('searchBar');
const NEXT_PAGE_BUTTON = document.getElementById('nextPageButton');

const fetchApi = async (url) => {
	try {
		const RESPONSE = await fetch(url);

		if (!RESPONSE.ok) {
			throw new Error('No characters found.');
		}

		const { results: characters, info: page } = await RESPONSE.json();

		const CHARACTER_CARDS = characters.map(character =>
			`<article>
				<h2>${character.name}</h2>
				<img src="${character.image}" alt="Character ${character.name}">
				<ul>
					<li><strong>Species:</strong> ${character.species}</li>
					${character.type === '' ? '' : `<li><strong>Type:</strong> ${character.type}</li>`}
					<li><strong>Status:</strong> ${character.status}</li>
					<li><strong>Gender:</strong> ${character.gender}</li>
					<li><strong>Origin:</strong> ${character.origin.name}</li>
					<li><strong>Location:</strong> ${character.location.name}</li>
				</ul>
			</article>`
		).join('');

		FETCH_RESPONSE.innerHTML += CHARACTER_CARDS;

		if (page.next) {
			NEXT_PAGE_BUTTON.style.display = 'block';
			NEXT_PAGE_BUTTON.onclick = () => fetchApi(page.next);
		} else {
			NEXT_PAGE_BUTTON.style.display = 'none';
		}

	} catch (error) {
		ERROR_MESSAGE.innerHTML = error.message;
		NEXT_PAGE_BUTTON.style.display = 'none';
	}
};

window.onload = () => fetchApi(API_ENDPOINT);

const clean = () => {
	FETCH_RESPONSE.innerHTML = '';
	ERROR_MESSAGE.innerHTML = '';
}

const addUserInput = () => {
	clean();
	fetchApi(`${API_ENDPOINT}${SEARCH_BAR.value}`);
}

SEARCH_BAR.oninput = addUserInput;