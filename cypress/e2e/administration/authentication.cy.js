import Authentication from "../../pom/authentication/Authentication.cy";

describe("User do login", () => {

    const authenticationObject = new Authentication();
    let baseUrl = Cypress.env('stage');

    it("Verify feature login", () => {
        cy.intercept('POST', '/api/authentication/login').as('postAuthentication');
        authenticationObject.openApp(baseUrl);
        cy.fixture('stage_admin_login').then((user) => {
            authenticationObject.setEmail(user.email);
            authenticationObject.setPassword(user.password);
            authenticationObject.clickBtnLogin();
            cy.wait('@postAuthentication').then((req) => {
                expect(req.response.statusCode).to.eq(200);
            });
        })
    })
})