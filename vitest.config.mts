import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
     test: {
          coverage: {
               reportsDirectory: "test/coverage/"
          }
     },
     resolve: {
          alias: {
               "@": path.resolve(__dirname, "./src"),
          },
     },
})