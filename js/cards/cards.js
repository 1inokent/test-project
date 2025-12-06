const getBadgeClass = (category) => {
  const badgeMap = {
    Marketing: 'marketing',
    Management: 'management',
    Design: 'design',
    Development: 'development',
    'HR & Recruiting': 'hr',
  };

  return badgeMap[category] || 'marketing';
};

const createCardElement = (course) => {
  const { id, title, category, author, price, avatar } = course;

  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.category = category;
  card.dataset.id = id;

  const badgeClass = getBadgeClass(category);

  card.innerHTML = `
      <div class="card__image-wrapper">
        <img src="${avatar}" alt="${title}" class="card__image" />
      </div>
      <div class="card__content">
        <span class="card__badge card__badge--${badgeClass}">${category}</span>
        <h3 class="card__title">${title}</h3>
        <div class="card__meta">
          <span class="card__price">$${price}</span>
          <span class="card__author">by ${author}</span>
        </div>
      </div>
    `;

  return card;
};

const renderCards = (courses, container, append = false) => {
  if (!append) {
    container.innerHTML = '';
  }

  const fragment = document.createDocumentFragment();

  courses.forEach((course) => {
    const cardElement = createCardElement(course);
    fragment.appendChild(cardElement);
  });

  container.appendChild(fragment);
};

export { renderCards };
