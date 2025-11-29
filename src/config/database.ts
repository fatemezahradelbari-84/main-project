import { versionConfig } from "./version";
import { connectMongo } from "./mongo";
import { connectMySql } from "./mySql";

export const connectDatabase = async () => {
  const engine = versionConfig.getDbEngine();

  if (engine === "mongo") {
    await connectMongo();
  } else if (engine === "mysql") {
    await connectMySql();
  } else {
    throw new Error("Unknown database engine");
  }
};
