const characterApiUrl = `https://rickandmortyapi.com/api/character/?name=`;
const characterContainer = document.querySelector('#characterContainer');
const errorMessage = document.querySelector('#errorMessage');
const searchBar = document.querySelector('#searchBar');
const nextPageButton = document.querySelector('#nextPageButton');

const fetchAndDisplayCharacters = (url) => {

	fetch(url)

		.then(response => {
			if (searchBar.value !== '' && !response.ok) {
				throw new Error(`No characters found.`);
			}
			if (!response.ok) {
				throw new Error(`Sorry, we couldn't recover the data.`);
			}
			errorMessage.innerHTML = '';
			return response.json();
		})

		.catch(error => {
			errorMessage.innerHTML = error;
			nextPageButton.style.display = 'none';
		})

		.then(({ results: characters, info: page }) => {
			const characterCardsHtml = characters.map(character =>
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

			characterContainer.innerHTML += characterCardsHtml;

			if (page.next) {
				nextPageButton.style.display = 'block';
				nextPageButton.onclick = () => fetchAndDisplayCharacters(page.next);
			}
			else nextPageButton.style.display = 'none';
		});
}

fetchAndDisplayCharacters(characterApiUrl);

searchBar.oninput = () => {
	characterContainer.innerHTML = '';
	fetchAndDisplayCharacters(`${characterApiUrl}${searchBar.value}`);
}