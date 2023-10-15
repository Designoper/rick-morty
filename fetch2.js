const characterEndpoint = `https://rickandmortyapi.com/api/charcter/?name=`;
const nextPageButton = document.querySelector('#next-page');
const apiContent = document.querySelector('#characters');
const errorMessage = document.querySelector('#error');
const userInput = document.querySelector('#input');

const loadCharacters = (endpoint, __param = '') => {

	const request = `${endpoint}${__param}`;
	fetch(request)

		.then(response => {
			errorMessage.innerHTML = '';
			nextPageButton.style.visibility = 'visible';
			return response.json();
		})

		.catch(error => {
			console.log(error);
			 errorMessage.innerHTML = "We couldn't retrieve info from the API";
			// console.error('Error:', error);
			 apiContent.innerHTML = '';
			// errorMessage.innerHTML = 'No results found';
			// nextPageButton.style.visibility = 'hidden';
			throw new Error('o')

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

		.catch(error => {
			console.error('Error:', error);
			 apiContent.innerHTML = '';
			errorMessage.innerHTML = 'No results foundaaaaaa';
			// nextPageButton.style.visibility = 'hidden';
		})


};

loadCharacters(characterEndpoint);
userInput.oninput = () => loadCharacters(characterEndpoint, userInput.value);