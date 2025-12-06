const getCategoryStats = (courses) => {
  if (!Array.isArray(courses)) {
    throw new TypeError('Ожидается массив курсов');
  }

  const stats = new Map();

  courses.forEach((course) => {
    if (!course.category) return;

    const count = stats.get(course.category) || 0;
    stats.set(course.category, count + 1);
  });

  const result = { All: courses.length };
  stats.forEach((count, category) => {
    result[category] = count;
  });

  return result;
};

const filterByCategory = (courses, category) => {
  if (!Array.isArray(courses)) return [];
  if (category === 'All') return [...courses];

  return courses.filter((course) => course.category === category);
};

const searchCourses = (courses, query) => {
  if (!Array.isArray(courses)) return [];
  if (!query || query.trim() === '') return [...courses];

  const normalizedQuery = query.toLowerCase().trim();

  return courses.filter((course) => {
    /**
     * Вариант для поиска по авторам и категориям включительно!
     *  const title = course.title?.toLowerCase() || '';
     const author = course.author?.toLowerCase() || '';
     const category = course.category?.toLowerCase() || '';

     return (
       title.includes(normalizedQuery) ||
       author.includes(normalizedQuery) ||
       category.includes(normalizedQuery)
     );
     */

    const title = course.title?.toLowerCase();

    return title.includes(normalizedQuery);
  });
};

const applyFilters = (courses, category, searchQuery) => {
  if (!Array.isArray(courses)) return [];

  let filtered = filterByCategory(courses, category);
  filtered = searchCourses(filtered, searchQuery);

  return filtered;
};

const sortCoursesByPrice = (courses, direction = 'asc') => {
  if (!Array.isArray(courses)) return [];

  return [...courses].sort((a, b) => {
    return direction === 'asc' ? a.price - b.price : b.price - a.price;
  });
};

const paginateCourses = (courses, offset = 0, limit = 6) => {
  if (!Array.isArray(courses)) return [];

  return courses.slice(offset, offset + limit);
};

export {
  applyFilters,
  filterByCategory,
  getCategoryStats,
  paginateCourses,
  searchCourses,
  sortCoursesByPrice,
};
