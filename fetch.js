const characterEndpoint = `https://rickandmortyapi.com/api/character/`;
const nextPageButton = document.querySelector('#next-page');
const apiContent = document.querySelector('#characters');
const errorBox = document.querySelector('#error');
// const search = document.querySelector('input').value;
const queryurl = `?name=`;

function loadData(url) {

	fetch(`${url}`)

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
				let type = '';
				if (character.type !== "") {
					type = `<li><strong>Type:</strong> ${character.type}</li>`;
				}
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

function nextPage(url) {
	nextPageButton.onclick = function () {
		url === null ? errorBox.innerHTML = 'No more characters' : loadData(url);
	}
}





function searchUpdate() {

	const input = `${characterEndpoint}${queryurl}${document.getElementById('input').value}`;
	fetch(input)

		.then(response => {
			if (!response.ok) {
				document.getElementById('characters').innerHTML = '';
				errorBox.innerHTML = 'No results found';
				nextPageButton.style.visibility = 'hidden';
			}
			else {
				document.getElementById('error').innerHTML = '';
				nextPageButton.style.visibility = 'visible';
			}
			return response.json();
		})

		.then(data => {
			const characters = data.results;
			let content = '';
			characters.forEach(character => {
				let type = '';
				if (character.type !== "") {
					type = `<li><strong>Type:</strong> ${character.type}</li>`;
				}
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

document.getElementById('input').oninput = searchUpdate;