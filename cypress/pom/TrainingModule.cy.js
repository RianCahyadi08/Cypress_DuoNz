class TrainingModule {

    goToTrainingModule() {
        cy.get('a[href*="#/administration/trainingModule"]').click();
    }

    searchTrainingModule(value) {
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').type(value);
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').should('have.value', value);
        // cy.get('input[type="text"]').type(value);
    }

    deleteTrainingModule() {
        cy.get('tbody').find('tr > td').then((element) => {
            const itemCount = element.length;
            cy.log(itemCount)
            if (itemCount > 1) {
                cy.get('button[class*="v-icon notranslate ml-2 v-icon--link mdi mdi-delete theme--light"]').click();
                cy.get('div[class*="v-dialog v-dialog--active"]').should('have.visible')
                cy.get('button[class*="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default accent"]').click()
            } else {
                cy.log('tidak ada')
            }
        });
        // if (cy.get('td[colspan="5"]').contains('No matching records found')) {
        //     cy.log('Not found record')
        // } else if (cy.get('tr[class*="text-start"')) {
        //     cy.get('button[class*="v-icon notranslate ml-2 v-icon--link mdi mdi-delete theme--light"]').click();
        //     cy.get('div[class*="v-dialog v-dialog--active"]').should('have.visible')
        // }
    }

}

export default TrainingModule;