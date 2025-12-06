import { getCategoryStats } from '../utils.js';

const filterButtons = document.querySelectorAll('.filter__button');

const initFilters = (courses, onFilterChange) => {
  updateFilterCounts(courses);

  filterButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;

      setActiveFilter(category);

      if (onFilterChange) {
        onFilterChange(category);
      }
    });
  });
};

const setActiveFilter = (category) => {
  filterButtons.forEach((button) => {
    if (button.dataset.category === category) {
      button.classList.add('filter__button--active');
    } else {
      button.classList.remove('filter__button--active');
    }
  });
};

const updateFilterCounts = (courses) => {
  const stats = getCategoryStats(courses);

  filterButtons.forEach((button) => {
    const category = button.dataset.category;
    const count = stats[category] || 0;
    const sup = button.querySelector('sup');

    if (sup) {
      sup.textContent = count;
    }
  });
};

export { initFilters };
