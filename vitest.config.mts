import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
     test: {
          coverage: {
               reportsDirectory: "src/test/coverage/"
          }
     },
     resolve: {
          alias: {
               "@": path.resolve(__dirname, "./src"),
          },
     },
})