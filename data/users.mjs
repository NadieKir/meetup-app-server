import faker from "faker";

export const fixedUsers = [
  {
    id: "uuu-aaa",
    name: "employee",
    password: "private",
    surname: "Gerlach",
    post: "Developer",
    roles: "EMPLOYEE",
  },
  {
    id: "uuu-bbb",
    name: "chief",
    password: "private",
    surname: "Blick",
    post: "Chief developer",
    roles: "CHIEF",
  },
];
const generateUser = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    password: "private",
    surname: faker.name.lastName(),
    post: faker.name.jobTitle(),
    roles: faker.random.arrayElement(["EMPLOYEE", "CHIEF"]),
  };
};

export const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateUser());
  }
  return users;
};

export const getRandomUser = (users) =>
  users[faker.datatype.number(0, users.length)];
