const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    // retries: 2,
    projectId: "29pw5w",

    env: {
      baseApiUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
      username: "Admin",
      password: "admin123"
    },

    video: true,
    watchForFileChanges: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
