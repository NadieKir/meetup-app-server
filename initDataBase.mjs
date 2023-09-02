import { JSONFile, Low } from "lowdb";
import { generateInitialData } from "./generateInitialData.mjs";

export const initDataBase = async () => {
  const adapter = new JSONFile("db.json");
  const db = new Low(adapter);
  await db.read();
  if (!db.data) {
    db.data = generateInitialData();
    await db.write();
  }

  return db;
};
