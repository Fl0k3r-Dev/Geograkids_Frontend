document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const overlayMenu = document.querySelector(".overlay-menu");

  if (hamburger && overlayMenu) {
    hamburger.onclick = function () {
      overlayMenu.classList.toggle("show");
    };
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video-player video");
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("expandedVideo");
  const closeBtn = document.querySelector(".modal .close");

  if (videos && modal && modalVideo && closeBtn) {
    videos.forEach((video) => {
      video.onclick = function () {
        modal.style.display = "block";
        modalVideo.src = this.src;
        modalVideo.play();
      };
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.src = "";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.src = "";
      }
    };
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const maps = document.querySelectorAll(".map-container");
  const modal = document.getElementById("mapModal");
  const modalMap = document.getElementById("expandedMap");
  const closeBtn = document.querySelector(".modal .close");

  maps.forEach((map) => {
    map.addEventListener("click", function () {
      const iframeSrc = this.querySelector("iframe").src;
      modal.style.display = "block";
      modalMap.src = iframeSrc;
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    modalMap.src = "";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      modalMap.src = "";
    }
  });
});

// Exemplo de fotos por álbum
const albums = {
  album1: [
    "fotos/aula passeio 1.jpg",
    "fotos/aula passeio 2.jpg",
    "fotos/aula passeio 3.jpg",
    "fotos/aula passeio 4.jpg",
  ],
  album2: [
    "fotos/problemas ambientais 1.jpg",
    "fotos/problemas ambientais 2.jpg",
    "fotos/problemas ambientais 3.jpg",
    "fotos/problemas ambientais 4.jpg",
  ],
  album3: ["foto1.jpg", "foto2.jpg", "foto3.jpg"],
};

let currentAlbum = [];
let currentIndex = 0;

function initializeAlbums() {
  const albumElements = document.querySelectorAll(".album");
  const albumModal = document.getElementById("album-modal");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.getElementById("prev-photo");
  const nextBtn = document.getElementById("next-photo");

  if (albumElements && albumModal) {
    albumElements.forEach((album, index) => {
      album.onclick = function () {
        const albumKey = `album${index + 1}`;
        currentAlbum = albums[albumKey];
        currentIndex = 0;
        openModal();
        updatePhoto();
      };
    });

    if (closeBtn) {
      closeBtn.onclick = closeModal;
    }

    if (prevBtn) {
      prevBtn.onclick = function () {
        if (currentIndex > 0) {
          currentIndex--;
          updatePhoto();
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = function () {
        if (currentIndex < currentAlbum.length - 1) {
          currentIndex++;
          updatePhoto();
        }
      };
    }
  }
}

function openModal() {
  const modal = document.getElementById("album-modal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal() {
  const modal = document.getElementById("album-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

function updatePhoto() {
  const photo = document.getElementById("album-photo");
  if (photo && currentAlbum[currentIndex]) {
    photo.src = currentAlbum[currentIndex];
  }
}

// Initialize albums when DOM is ready
document.addEventListener("DOMContentLoaded", initializeAlbums);

function openTab(evt, tabId) {
  const tabcontent = document.getElementsByClassName("tab-content");
  const tablinks = document.getElementsByClassName("tab-link");
  const targetTab = document.getElementById(tabId);

  if (tabcontent && tablinks && targetTab) {
    // Hide all tabs
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
    }

    // Remove active class from all tab links
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show and activate the current tab
    targetTab.style.display = "block";
    targetTab.classList.add("active");
    evt.currentTarget.className += " active";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const popupOverlay = document.getElementById("popupOverlay");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  if (popupOverlay && popup && closePopup) {
    closePopup.onclick = function () {
      popupOverlay.style.display = "none";
    };

    popupOverlay.onclick = function (event) {
      if (event.target === popupOverlay) {
        popupOverlay.style.display = "none";
      }
    };
  }
});

// Função para normalizar texto
function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Função principal de busca
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");
  const feedback = document.getElementById("searchFeedback");
  const icons = document.querySelectorAll(".icon");
  let searchTimer;

  // Função de busca
  function doSearch() {
    const term = normalizeText(searchInput ? searchInput.value : "");
    let found = 0;

    // Procura em cada card
    icons.forEach((icon) => {
      const text = normalizeText(icon.textContent);
      const show = !term || text.includes(term);
      icon.style.display = show ? "" : "none";
      if (show) found++;
    });

    // Atualiza botão de limpar
    if (clearBtn) {
      clearBtn.style.display = term ? "" : "none";
    }

    // Atualiza feedback
    if (feedback) {
      const small = feedback.querySelector("small");
      if (small) {
        if (!found && term) {
          feedback.style.display = "";
          small.textContent = `Nenhum resultado encontrado para "${term}"`;
        } else if (found && term) {
          feedback.style.display = "";
          small.textContent = `${found} resultado${
            found !== 1 ? "s" : ""
          } encontrado${found !== 1 ? "s" : ""}`;
        } else {
          feedback.style.display = "none";
        }
      }
    }
  }

  // Configura eventos de busca
  if (searchInput) {
    searchInput.oninput = function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(doSearch, 300);
    };
  }

  // Configura botão de limpar
  if (clearBtn && searchInput) {
    clearBtn.onclick = function () {
      searchInput.value = "";
      doSearch();
      searchInput.focus();
    };
  }
}

// Função para configurar o menu hamburger
function setupHamburger() {
  const hamburger = document.querySelector(".hamburger-menu");
  const overlay = document.querySelector(".overlay-menu");

  if (hamburger && overlay) {
    hamburger.onclick = function () {
      this.classList.toggle("active");
      overlay.classList.toggle("active");
    };
  }
}

// Inicializa quando a página carregar
window.onload = function () {
  setupSearch();
  setupHamburger();
};
