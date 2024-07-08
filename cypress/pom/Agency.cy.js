class Agency {

    goToAgencyModule() {
        cy.get('a[href*="#/administration/agency"]').click();
    }

    searchAgency(value) {
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').type(value);
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').should('have.value', value);
        cy.wait(500);
        cy.get('tbody').find('tr').then((element) => {
            const itemCount = element.length;
            cy.log(itemCount)
            if (itemCount > 1) {
                cy.get('tr > td[class*="text-start"]').should('have.visible', true);
            } else {
                cy.log('tidak ada')
            }
        });
    }

    exportAgencyInfoReport() {
        cy.get('button[class*="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"]').click();
    }

    detailAgency() {
        cy.get('button[class*="v-icon notranslate v-icon--link mdi mdi-account-group-outline theme--light"]').eq(0).click();
    }
}

export default Agency;