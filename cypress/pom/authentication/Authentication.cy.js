class Authentication {

    openApp(env) {
        cy.visit('https://duo-nz-stage.pontoonx.io/#/administration');
        cy.get('div[class*="v-card__title d-flex justify-center align-center"').should('have.visible');  
    }

    setEmail(value) {
        cy.get('input[type="text"]').type(value);
        cy.get('input[type="text"]').should('have.value', value);
    }

    setPassword(value) {
        cy.get('input[type="password"]').type(value);
        cy.get('input[type="password"]').should('have.value', value);
    }

    clickBtnLogin() {
        cy.get('button[class*="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"]').click();
    }
}

export default Authentication;