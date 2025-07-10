import { createConnection } from "mongoose";
import { knex } from "knex";
import type { Knex } from "knex";
import type { Connection } from "mongoose";

interface DataBaseOptions {
  db: string;
  connection: {
    host: string;
    port: number;
    user?: string;
    password?: string;
    database: string;
  }
}

type DataBaseClient = Knex | Connection | null;

/**
 * Connect to a database(MySQL, PostgreSQL, MongoDB)
 * @example
 * ```ts
 * const db = new DataBase({
 *  db: "mongodb",
 *  connection: {
 *     host: "localhost",
 *     user: "root",
 *     password: "password",
 *     port: 3306,
 *     database: "database"
 *  }
 * })
 * 
 * await db.connect();
 * ```
 */
export class DataBase {
  private _db: 'mongodb' | 'mysql' | 'pg';
  private _client: DataBaseClient = null;
  private _config: DataBaseOptions;

  constructor(options: DataBaseOptions) {
    const { db } = options;
    this._config = {
      db,
      connection: options?.connection
    };

    this._db = db as 'mongodb' | 'mysql' | 'pg';
  }

  /**
   * Connect to the database
   */
  public connect() {
    switch (this._db) {
      case 'mysql':
        this._client = knex({
          client: 'mysql2',
          connection: {
            host: this._config.connection.host,
            port: this._config.connection.port,
            user: this._config.connection.user,
            password: this._config.connection.password,
            database: this._config.connection.database,
          },
        });
        console.log('Connected to MySQL');
        break;

      case 'pg':
        this._client = knex({
          client: 'pg',
          connection: {
            host: this._config.connection.host,
            port: this._config.connection.port,
            user: this._config.connection.user,
            password: this._config.connection.password,
            database: this._config.connection.database,
          },
        });
        console.log('Connected to PostgreSQL');
        break;

      case 'mongodb':
        const uri = `mongodb://${this._config.connection.host}:${this._config.connection.port}/${this._config.connection.database}`;
        try {
          const connection = createConnection(uri);
          this._client = connection;
          console.log("Connected to MongoDB");
        } catch (error) {
          console.error("Failed to connect to MongoDB", error);
          throw error;
        }
        break;

      default:
        throw new Error(`Unsupported database type: ${this._db}`);
    }
  }

  get db() {
    return this._db;
  }

  get client(): DataBaseClient {
    return this._client;
  }
}