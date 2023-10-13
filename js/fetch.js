function loadData(url) {

	fetch(url)

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
			// document.querySelector('button').onclick = function () {
			// 	loadData(data.info.next);
			// }
			nextPage(data.info.next);

		})

		.catch(error => {
			console.error('Error:', error);
			// document.getElementById('characters').innerHTML += "We're sorry, there's been an error on our side";
		});
};

window.onload = loadData('https://rickandmortyapi.com/api/character/');
// document.querySelector("button").addEventListener('click', function () {
// 	loadData('https://rickandmortyapi.com/api/character/');
// });

function nextPage(param) {
	document.querySelector('button').onclick = function () {
		loadData(param);
	}
}

// window.onscroll = function() {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         // Cargar más datos
//         loadData('url').then(next => {
//             // Usar la variable next
//             console.log(next);
//         });
//     }
// };
