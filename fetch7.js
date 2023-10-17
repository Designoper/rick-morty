const characterEndpoint = `https://rickandmortyapi.com/api/character/?name=`;
const apiContent = document.querySelector('#characters');
const errorMessage = document.querySelector('#error');
const userInput = document.querySelector('#input');
const button = document.querySelector('#next-page');

const loadCharacters = (content) => {

	fetch(content)

		.then(response => {
			if (userInput.value !== '' && !response.ok) {
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
		})

		.then(({ results: characters, info }) => {
			const content = characters.map(character =>
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

			apiContent.innerHTML += content;
			button.onclick = () => info.next === null ? errorMessage.innerHTML = 'oh no': loadCharacters(info.next);
		}
		)
}

loadCharacters(characterEndpoint);

userInput.oninput = () => {
	apiContent.innerHTML = '';
	userInput.value === '' ? loadCharacters(characterEndpoint) : loadCharacters(`${characterEndpoint}${userInput.value}`);
}