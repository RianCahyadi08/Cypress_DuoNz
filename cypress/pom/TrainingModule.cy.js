class TrainingModule {

    goToTrainingModule() {
        cy.get('a[href*="#/administration/trainingModule"]').click();
    }

    searchTrainingModule(value) {
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').type(value);
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').should('have.value', value);
        // cy.get('input[type="text"]').type(value);
    }

}

export default TrainingModule;