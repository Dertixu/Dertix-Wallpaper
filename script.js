        function toggleMenu() {
            document.getElementById('sideMenu').classList.toggle('open');
        }

        function copyToClipboard() {
            navigator.clipboard.writeText("dertixu").then(() => {
                const alertBox = document.getElementById("copyAlert");
                alertBox.style.display = "block";
                setTimeout(() => { alertBox.style.display = "none"; }, 2000);
            });
        }

        // --- Effet Néon Japonais en Arrière-plan (Amélioré) ---

// Liste de Kanjis élargie
const kanjis = ['光', '夢', '愛', '星', '風', '水', '火', '空', '雷', '幻', '夜', '影', '電', '魂', '龍', '神', '力', '剣', '桜', '月'];

// Création du conteneur (s'il n'existe pas déjà)
let bgContainer = document.getElementById('neon-bg-container');
if (!bgContainer) {
    bgContainer = document.createElement('div');
    bgContainer.id = 'neon-bg-container';
    document.body.appendChild(bgContainer);
} else {
    bgContainer.innerHTML = ''; // Vide le conteneur si on recharge le script
}

const charsArray = [];

// Définition d'une grille pour mieux espacer les lettres (ex: 8 colonnes x 6 lignes = 48 cases)
const cols = 9; 
const rows = 7;
const cellWidth = 100 / cols; // Largeur d'une case en vw
const cellHeight = 100 / rows; // Hauteur d'une case en vh

// Génération répartie sur la grille
for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        // On saute aléatoirement quelques cases (environ 15%) pour un effet plus naturel et moins "carré"
        if (Math.random() > 0.85) continue;

        let span = document.createElement('span');
        span.className = 'neon-char';
        span.innerText = kanjis[Math.floor(Math.random() * kanjis.length)];
        
        // Placement aléatoire MAIS contraint à l'intérieur de sa propre case
        // Le 0.2 et 0.6 créent une marge pour éviter que les lettres touchent les bords de la case
        const randomX = (i * cellWidth) + (Math.random() * (cellWidth * 0.6) + (cellWidth * 0.2));
        const randomY = (j * cellHeight) + (Math.random() * (cellHeight * 0.6) + (cellHeight * 0.2));
        
        span.style.left = randomX + 'vw';
        span.style.top = randomY + 'vh';
        
        // Taille aléatoire
        span.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        
        // Animation aléatoire
        span.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Délai négatif pour que l'animation de flottement soit déjà en cours au chargement de la page
        span.style.animationDelay = (Math.random() * -20) + 's'; 
        
        bgContainer.appendChild(span);
        charsArray.push(span);
    }
}

// --- Effet d'éclairage de proximité (quand la souris passe à côté) - MISE À JOUR ---
document.addEventListener('mousemove', (e) => {
    
    // --- MODIFICATION ICI : Zone de détection augmentée (passée de 180 à 350px) ---
    const detectionZone = 350; 

    charsArray.forEach(char => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        
        // Calcul de la distance
        const dist = Math.sqrt(Math.pow(e.clientX - charX, 2) + Math.pow(e.clientY - charY, 2));

        if (dist < detectionZone) {
            // Intensité basée sur la nouvelle zone plus grande
            const intensity = 1 - (dist / detectionZone); 
            
            // Le CSS se charge de fluidifier l'application de ces styles
            char.style.color = `rgba(255, 255, 255, ${0.15 + intensity * 0.85})`;
            char.style.textShadow = `
                0 0 ${5 + intensity * 20}px rgba(42, 183, 202, ${0.2 + intensity * 0.8}), 
                0 0 ${10 + intensity * 40}px rgba(42, 183, 202, ${0.1 + intensity * 0.7})
            `;
            // Effet d'échelle légèrement plus prononcé
            char.style.transform = `scale(${1 + intensity * 0.3})`; 
            char.style.zIndex = "10";
        } else {
            // Retour à la normale - Le CSS gère le fondu sortant (Fade Out) sur 0.8s
            char.style.color = 'rgba(255, 255, 255, 0.15)';
            char.style.textShadow = '0 0 5px rgba(42, 183, 202, 0.2)';
            char.style.transform = 'scale(1)';
            char.style.zIndex = "1";
        }
    });
});