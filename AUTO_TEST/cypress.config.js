const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    retries: 2,
    projectId: "ec9o8q",

    env: {
      baseApiUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
      username: "Admin",
      password: "admin123"
    },

    video: true,
    watchForFileChanges: true,

    setupNodeEvents(on, config) {

    },
  },
});
