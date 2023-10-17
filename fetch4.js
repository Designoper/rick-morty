const characterEndpoint = `https://rickandmortyapi.com/api/character/?name=`;
const apiContent = document.querySelector('#characters');
const errorMessage = document.querySelector('#error');
const userInput = document.querySelector('#input');
const elemento = document.querySelector('#point');

const loadCharacters = (request1, __param) => {

	let request;
	__param === undefined ? request = request1 : request = `${request1}${__param}`

	fetch(request)

		.then(response => {
			if (__param !== undefined && !response.ok) {
				throw new Error(`No characters found.`);
			}
			if (!response.ok) {
				throw new Error(`Sorry, we couldn't recover the data.`);
			}
			errorMessage.innerHTML = '';
			return response.json();
		})

		.catch(error => {
			console.error('Error:', error);
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

			// apiContent.innerHTML = __param === undefined ? apiContent.innerHTML + content : content;
			apiContent.innerHTML += content;
			// document.querySelector("#main").insertAdjacentHTML("beforeend", `<span id="point"></span>`);
			// const observer = new IntersectionObserver(function (entries) {
			// 	// entries es una matriz de objetos IntersectionObserverEntry
			// 	// Para cada entrada, comprueba si el elemento está en la vista
			// 	entries.forEach(function (entry) {
			// 		if (entry.isIntersecting) {
			// 			loadCharacters(info.next);
			// 		}
			// 	});
			// });

			// observer.observe(elemento);

			// if (info.next !== null) {



		}

			// }


			// .catch(error => {
			// 	console.error('Error:', error);
			// 	apiContent.innerHTML = '';
			// 	// errorMessage.innerHTML = 'No results found';
			// });
		)
}

loadCharacters(characterEndpoint);

userInput.oninput = () => {
	apiContent.innerHTML = '';
	userInput.value === '' ? loadCharacters(characterEndpoint) : loadCharacters(characterEndpoint, userInput.value);
}