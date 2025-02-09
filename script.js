<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Herinneringen</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="script.js"></script>
</head>
<body>

    <h1>Welkom bij onze herinneringen</h1>
    
    <nav>
        <button onclick="toonFotosVideos()">📸 Foto’s en Video’s</button>
        <button onclick="toonDagboek()">📖 Dagboek</button>
    </nav>

    <div id="content"></div>

</body>
</html>
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
}

nav {
    margin: 20px 0;
}

button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}

#content {
    margin-top: 20px;
}

img {
    max-width: 200px;
    margin: 10px;
    display: block;
}

.foto-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.foto-container img {
    margin: 10px;
    max-width: 150px;
    height: auto;
    border: 2px solid #ddd;
    border-radius: 5px;
}

.delete-button {
    display: block;
    margin-top: 5px;
    background-color: red;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;
}
document.addEventListener("DOMContentLoaded", function () {
    alert("Ik hou van jou Robin ❤️");
});

function toonFotosVideos() {
    document.getElementById("content").innerHTML = `
        <h2>Foto’s en Video’s</h2>
        <p>Kies een categorie:</p>
        <button onclick="toonGebeurtenissen('Zomervakanties')">Zomervakanties</button>
        <button onclick="toonGebeurtenissen('Kerstvakanties')">Kerstvakanties</button>
        <button onclick="toonGebeurtenissen('Op reis')">Op reis</button>
        <button onclick="toonGebeurtenissen('Uitstappen')">Uitstappen</button>
        <button onclick="toonGebeurtenissen('Zomaar jij en ik')">Zomaar jij en ik</button>
        <div id="gebeurtenissen"></div>
    `;
}

function toonGebeurtenissen(categorie) {
    let gebeurtenissen = {
        "Zomervakanties": ["Zomer 2022", "Zomer 2023", "Zomer 2024"],
        "Kerstvakanties": ["Kerst 2022", "Kerst 2023", "Kerst 2024"],
        "Op reis": ["Weekend Parijs", "Italië Trip", "Spanje Avontuur"],
        "Uitstappen": ["Dierentuin", "Pretpark", "Stadsbezoek"],
        "Zomaar jij en ik": ["Romantische avond", "Samen koken", "Wandeling"]
    };

    let html = `<h3>${categorie}</h3>`;
    gebeurtenissen[categorie].forEach(event => {
        html += `<button onclick="toonFotos('${categorie}', '${event}')">${event}</button>`;
    });

    document.getElementById("gebeurtenissen").innerHTML = html;
}

function toonFotos(categorie, event) {
    let fotos = JSON.parse(localStorage.getItem(`${categorie}-${event}`)) || [];

    let html = `
        <h3>Foto's van ${event}</h3>
        <input type="file" id="fileUpload" multiple accept="image/*">
        <button onclick="uploadFotos('${categorie}', '${event}')">Upload Foto's</button>
        <div class="foto-container" id="fotoGalerij"></div>
    `;

    document.getElementById("gebeurtenissen").innerHTML = html;
    laadFotos(categorie, event);
}

function uploadFotos(categorie, event) {
    let fileInput = document.getElementById("fileUpload");
    let files = fileInput.files;
    if (files.length === 0) {
        alert("Selecteer minstens één foto.");
        return;
    }

    let fotos = JSON.parse(localStorage.getItem(`${categorie}-${event}`)) || [];

    for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = function (e) {
            fotos.push(e.target.result);
            localStorage.setItem(`${categorie}-${event}`, JSON.stringify(fotos));
            laadFotos(categorie, event);
        };
        reader.readAsDataURL(files[i]);
    }
}

function laadFotos(categorie, event) {
    let fotos = JSON.parse(localStorage.getItem(`${categorie}-${event}`)) || [];
    let fotoGalerij = document.getElementById("fotoGalerij");
    fotoGalerij.innerHTML = "";

    fotos.forEach((foto, index) => {
        let fotoDiv = document.createElement("div");
        fotoDiv.classList.add("foto-container");
        fotoDiv.innerHTML = `
            <img src="${foto}" alt="Foto ${index + 1}">
            <button class="delete-button" onclick="verwijderFoto('${categorie}', '${event}', ${index})">Verwijderen</button>
        `;
        fotoGalerij.appendChild(fotoDiv);
    });
}

function verwijderFoto(categorie, event, index) {
    let fotos = JSON.parse(localStorage.getItem(`${categorie}-${event}`)) || [];
    fotos.splice(index, 1);
    localStorage.setItem(`${categorie}-${event}`, JSON.stringify(fotos));
    laadFotos(categorie, event);
}
