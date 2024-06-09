const API_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=`;
const SEARCH_BAR = document.getElementById('searchBar');
const SEARCH_OUTPUT = document.getElementById('searchOutput');
const ERROR_MESSAGE = document.getElementById('errorMessage');
const NEXT_PAGE_BUTTON = document.getElementById('nextPageButton');

const mainFunction = async (url) => {
	const DATA = await fetchAndParse(url);
	printCharacters(DATA);
	updateButton(DATA);
}

const fetchAndParse = async (url) => {
	try {
		const RESPONSE = await fetch(url);
		const DATA = await RESPONSE.json();
		return DATA;
	}

	catch {
		const CONSOLE_MESSAGE = `fetchAndParse function has failed.`;
		ERROR_MESSAGE.textContent = `Connection to the Rick and Morty API has failed.`;
		throw (console.warn(CONSOLE_MESSAGE));
	}
}

const printCharacters = (data) => {
	try {
		const CHARACTER_CARDS = data.results.map(character =>
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

		SEARCH_OUTPUT.insertAdjacentHTML("beforeend", CHARACTER_CARDS);
	}

	catch {
		ERROR_MESSAGE.textContent = 'No characters found.';
		NEXT_PAGE_BUTTON.style.display = 'none';
		console.warn(`No search results found.`);
	}
}

const updateButton = (data) => {
	NEXT_PAGE_BUTTON.style.display = data.info.next ? 'block' : 'none';
	NEXT_PAGE_BUTTON.onclick = () => mainFunction(data.info.next);
}

const cleanSearchResults = () => {
	ERROR_MESSAGE.innerHTML = '';
	SEARCH_OUTPUT.innerHTML = '';
}

SEARCH_BAR.oninput = () => {
	cleanSearchResults();
	mainFunction(`${API_ENDPOINT}${SEARCH_BAR.value}`);
}

window.onload = () => mainFunction(API_ENDPOINT);