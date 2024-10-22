import { prismaInstance } from "./prismaInstance";

export const dbConfig = async () => {
  try {
    await prismaInstance.$connect();
  } catch (error) {
    console.log(`Something went wrong. Please try again ${error}`);
  } finally {
    await prismaInstance.$disconnect();
  }
};
