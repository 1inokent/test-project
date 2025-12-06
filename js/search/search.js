const searchInput = document.querySelector('.search__input');
const searchIcon = document.querySelector('.search__icon');

const initSearch = (onSearchChange, debounceTime = 600) => {
  if (!searchInput || !searchIcon) {
    console.error('Search input not found');
    return;
  }

  let timeoutId = null;
  let isClearMode = false;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(query);
      }
    }, debounceTime);
  });
};

const clearSearch = () => {
  if (searchInput) {
    searchInput.value = '';
  }
};

export { clearSearch, initSearch };
