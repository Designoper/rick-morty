const API_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=`;
const RESPONSE_CONTAINER = document.getElementById('fetchResponse');
const SEARCH_BAR = document.getElementById('searchBar');
const NEXT_PAGE_BUTTON = document.getElementById('nextPageButton');

const mainFunction = async (url) => {
	const RESPONSE = await fetchResource(url);
	printCharacters(RESPONSE);
	updateButton(RESPONSE);
}

const fetchResource = async (url = API_ENDPOINT) => {
	try {
		const RESPONSE = await fetch(url);
		const { results: characters, info: page } = await RESPONSE.json();
		return { characters, page }
	}
	catch (error) {
		RESPONSE_CONTAINER.textContent = 'Connection failed.';
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
	} catch (error) {
		RESPONSE_CONTAINER.textContent = 'No characters found.';
		NEXT_PAGE_BUTTON.style.display = 'none';
	}
}

const updateButton = ({ page }) => {
	NEXT_PAGE_BUTTON.style.display = page.next ? 'block' : 'none';
	NEXT_PAGE_BUTTON.addEventListener("click", () => mainFunction(page.next));
}

const clean = () => RESPONSE_CONTAINER.innerHTML = '';

SEARCH_BAR.addEventListener("input", () => {
	clean();
	mainFunction(`${API_ENDPOINT}${SEARCH_BAR.value}`);
});

window.addEventListener("load", () => mainFunction());