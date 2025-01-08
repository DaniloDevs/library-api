import server from "./server";

// Iniciando o servidor
try {
     server.listen({
          port: 3031,
          host: "0.0.0.0"
     }).then(() => {
          console.log('Server Running!')
     })

} catch (error) {
     console.error("Error ao iniciar o servidor:", error);
     process.exit(1);
}


