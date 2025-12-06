import { fetchAllCourses } from './api.js';
import { renderCards } from './cards/cards.js';
import { initFilters } from './filter/filter.js';
import { initSearch } from './search/search.js';
import { applyFilters, paginateCourses } from './utils.js';

const LIMIT = 6;
const TIME_CLEAR = 5000;

const state = {
  allCourses: [],
  filteredCourses: [],
  displayedCourses: [],
  currentFilter: 'All',
  searchQuery: '',
  offset: 0,
  isLoading: false,
};

const coursesList = document.querySelector('.courses__list');
const loadMoreBtn = document.querySelector('.courses__load-more');
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

async function init() {
  try {
    showLoadingState();

    const result = await fetchAllCourses();

    if (!result.success) {
      throw new Error('Ошибка загрузки курсов');
    }

    state.allCourses = result.data;
    state.filteredCourses = result.data;
    state.displayedCourses = paginateCourses(result.data, 0, LIMIT);
    state.offset = LIMIT;
    state.isLoading = false;

    hideLoadingState();
    renderCards(state.displayedCourses, coursesList);
    updateLoadMoreButton();

    initFilters(state.allCourses, handleFilterChange);
    initSearch(handleSearchChange);
    setupLoadMoreButton();
  } catch (error) {
    state.isLoading = false;
    hideLoadingState();
    showError(error.message);
  }
}

function setupLoadMoreButton() {
  loadMoreBtn.addEventListener('click', handleLoadMore);
}

function handleFilterChange(category) {
  state.currentFilter = category;
  state.offset = LIMIT;
  applyFiltersAndRender();
}

function handleSearchChange(query) {
  state.searchQuery = query;
  state.offset = LIMIT;
  applyFiltersAndRender();
}

async function handleLoadMore() {
  if (state.isLoading) return;

  state.isLoading = true;
  loadMoreBtn.disabled = true;

  const originalText = loadMoreBtn.innerHTML;
  loadMoreBtn.innerHTML = '<img src="images/svg/Vector.svg" alt="" /> Loading...';

  await new Promise((resolve) => setTimeout(resolve, 600));

  const newCourses = paginateCourses(state.filteredCourses, state.offset, LIMIT);
  state.displayedCourses = [...state.displayedCourses, ...newCourses];
  state.offset += LIMIT;

  renderCards(state.displayedCourses, coursesList);
  updateLoadMoreButton();

  state.isLoading = false;
  loadMoreBtn.disabled = false;
  loadMoreBtn.innerHTML = originalText;
}

function applyFiltersAndRender() {
  state.filteredCourses = applyFilters(state.allCourses, state.currentFilter, state.searchQuery);

  state.displayedCourses = paginateCourses(state.filteredCourses, 0, state.offset);

  renderCards(state.displayedCourses, coursesList);
  updateLoadMoreButton();

  if (state.filteredCourses.length === 0) {
    showNoResultsMessage();
  } else {
    hideNoResultsMessage();
  }
}

function updateLoadMoreButton() {
  if (state.offset >= state.filteredCourses.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'flex';
  }
}

function showNoResultsMessage() {
  const existingMessage = document.querySelector('.no-results');

  if (!existingMessage) {
    const message = document.createElement('div');
    message.className = 'no-results';
    message.innerHTML = `
      <p>😕 Нет курсов</p>
      <p style="font-size: 14px; color: #777; margin-top: 8px;">
        Попробуйте изменить фильтры или поисковый запрос
      </p>
    `;
    coursesList.parentElement.insertBefore(message, loadMoreBtn);
  }
}

function hideNoResultsMessage() {
  const message = document.querySelector('.no-results');
  if (message) {
    message.remove();
  }
}

function showLoadingState() {
  state.isLoading = true;
  loadMoreBtn.style.display = 'none';
  coursesList.innerHTML = '<div class="loading">Загрузка курсов</div>';
}

function hideLoadingState() {
  state.isLoading = false;
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.remove();
  }
}

function showError(message = 'Не удалось загрузить данные') {
  const errorClone = errorTemplate.cloneNode(true);
  const errorTitle = errorClone.querySelector('.data-error__title');

  if (errorTitle) {
    errorTitle.textContent = message;
  }

  document.body.appendChild(errorClone);

  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    if (errorElement) {
      errorElement.remove();
    }
  }, TIME_CLEAR);
}

init();
