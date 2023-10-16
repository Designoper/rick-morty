const characterEndpoint = `https://rickandmortyapi.com/api/character/?name=`;
const nextPageButton = document.querySelector('#next-page');
const apiContent = document.querySelector('#characters');
const errorMessage = document.querySelector('#error');
const userInput = document.querySelector('#input');

const loadCharacters = (aaa, __param) => {
	console.log(__param)
	let request;
	__param === undefined ? request = aaa : request = `${characterEndpoint}${__param}`

	fetch(request)

		.then(response => {
			if (__param !== '' && !response.ok) {
				throw new Error(`No characters found.`);
			}
			if (!response.ok) {
				throw new Error(`Sorry, we couldn't recover the data.`);
			}
			errorMessage.innerHTML = '';
			nextPageButton.style.visibility = 'visible';
			return response.json();
		})

		.catch(error => {
			console.error('Error:', error);
			errorMessage.innerHTML = error;
			apiContent.innerHTML = '';
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
			apiContent.innerHTML = (__param === '' ? apiContent.innerHTML + content : content);
			nextPageButton.onclick = () => info.next === null ? errorMessage.innerHTML = 'No more characters' : loadCharacters(info.next);
		})

	// .catch(error => {
	// 	console.error('Error:', error);
	// 	apiContent.innerHTML = '';
	// 	errorMessage.innerHTML = 'No results found';
	// 	nextPageButton.style.visibility = 'hidden';
	// });
};

loadCharacters(characterEndpoint);

userInput.oninput = () => {
	if (userInput.value === '') {
		loadCharacters(characterEndpoint);
	} else {
		loadCharacters(characterEndpoint, userInput.value);
	}
};