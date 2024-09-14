
/* JavaScript code for various functionalities in our music player. */

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('play-pause');
    const stopButton = document.getElementById('stop');
    const rewindButton = document.getElementById('rewind');
    const forwardButton = document.getElementById('forward');
    const repeatButton = document.getElementById('repeat');
    const lyricsButton = document.getElementById('lyrics');
    const lyricsPopup = document.getElementById('lyrics-popup');
    const closeLyrics = document.getElementById('close-lyrics');
    const lyricsTitle = document.getElementById('lyrics-title');
    const lyricsText = document.getElementById('lyrics-text');
    
    // Function to get the query parameter value by name
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Load song metadata from JSON
    async function loadSongMetadata() {
        try {
            const response = await fetch('JSON/songs.json');
            const songs = await response.json();
            return songs;
        } catch (error) {
            console.error('Error loading song metadata:', error);
            return [];
        }
    }

    // Update player with song details
    async function updatePlayer() {
        const songs = await loadSongMetadata();
        const songFilename = getQueryParameter('song');
        const song = songs.find(s => s.filename === songFilename);

        if (song) {
            audio.src = songFilename;
            audio.load();
            document.getElementById('title').textContent = song.title;
            document.getElementById('artist').textContent = song.artist;
            lyricsText.textContent = song.lyrics || 'No lyrics available.';
        } else {
            document.getElementById('title').textContent = 'Song Title';
            document.getElementById('artist').textContent = 'Artist';
        }
    }

    updatePlayer();

    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    stopButton.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        playPauseButton.textContent = 'Play';
    });

    rewindButton.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    forwardButton.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    repeatButton.addEventListener('click', () => {
        audio.loop = !audio.loop;
        repeatButton.textContent = audio.loop ? 'Repeat On' : 'Repeat Off';
    });

    lyricsButton.addEventListener('click', () => {
        lyricsTitle.textContent = document.getElementById('title').textContent;
        lyricsPopup.style.display = 'flex';
    });

    closeLyrics.addEventListener('click', () => {
        lyricsPopup.style.display = 'none';
    });

    audio.addEventListener('ended', () => {
        playPauseButton.textContent = 'Play';
    });
});
