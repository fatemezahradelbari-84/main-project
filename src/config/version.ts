type Engine = "mongo" | "mysql";

export const config = {
  engine: (process.env.DB_ENGINE as Engine) || "mongo"
};

export function isMongo(): boolean {
  return config.engine === "mongo";
}

export function isMySql(): boolean {
  return config.engine === "mysql";
}