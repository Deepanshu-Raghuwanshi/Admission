import serverlessExpress from "@vendia/serverless-express";
import app from "../src/server";

export const handler = serverlessExpress({ app });
