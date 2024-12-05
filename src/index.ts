import { buildServer } from "./server";

async function StartServer() {
     try {
          const server = await buildServer();

          await server.listen({
               port: 3031,
               host: "0.0.0.0"
          }).then(() => {
               console.log('Server Running!')
          })

     } catch (error) {
          console.error("Error ao iniciar o servidor:", error);
          process.exit(1);
     }
}

if (process.env.NODE_ENV !== 'test') {
     StartServer();
}

