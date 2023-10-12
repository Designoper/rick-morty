(function loadData() {
	fetch('https://rickandmortyapi.com/api/character/')
		.then(response => {
			if (!response.ok) {
				throw new Error("Error HTTP: " + response.status);
			}
			return response.json();
		})
		.then(data => {
			const characters = data.results;
			let output = '';
			characters.forEach(character => {
				output += `<li>Nombre: ${character.name}, Especie: ${character.species}, Estado: ${character.status}</li>, Imagen: ${character.image}`;
			});
			document.getElementById('characters').innerHTML = output;
		})
		.catch(error => {
			console.error('Error:', error);
			document.getElementById('characters').innerHTML = "Error: " + error.message;
		});
})();

// document.querySelector("button").onclick = loadData;