const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    stage: 'https://duo-nz-stage.pontoonx.io/#/administration'
  }
});
