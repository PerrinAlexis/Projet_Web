window.onload = function () {
    const config = JSON.parse(localStorage.getItem("jardinConfig"));
    if (!config) {
        alert("Aucun jardin trouvé !");
        return;
    }

    const taille = config.taille;
    const plantesPlace = config.plantes;

    afficherImage(taille);
    const positions = genererPositions(taille);
    const casesContainer = document.getElementById("cases-container");


    const plantesArray = Object.entries(plantesPlace);
    for (let i = 0; i < plantesArray.length; i++) {
        const caseId = plantesArray[i][0];
        const planteSrc = plantesArray[i][1];

        const x = positions[i][0];
        const y = positions[i][1];

        const zone = creerZone(caseId, x, y, planteSrc);
        casesContainer.appendChild(zone);
    }
};

function afficherImage(taille) {
    const img = document.getElementById("image-jardin");
    img.src = `../img/${taille}.png`;
}


function genererPositions(taille) {
    const positions = [];
    let nb;
    if (taille === "2x2") {
        nb = 2;
    } else {
        nb = 3;
    }
    const tailleCase = 200;
    let decalage;
    if (taille === "2x2") {
        decalage = 100;
    } else {
        decalage = 0;
    }

    for (let y = 0; y < nb; y++) {
        for (let x = 0; x < nb; x++) {
            positions.push([x*tailleCase+decalage, y*tailleCase+decalage]);
        }
    }
    return positions;
}

function creerZone(caseId, x, y, planteSrc) {
    const div = document.createElement("div");
    div.className = "drop-zone";
    div.style.position = "absolute";
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.dataset.case = caseId;
    div.ondrop = handleDrop;
    div.ondragover = e => e.preventDefault();

    const img = document.createElement("img");
    img.src = planteSrc;
    img.alt = planteSrc;
    img.classList.add("plante-zone");
    div.appendChild(img);

    return div;
}

function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const dropZone = e.currentTarget;
    const planteImg = dropZone.querySelector("img");

    if (!planteImg) return;

    if (data.includes("arrosoir")) {
        const originalSrc = planteImg.src;
        const fileName = originalSrc.split("/").pop();
        const planteMureName = fileName.replace("Bebe_", "");

        planteImg.src = `../img/${planteMureName}`;
        planteImg.classList.add("mature");
    }
}
