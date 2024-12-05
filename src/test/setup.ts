import { FastifyInstance } from "fastify";
import { beforeAll, afterAll } from 'vitest';
import { buildServer } from "../server";

export function setupTestServer() {
     let server: FastifyInstance;

     beforeAll(async () => {
          server = await buildServer();
          await server.ready();
     });

     afterAll(async () => {
          await server.close();
     });

     return {
          getServer: () => server,
     };
}