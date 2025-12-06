const mockCourses = Array.from({ length: 15 }, (_, index) => {
  const id = index + 1;
  const avatarIndex = (index % 9) + 1;

  return {
    id,
    title: [
      'The Ultimate Google Ads Training Course',
      'Product Management Fundamentals',
      'HR Management and Analytics',
      'Brand Management & PR Communications',
      'Graphic Design Basic',
      'Business Development Management',
      'Highload Software Architecture',
      'Human Resources – Selection & Recruitment',
      'User Experience. Human-centered Design',
    ][index % 9],

    category: [
      'Marketing',
      'Management',
      'HR & Recruiting',
      'Marketing',
      'Design',
      'Management',
      'Development',
      'HR & Recruiting',
      'Design',
    ][index % 9],

    author: [
      'Jerome Bell',
      'Marvin McKinney',
      'Leslie Alexander Li',
      'Kristin Watson',
      'Guy Hawkins',
      'Dianne Russell',
      'Brooklyn Simmons',
      'Kathryn Murphy',
      'Cody Fisher',
    ][index % 9],

    price: [100, 480, 200, 530, 500, 400, 600, 150, 240][index % 9],

    avatar: `./images/avatar-${avatarIndex}.jpg`,
  };
});

export function fetchCourses(limit = 6, offset = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses.slice(offset, offset + limit));
    }, 600);
  });
}
