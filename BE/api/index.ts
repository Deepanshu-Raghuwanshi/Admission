import serverlessExpress from "@vendia/serverless-express";
import app from "../src/server";

const handler = serverlessExpress({ app });

export default handler;
