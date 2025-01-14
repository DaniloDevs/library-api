import { env } from "../env";
import server from "./server";

// Iniciando o servidor
try {
     server.listen({
          port: env.PORT,
     }).then(() => {
          console.log(`[INFO] Server is running at http://localhost:${env.PORT}`)
     })
} catch (error) {
     console.error("Error ao iniciar o servidor:", error);
     process.exit(1);
}


