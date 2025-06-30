// Mapeamento de categorias e seus conteúdos
const categoryContent = {
  lugar: [
    "Lugar",
    "Conceito de Lugar",
    "O lugar na geografia",
    "Espaço Geográfico e Lugar",
    "Material Didático - Lugar",
    "Textos sobre lugar",
    "PDFs sobre lugar",
    "Slides sobre lugar",
    "Vídeos sobre lugar",
    "Fotos de lugares",
  ],
  paisagem: [
    "Paisagem",
    "Conceito de Paisagem",
    "A paisagem na geografia",
    "Paisagens naturais",
    "Paisagens culturais",
    "Textos sobre paisagem",
    "PDFs sobre paisagem",
    "Slides sobre paisagem",
    "Vídeos sobre paisagem",
    "Fotos de paisagens",
  ],
  territorio: [
    "Território",
    "Conceito de Território",
    "O território na geografia",
    "Territorialidade",
    "Textos sobre território",
    "PDFs sobre território",
    "Slides sobre território",
    "Vídeos sobre território",
    "Fotos de territórios",
  ],
  regiao: [
    "Região",
    "Conceito de Região",
    "A região na geografia",
    "Regionalização",
    "Textos sobre região",
    "PDFs sobre região",
    "Slides sobre região",
    "Vídeos sobre região",
    "Fotos de regiões",
  ],
};

// Função para normalizar texto
function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Função para buscar conteúdo
function searchContent() {
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const searchFeedback = document.getElementById("searchFeedback");

  if (!searchInput || !clearSearch || !searchFeedback) return;

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const mainContent = document.querySelector("main");

    if (!mainContent) return;

    // Busca em todos os cards (ícones)
    const allIcons = mainContent.querySelectorAll(".icon");
    let visibleCount = 0;

    allIcons.forEach((icon) => {
      const text = icon.textContent.toLowerCase();
      const isSubcategory = icon.classList.contains("subcategory");

      // Se for um card de subcategoria, só mostra se o termo de busca corresponder
      if (isSubcategory) {
        const shouldShow = text.includes(searchTerm);
        icon.style.display = shouldShow ? "" : "none";
        if (shouldShow) visibleCount++;
      } else {
        // Para outros cards, comportamento normal
        const shouldShow = text.includes(searchTerm);
        icon.style.display = shouldShow ? "" : "none";
        if (shouldShow) visibleCount++;
      }
    });

    // Atualiza o feedback da busca
    clearSearch.classList.toggle("d-none", !searchTerm);
    searchFeedback.classList.toggle("d-none", !searchTerm);

    if (searchTerm) {
      const feedbackText =
        visibleCount === 0
          ? "Nenhum resultado encontrado"
          : `${visibleCount} resultado${
              visibleCount !== 1 ? "s" : ""
            } encontrado${visibleCount !== 1 ? "s" : ""}`;
      searchFeedback.querySelector("small").textContent = feedbackText;
    } else {
      // Quando não há termo de busca, esconde as subcategorias
      mainContent.querySelectorAll(".subcategory").forEach((icon) => {
        icon.style.display = "none";
      });
    }
  }

  // Limpar busca
  clearSearch.onclick = function () {
    searchInput.value = "";
    performSearch();
    searchInput.focus();
  };

  // Debounce para a busca
  let debounceTimer;
  searchInput.oninput = function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 300);
  };
}

// Inicializa a busca quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", searchContent);
