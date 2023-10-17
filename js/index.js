const characterEndpoint = `https://rickandmortyapi.com/api/character/?name=`;
const fetchedContent = document.querySelector('#characters');
const errorMessage = document.querySelector('#errorMessage');
const searchBar = document.querySelector('#searchBar');
const nextPageButton = document.querySelector('#nextPageButton');

const loadCharacters = (url) => {

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

		.then(({ results: characters, info }) => {
			const apiResponse = characters.map(character =>
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

			fetchedContent.innerHTML += apiResponse;

			if (info.next) {
				nextPageButton.style.display = 'block';
				nextPageButton.onclick = () => loadCharacters(info.next);
			}
			else nextPageButton.style.display = 'none';
		});
}

loadCharacters(characterEndpoint);

searchBar.oninput = () => {
	fetchedContent.innerHTML = '';
	loadCharacters(`${characterEndpoint}${searchBar.value}`);
}