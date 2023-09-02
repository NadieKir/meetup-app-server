import faker from "faker";
import {fixedUsers, getRandomUser} from "./users.mjs";

const convertToShortUser = (user) => {
  const { id, name, surname } = user;

  return { id, name, surname };
}
const getShortUser = (users) => {
  return convertToShortUser( getRandomUser(users) );
};

export const fixedMeetups = [
  {
    id: "aaa-aaa-aaa-aaa",
    modified: "2021-08-27T04:38:33.816Z",
    start: "2022-06-09T23:35:47.068Z",
    finish: "2022-06-10T02:51:47.068Z",
    author: convertToShortUser(fixedUsers[0]),
    speakers: [
      convertToShortUser(fixedUsers[0])
    ],
    subject: "Reverse-engineered even-keeled standardization",
    excerpt:
      "Nemo pariatur dolores ut vero velit non. Quidem temporibus quod nihil amet recusandae atque provident voluptatum iste. Aut architecto cum sit rerum aliquam maxime. Ratione voluptate optio id molestias quia quidem ipsam. Eius voluptatem quia dolores enim assumenda. Consequuntur cupiditate error earum hic est numquam vero.",
    place: "630 Goyette Causeway",
    status: "CONFIRMED",
    meta: {}
  },
];

const generateTopic = (users) => {
  return {
    id: faker.datatype.uuid(),
    modified: faker.date.past(),
    author: getShortUser(users),
    subject: faker.company.catchPhrase(),
    excerpt: faker.lorem.paragraph(),
    status: faker.random.arrayElement(["DRAFT", "REQUEST"]),
    meta: {}
  };
};

const generateMeetup = (users) => {
  const start = faker.date.between('2023-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');
  
  let finish = new Date(start);
  finish.setHours(finish.getHours() + Math.random() * (24 - start.getHours()) + 1);
  finish = finish.toISOString();

  return {
    id: faker.datatype.uuid(),
    modified: faker.date.past(1, start),
    start,
    finish,
    author: getShortUser(users),
    speakers: [getShortUser(users)],
    subject: faker.company.catchPhrase(),
    excerpt: faker.lorem.paragraph(),
    place: faker.address.streetAddress(),
    status: "CONFIRMED",
    meta: {}
  };
};

export const generateTopics = (count, users) => {
  return Array.from({ length: count }, () => generateTopic(users));
};

export const generateMeetups = (count, users) => {
  return Array.from({ length: count }, () => generateMeetup(users));
};

export const generateShortUsers = (meetups, users) => {
  const shortUsers = meetups.reduce((res, meetup) => {
    res[meetup.id] = users
      // ~30% chance that the user will be added
      .filter(() => Math.random() > 0.7)
      .map(u => ({ id: u.id, name: u.name, surname: u.surname }));

    return res;
  }, {});

  return shortUsers;
};
