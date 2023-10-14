const characterEndpoint = `https://rickandmortyapi.com/api/character/`;
const queryParameter = `?name=`;
const nextPageButton = document.querySelector('#next-page');
const apiContent = document.querySelector('#characters');
const errorMessage = document.querySelector('#error');
const userInput = document.querySelector('#input');

function loadData(request) {

	fetch(`${request}`)

		.then(response => {
			if (!response.ok) {
				throw new Error("Error HTTP: " + response.status);
			}
			// document.getElementById('error').innerHTML = 'no  characters';
			return response.json();
		})

		.then(data => {
			const characters = data.results;
			let content = '';
			characters.forEach(character => {
				let type;
				character.type === '' ? type = '' : type = `<li><strong>Type:</strong> ${character.type}</li>`;
				content +=
					`<article>
						<h2>${character.name}</h2>
						<img src="${character.image}" alt="Character ${character.name}">
						<ul>
							<li><strong>Species:</strong> ${character.species}</li>
							${type}
							<li><strong>Status:</strong> ${character.status}</li>
							<li><strong>Gender:</strong> ${character.gender}</li>
							<li><strong>Origin:</strong> ${character.origin.name}</li>
							<li><strong>Location:</strong> ${character.location.name}</li>
						</ul>
					</article>`;
			});
			apiContent.innerHTML += content;
			nextPage(data.info.next);
		})

		.catch(error => {
			console.error('Error:', error);
			//  document.getElementById('characters').innerHTML += "We're sorry, there's been an error on our side";
		});
};

window.onload = loadData(characterEndpoint);

function nextPage(request) {
	nextPageButton.onclick = () => request === null ? errorMessage.innerHTML = 'No more characters' : loadData(request);
}





function searchUpdate() {

	const request = `${characterEndpoint}${queryParameter}${userInput.value}`;
	fetch(request)

		.then(response => {
			if (!response.ok) {
				apiContent.innerHTML = '';
				errorMessage.innerHTML = 'No results found';
				nextPageButton.style.visibility = 'hidden';
			}
			else {
				errorMessage.innerHTML = '';
				nextPageButton.style.visibility = 'visible';
			}
			return response.json();
		})

		.then(data => {
			const characters = data.results;
			let content = '';
			characters.forEach(character => {
				let type;
				character.type === '' ? type = '' : type = `<li><strong>Type:</strong> ${character.type}</li>`;
				content +=
					`<article>
						<h2>${character.name}</h2>
						<img src="${character.image}" alt="Character ${character.name}">
						<ul>
							<li><strong>Species:</strong> ${character.species}</li>
							${type}
							<li><strong>Status:</strong> ${character.status}</li>
							<li><strong>Gender:</strong> ${character.gender}</li>
							<li><strong>Origin:</strong> ${character.origin.name}</li>
							<li><strong>Location:</strong> ${character.location.name}</li>
						</ul>
					</article>`;
			});
			apiContent.innerHTML = content;
			nextPage(data.info.next);
		})

		.catch(error => {
			console.error('Error:', error);
			// document.getElementById('characters').innerHTML += "We're sorry, there's been an error on our side";
		});
}

userInput.oninput = searchUpdate;