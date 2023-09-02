import faker from 'faker';

export const fixedNews = [
  {
    id: '2de0306f-a712-4078-b1f0-b223c2f4246b',
    publicationDate: '2021-08-27T04:38:33.816Z',
    title: 'Our Vilnius office celebrates 1 year!',
    content:
      '🙌 The SaM Solutions office in #Vilnius celebrates a one-year anniversary.' +
      ' 🎉 Congratulations to our colleagues! Keep it up! More new victories and achievements ahead. 💪 #SaMSolutions',
    image: 'http://localhost:8080/assets/images/news1.jpg',
  },
];

const createNews = () => ({
  id: faker.datatype.uuid(),
  publicationDate: faker.date.between('2020-01-01', '2021-12-12'),
  title: faker.company.catchPhrase(),
  content: faker.lorem.paragraphs(3),
  image: faker.image.people(320, 320, true),
});

export const generateNews = (count) => {
  return Array.from({ length: count }, createNews);
};
