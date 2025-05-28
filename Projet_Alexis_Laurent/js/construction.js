let taille = "";
let plantesPlace = {};

// Fonction principale pour le début
function choisirGrille(tailleChoisie) {
    taille = tailleChoisie;
    plantesPlace = {};
    creerCasesGrille(taille);
    afficherImage(taille);
    
}

// Affiche l'image du jardin
function afficherImage(taille) {
    const img = document.getElementById("image-jardin");
    img.style.display = "block";
    img.src = `../img/${taille}.png`;
}

// Crée les zones de drop selon la taille sélectionnée
function creerCasesGrille(taille) {
    const casesContainer = document.getElementById("cases-container");
    casesContainer.innerHTML = "";

    const positions = genererPositions(taille);
    function traiterPosition(pos, index) {
        const zone = creerZone(index, pos[0], pos[1]);
        casesContainer.appendChild(zone);
    }
    
    positions.forEach(traiterPosition);
}



// Génère les positions des cases selon la grille (2x2 ou 3x3)
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

// Crée Les zones où on peut déposer
function creerZone(index, x, y) {
    const div = document.createElement("div");
    div.className = "drop-zone";
    div.style.position = "absolute";
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.border = "1px dashed transparent";
    div.dataset.case = `case-${index}`;
    div.ondrop = handleDrop;
    div.ondragover = autoriserDrop;
    return div;
}

// Autoriser le drop avec
function autoriserDrop(e) {
    e.preventDefault();
}

// Déposer une plante dans une zone avec
function handleDrop(e) {
    e.preventDefault();
    const nom = e.dataTransfer.getData("text/plain");
    const dropZone = e.currentTarget;
    const caseId = dropZone.dataset.case;
    plantesPlace[caseId] = nom;
    //enlever ce qu'il y avait avant
    dropZone.innerHTML = "";
    //afficher l'image
    const img = document.createElement("img");
    img.src = nom;
    img.alt = nom;
    dropZone.appendChild(img);
}


// Valide le jardin et sauvegarde dans le localStorage
function validerJardin() {
    if (!taille) {
        alert("Choisissez d'abord un terrain !");
        return;
    }

    const config = {
        taille: taille,
        plantes: plantesPlace
    };

    localStorage.setItem("jardinConfig", JSON.stringify(config));
    window.location.href = "jardin.html";
}
