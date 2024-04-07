const API_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=`;
const RESPONSE_CONTAINER = document.getElementById('fetchResponse');
const SEARCH_BAR = document.getElementById('searchBar');
const NEXT_PAGE_BUTTON = document.getElementById('nextPageButton');

const mainFunction = async (url) => {
	const RESPONSE = await fetchResource(url);
	const PARSED_JSON = await parseJson(RESPONSE);
	printCharacters(PARSED_JSON);
	updateButton(PARSED_JSON);
}

const fetchResource = async (url) => {
	try {
		const RESPONSE = await fetch(url);
		return RESPONSE;
	}

	catch (error) {
		error = `fetchResource function has failed.`;
		RESPONSE_CONTAINER.textContent = `Connection failed.`;
		throw (console.error(error));
	}
}

const parseJson = async (response) => {
	try {
		const { results: characters, info: page } = await response.json();
		return { characters, page }
	}

	catch (error) {
		throw (console.warn(`parseJson function has failed.`));
	}
}

const printCharacters = ({ characters }) => {
	try {
		const CHARACTER_CARDS = characters.map(character =>
			`<article>
				<h2>${character.name}</h2>
				<img src="${character.image}" alt="Character ${character.name}">
				<ul>
					<li><strong>Species:</strong> ${character.species}</li>
					${character.type ? `<li><strong>Type:</strong> ${character.type}</li>` : ''}
					<li><strong>Status:</strong> ${character.status}</li>
					<li><strong>Gender:</strong> ${character.gender}</li>
					<li><strong>Origin:</strong> ${character.origin.name}</li>
					<li><strong>Location:</strong> ${character.location.name}</li>
				</ul>
			</article>`
		).join('');

		RESPONSE_CONTAINER.insertAdjacentHTML("beforeend", CHARACTER_CARDS);
	}

	catch (error) {
		RESPONSE_CONTAINER.textContent = 'No characters found.';
		NEXT_PAGE_BUTTON.style.display = 'none';
		console.warn(`No search results found`);
	}
}

const updateButton = ({ page = false }) => {
	NEXT_PAGE_BUTTON.style.display = page.next ? 'block' : 'none';
	NEXT_PAGE_BUTTON.onclick = () => mainFunction(page.next);
}

const clean = () => RESPONSE_CONTAINER.innerHTML = '';

SEARCH_BAR.oninput = () => {
	clean();
	mainFunction(`${API_ENDPOINT}${SEARCH_BAR.value}`);
}

window.onload = () => mainFunction(API_ENDPOINT);