class AgentInfo {

    goToAgentInfoModule() {
        cy.get('a[href*="#/administration/agent/info"]').click();
    }

    searchAgentInfo(value) {
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').type(value);
        cy.get('div[class*="v-text-field__slot"] > input[type="text"]').should('have.value', value);
        cy.wait(500);
    }

    exportAgentInfoReport() {
        cy.get('button[class*="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"]').click();
    }
}

export default AgentInfo;