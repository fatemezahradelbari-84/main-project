type DBVersion = 1 | 2;
type Engine = "mongo" | "mysql";

export const versionConfig = {
  currentVersion: 1 as DBVersion,

  dbByVersion: {
    1: "mongo",
    2: "mysql"
  } as Record<DBVersion, Engine>,

  getDbEngine(): Engine {
    return this.dbByVersion[this.currentVersion];
  }
};
