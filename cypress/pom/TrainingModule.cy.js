class TrainingModule {

    goToTrainingModule() {
        cy.get('a[href*="#/administration/trainingModule"]').click();
    }

    searchTrainingModule(value) {
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').type(value);
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').should('have.value', value);
        // cy.get('input[type="text"]').type(value);
    }

    createTrainingModule(nameDescrtiption, descriptionTraining) {
        cy.get('button[class*="v-btn v-btn--is-elevated v-btn--fab v-btn--has-bg v-btn--round theme--dark v-size--small secondary"]').click();
        cy.get('div[class*="v-dialog v-dialog--active"]').should('have.visible');
        cy.get('input[type="text"]').eq(2).type(nameDescrtiption);
        cy.get('textarea[rows="3"]').clear().type(descriptionTraining);
        cy.get('input[type="checkbox"]').click({force: true});
        cy.get('button[class*="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"]').click()
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
    }

    updateTrainingModule(nameTraining, descriptionTraining) {
        cy.get('tbody').find('tr > td').then((element) => {
            const itemCount = element.length;
            cy.log(itemCount)
            if (itemCount > 1) {
                cy.get('button[class*="v-icon notranslate ml-2 v-icon--link mdi mdi-pencil theme--light"]').click();
                cy.get('div[class*="v-dialog v-dialog--active"]').should('have.visible');
                cy.get('input[type="text"]').eq(2).clear().type(nameTraining);
                cy.get('textarea[rows="3"]').clear().type(descriptionTraining);
                cy.get('input[type="checkbox"]').click({force: true});
                cy.get('button[class*="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"]').click();
            } else {
                cy.log('tidak ada')
            }
        });
    }

}

export default TrainingModule;