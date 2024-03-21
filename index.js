const API_ENDPOINT = `https://rickandmortyapi.com/api/character/?name=`;
const FETCH_OUTPUT = document.getElementById('fetchOutput');
const ERROR_MESSAGE = document.getElementById('errorMessage');
const SEARCH_BAR = document.getElementById('searchBar');
const NEXT_PAGE_BUTTON = document.getElementById('nextPageButton');

const fetchAndDisplayCharacters = (url) => {

	fetch(url)

		.then(response => {
			if (!response.ok) {
				throw (`No characters found.`);
			}

			ERROR_MESSAGE.innerHTML = '';
			return response.json();
		})

		.catch(error => {
			ERROR_MESSAGE.innerHTML = error;
			NEXT_PAGE_BUTTON.style.display = 'none';
		})

		.then(({ results: characters, info: page }) => {
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

			FETCH_OUTPUT.innerHTML += CHARACTER_CARDS;

			if (page.next) {
				NEXT_PAGE_BUTTON.style.display = 'block';
				NEXT_PAGE_BUTTON.onclick = () => fetchAndDisplayCharacters(page.next);
			}
			else NEXT_PAGE_BUTTON.style.display = 'none';
		});
}

fetchAndDisplayCharacters(API_ENDPOINT);

SEARCH_BAR.oninput = () => {
	FETCH_OUTPUT.innerHTML = '';
	fetchAndDisplayCharacters(`${API_ENDPOINT}${SEARCH_BAR.value}`);
}