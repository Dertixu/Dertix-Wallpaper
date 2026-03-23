// --- 1. GESTION DE LA DATE ---
function updateDate() {
    const dateElement = document.getElementById('date-display');
    if (!dateElement) return;
    
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
    let dateString = now.toLocaleDateString('fr-FR', options);
    
    dateElement.textContent = dateString.toUpperCase();
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
        if(titleEl) titleEl.textContent = "Aucune lecture";
        if(artistEl) artistEl.textContent = "Spotify en pause";
        if(artEl) artEl.style.display = "none";
    }
}