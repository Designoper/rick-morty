const characterEndpoint = `https://rickandmortyapi.com/api/character/?name=`;
const nextPageButton = document.querySelector('#next-page');
const apiContent = document.querySelector('#characters');
const errorMessage = document.querySelector('#error');
const userInput = document.querySelector('#input');

const loadCharacters = (endpoint, __param) => {

	if (__param === undefined) {
		__param = '';
	}
	const request = `${endpoint}${__param}`;

	fetch(request)

		.then(response => {
			errorMessage.innerHTML = '';
			nextPageButton.style.visibility = 'visible';
			return response.json();
		})

		.then(data => {
			const characters = data.results;
			let content = '';

			characters.forEach(character => {
				content +=
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
					</article>`;
			});
			switch (__param) {
				case (''): apiContent.innerHTML += content;
					break;
				default: apiContent.innerHTML = content;
			}
			nextPageButton.onclick = () => data.info.next === null ? errorMessage.innerHTML = 'No more characters' : loadCharacters(data.info.next);
		})

		.catch(error => {
			console.error('Error:', error);
			apiContent.innerHTML = '';
			errorMessage.innerHTML = 'No results found';
			nextPageButton.style.visibility = 'hidden';
		});
};

window.onload = loadCharacters(characterEndpoint);

userInput.oninput = () => loadCharacters(characterEndpoint, userInput.value);