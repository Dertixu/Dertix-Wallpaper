// --- 1. GESTION DE LA DATE ---
function updateDate() {
    const dateElement = document.getElementById('date-display');
    if (!dateElement) return; // Sécurité si l'élément n'existe pas encore
    
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = now.toLocaleDateString('fr-FR', options);
    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    dateElement.textContent = dateString;
}
updateDate();
setInterval(updateDate, 60000);

// --- 2. GESTION DE LA MUSIQUE (API Lively) ---
function livelyCurrentTrack(data) {
    let obj = JSON.parse(data);
    const titleEl = document.getElementById('track-title');
    const artistEl = document.getElementById('track-artist');
    const artEl = document.getElementById('track-art');

    if (obj != null) {
        if(titleEl) titleEl.textContent = obj.Title || "Titre inconnu";
        if(artistEl) artistEl.textContent = obj.Artist || "Artiste inconnu";
        
        if (obj.Thumbnail) {
            const base64String = !obj.Thumbnail.startsWith("data:image/")
                ? "data:image/png;base64," + obj.Thumbnail
                : obj.Thumbnail;
            if(artEl) {
                artEl.src = base64String;
                artEl.style.display = "block";
            }
        } else {
            if(artEl) artEl.style.display = "none";
        }
    } else {
        if(titleEl) titleEl.textContent = "Aucune musique en cours";
        if(artistEl) artistEl.textContent = "";
        if(artEl) artEl.style.display = "none";
    }
}
