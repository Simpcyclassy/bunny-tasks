import "module-alias/register";
import "reflect-metadata";
import bodyparser from "body-parser";
import responseTime from "response-time";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
import mongoose, { Connection } from "mongoose";
import { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { defaultMongoOpts, secureMongoOpts } from "../data/database";
import container from "../common/config/ioc";

dotenv.config();

export class App {
  db: Connection;
  private server: InversifyExpressServer;
  constructor() {
    this.server = new InversifyExpressServer(container, null, {
      rootPath: process.env.API_VERSION
    });

    // setup server-level middlewares
    this.server.setConfig((app: Application) => {
      app.enabled("x-powered-by");

      app.use(responseTime());
      app.use(bodyparser.urlencoded({ extended: true }));
      app.use(bodyparser.json());

      app.use(cors());
      app.options("*", cors());
    });

    this.server.setErrorConfig((app: Application) => {
      // expose index endpoint
      app.get("/", (_req: Request, res: Response) => {
        
        if (mongoose.connections.every(conn => conn.readyState !== 1)) {
          return res.status(500).send("MongoDB is not ready");
        }

        res.status(200).json({
          status: "success",
          data: { message: "Welcome To Todo Service" }
        });
      });

      // this is a handler for non existing routes
      app.use((_req, res, _next) => {
        res.status(404).json({
          status: "error",
          data: { message: "Not Found" }
        });
      });

      // handle errors and edge cases
      app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            data: err.message
          });
        }
        return next();
      });
    });
  }

  printRoutes() {
    const routeInfo = getRouteInfo(container);
    console.log(JSON.stringify(routeInfo));
  }

  getServer = () => this.server;

  async connectDB() {
    await mongoose.connect(process.env.MONGODB_URL, {
      ...(process.env.is_production ? secureMongoOpts : defaultMongoOpts)
    });
    this.db = mongoose.connection;
  }

  /**
   * Closes MongoDB connection
   */
  async closeDB() {
    await mongoose.disconnect();
  }
}
