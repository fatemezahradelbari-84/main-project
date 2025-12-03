type Engine = "mongo" | "mysql";

export const config = {
  engine: (process.env.DB_ENGINE as Engine) || "mongo",
};

export const DatabaseType = {
  typeDatabase: (process.env.TYPE_DATABASE as Engine) || "mongo",

  getDbEngine(): Engine {
    return this.typeDatabase;
  }
};

export function isMongo(): boolean {
  return config.engine === "mongo";
}

export function isMySql(): boolean {
  return config.engine === "mysql";
}
