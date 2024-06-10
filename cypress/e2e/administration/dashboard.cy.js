import Authentication from "../../pom/authentication/Authentication.cy";
import Dashboard from "../../pom/Dashboard.cy";

describe("User do login", () => {

    const authenticationObject = new Authentication();
    const dashboardObject = new Dashboard();
    let baseUrl = Cypress.env('stage');

    beforeEach(() => {
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
    });

    it("Verify access dashboard module", () => {
        dashboardObject.goToDashboardModule();
    })
})