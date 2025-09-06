const app = require("./app");
const { runMigrations } = require("./src/migrations/runner");

const PORT = process.env.PORT;

// Run migrations before starting server
runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
