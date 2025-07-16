import { describe, beforeAll, test, expect } from 'bun:test';
import { DataBase } from "../src/index";

describe("DataBase", () => {
  const commonConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "test_db",
  };

  describe("MySQL", () => {
    let dbInstance: DataBase;

    beforeAll(() => {
      dbInstance = new DataBase({
        db: "mysql",
        connection: {
          ...commonConfig,
          port: 3306,
        },
        pool: { min: 1, max: 5 },
        acquireConnectionTimeout: 5000,
      });
    });

    test("should initialize with correct config", () => {
      expect(dbInstance.db).toBe("mysql");
      expect(dbInstance.client).toBeNull();
    });

    test("should connect to MySQL", async () => {
      await dbInstance.connect();
      const client = dbInstance.client;
      expect(client).not.toBeNull();
      expect(client).toBeInstanceOf(Object);
    }, 10_000);
  });

  describe("PostgreSQL", () => {
    let dbInstance: DataBase;

    beforeAll(() => {
      dbInstance = new DataBase({
        db: "pg",
        connection: {
          ...commonConfig,
          port: 5432,
        },
        pool: { min: 1, max: 5 },
      });
    });

    test("should initialize with correct config", () => {
      expect(dbInstance.db).toBe("pg");
      expect(dbInstance.client).toBeNull();
    });

    test("should connect to PostgreSQL", async () => {
      await dbInstance.connect();
      const client = dbInstance.client;
      expect(client).not.toBeNull();
      expect(client).toBeInstanceOf(Object);
    }, 10_000);
  });

  describe("MongoDB", () => {
    let dbInstance: DataBase;

    beforeAll(() => {
      dbInstance = new DataBase({
        db: "mongodb",
        connection: {
          ...commonConfig,
          port: 27017,
          database: "myapp_test",
        },
      });
    });

    test("should initialize with correct config", () => {
      expect(dbInstance.db).toBe("mongodb");
      expect(dbInstance.client).toBeNull();
    });

    test("should connect to MongoDB", async () => {
      await dbInstance.connect();
      const client = dbInstance.client;
      expect(client).not.toBeNull();
      expect(client).toHaveProperty("readyState"); // mongoose.Connection has readyState
    }, 10_000);
  });

  describe("Unsupported Database", () => {
    test("should throw error for unsupported database type", () => {
      expect(
        () =>
          new DataBase({
            db: "oracle" as any,
            connection: {
              host: "localhost",
              port: 1234,
              database: "unsupported",
            },
          })
      ).toThrow("Unsupported database type: oracle");
    });
  });
});