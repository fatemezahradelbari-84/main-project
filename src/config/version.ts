type Engine = "mongo" | "mysql";

export const DatabaseType = {
  // فقط نوع دیتابیس از ENV گرفته می‌شود
  typeDatabase: (process.env.TYPE_DATABASE as Engine) || "mongo",

  getDbEngine(): Engine {
    return this.typeDatabase;
  }
};
