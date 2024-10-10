import { defineConfig } from 'vitest/config'

export default defineConfig({
     test: {
          coverage: {
               reportsDirectory: "src/test/coverage/"
          }
     },
})