const API_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=`;
const FETCH_RESPONSE = document.getElementById('fetchResponse');
const SEARCH_BAR = document.getElementById('searchBar');
const NEXT_PAGE_BUTTON = document.getElementById('nextPageButton');

const mainFunction = async (url) => {
	const API_RESPONSE = await fetchContent(url);
	const PARSED_JSON = await parseJson(API_RESPONSE);
	await printCharacters(PARSED_JSON);
	await buttonState(PARSED_JSON);
}

const fetchContent = async (url = API_ENDPOINT) => {
	try {
		const API_RESPONSE = await fetch(url);
		return API_RESPONSE;

	} catch (error) {
		FETCH_RESPONSE.textContent = 'Connection failed.';
	}
}

const parseJson = async (response) => {
	const { results: characters, info: page } = await response.json();
	return { characters, page };
}

const printCharacters = async ({ characters }) => {
	try {
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

		FETCH_RESPONSE.insertAdjacentHTML("beforeend", CHARACTER_CARDS);

	} catch (error) {
		FETCH_RESPONSE.textContent = 'No characters found.';
		NEXT_PAGE_BUTTON.style.display = 'none';
	}
}

const buttonState = async ({ page }) => {
	if (page.next === null) {
		NEXT_PAGE_BUTTON.style.display = 'none';
	} else {
		NEXT_PAGE_BUTTON.style.display = 'block';
		NEXT_PAGE_BUTTON.onclick = () => mainFunction(page.next);
	}
}

const clean = () => FETCH_RESPONSE.innerHTML = '';

const addUserInput = () => {
	clean();
	mainFunction(`${API_ENDPOINT}${SEARCH_BAR.value}`);
}

SEARCH_BAR.oninput = addUserInput;

window.onload = () => mainFunction();