const urlOfApi = 'https://api.lyrics.ovh';
const songNameInput = document.getElementById("songNameInput");
const formForInputSearch = document.getElementById("formForInputSearch");
formForInputSearch.addEventListener('submit', e=>{
    e.preventDefault();
    searchValue = songNameInput.value.trim();
    
    if (!searchValue) {
        alert('Song not available. please try later');
    }
    else{
        songSearch(searchValue);
    }
})

 async function songSearch(searchValue) {
    const searchResult = await fetch(`${urlOfApi}/suggest/${searchValue}`)
    const data = await searchResult.json();

    resultShow(data);

}

function resultShow(data) {
    console.log(data);
    fancyResults.innerHTML = `
    <ul class="song-list">
    ${data.data.slice(0,10).map(song => `<li>
                        <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album: <span>${song.artist.name}</span></p>
                        <p class="author lead">Artist: <span>${song.album.title}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success"> <span data-artist="${song.artist.name}" data-songTitle="${song.title}"> Get Lyrics </span> </button>
                    </div>
                </div>
                </li>
    `).join('')
}
    `
}

const fancyResults = document.getElementById("fancyResults");
fancyResults.addEventListener("click", e=>{
    const clickedElement = e.target;
    if (clickedElement.tagName === "span" || "button") {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle) {
    const response = await fetch(`${urlOfApi}/v1/${artist}/${songTitle}`);
    const data = await response.json(); 
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    console.log(lyrics);

    fancyResults.innerHTML =    
     ` <div class="single-lyrics text-center">
    <h2 class="text-success mb-4"><bold>${songTitle}</bold><br> by ${artist}</h2>
    <pre class="lyric text-white">${lyrics}</pre>
    </div>`
}