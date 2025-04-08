document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const overlayMenu = document.querySelector('.overlay-menu');

    hamburger.addEventListener('click', function() {
        overlayMenu.classList.toggle('show');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.video-player video');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('expandedVideo');
    const closeBtn = document.querySelector('.modal .close');

    videos.forEach(video => {
        video.addEventListener('click', function() {
            modal.style.display = 'block';
            modalVideo.src = this.src;
            modalVideo.play();
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = "";
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = "";
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const maps = document.querySelectorAll('.map-container');
    const modal = document.getElementById('mapModal');
    const modalMap = document.getElementById('expandedMap');
    const closeBtn = document.querySelector('.modal .close');

    maps.forEach(map => {
        map.addEventListener('click', function() {
            const iframeSrc = this.querySelector('iframe').src;
            modal.style.display = 'block';
            modalMap.src = iframeSrc;
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalMap.src = "";
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalMap.src = "";
        }
    });
});
// Exemplo de fotos por álbum
const albums = { 
    album1: ["fotos/aula passeio 1.jpg", "fotos/aula passeio 2.jpg", "fotos/aula passeio 3.jpg", "fotos/aula passeio 4.jpg"],
    album2: ["fotos/problemas ambientais 1.jpg", "fotos/problemas ambientais 2.jpg", "fotos/problemas ambientais 3.jpg", "fotos/problemas ambientais 4.jpg"],
    album3: ["foto1.jpg", "foto2.jpg", "foto3.jpg"]
};

let currentAlbum = [];
let currentIndex = 0;

document.querySelectorAll('.album').forEach((album, index) => {
    album.addEventListener('click', function() {
        const albumKey = `album${index + 1}`;
        currentAlbum = albums[albumKey];
        currentIndex = 0;
        openModal();
        updatePhoto();
    });
});

function openModal() {
    document.getElementById('album-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('album-modal').style.display = 'none';
}

function updatePhoto() {
    document.getElementById('album-photo').src = currentAlbum[currentIndex];
}

document.querySelector('.close').addEventListener('click', closeModal);

document.getElementById('prev-photo').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        updatePhoto();
    }
});

document.getElementById('next-photo').addEventListener('click', function() {
    if (currentIndex < currentAlbum.length - 1) {
        currentIndex++;
        updatePhoto();
    }
});
function openTab(evt, tabId) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tab-content" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Get all elements with class="tab-link" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabId).style.display = "block";
    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    if (popupOverlay && popup && closePopup) {
        closePopup.addEventListener('click', function() {
            popupOverlay.style.display = 'none';
        });

        popupOverlay.addEventListener('click', function(event) {
            if (event.target === popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }
});