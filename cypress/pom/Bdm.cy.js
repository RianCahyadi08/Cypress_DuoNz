class Bdm {
    goToBdmModule() {
        cy.get('a[href*="#/administration/bdm"]').click();
    }

    searchBdm(value) {
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').type(value);
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').should('have.value', value);
        cy.wait(500);
    }
}

export default Bdm;