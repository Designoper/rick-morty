const characterUrl = `https://rickandmortyapi.com/api/character/`;
// const search = document.querySelector('input').value;
// const query = `?name=${search}`;

function loadData(url) {

	fetch(`${url}`)

		.then(response => {
			if (!response.ok) {
				throw new Error("Error HTTP: " + response.status);
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
			document.getElementById('characters').innerHTML += content;
			nextPage(data.info.next);
		})

		.catch(error => {
			console.error('Error:', error);
			// document.getElementById('characters').innerHTML += "We're sorry, there's been an error on our side";
		});
};

window.onload = loadData(characterUrl);

function nextPage(param) {
	document.querySelector('button').onclick = function () {
		loadData(param);
	}
}





function prova() {

	const input = `${baseUrl}?name=${document.getElementById('input').value}`;
	fetch(input)

		.then(response => {
			if (!response.ok) {
				document.getElementById('characters').innerHTML = 'Sorry, no results found';
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
			document.getElementById('characters').innerHTML = content;
			nextPage(data.info.next);
		})

		.catch(error => {
			console.error('Error:', error);
			// document.getElementById('characters').innerHTML += "We're sorry, there's been an error on our side";
		});
}
document.getElementById('input').oninput = prova;

// }

// const input = document.getElementById('input').innerHTML;
// document.getElementById('input').addEventListener('input', loadData(input));
