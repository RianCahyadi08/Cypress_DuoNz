import Authentication from "../../pom/authentication/Authentication.cy";
import Bdm from "../../pom/Bdm.cy";
import Dashboard from "../../pom/Dashboard.cy";

describe("User access bdm module", () => {

    const authenticationObject = new Authentication();
    const dashboardObject = new Dashboard();
    const bdmObject = new Bdm();
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

    it("Verify access bdm module", () => {
        cy.intercept('GET', '/system/common/admin/list').as('getBdm');
        bdmObject.goToBdmModule();
        cy.wait('@getBdm').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
    });

    it("Verify search bdm", () => {
        cy.intercept('GET', '/system/common/admin/list').as('getBdm');
        bdmObject.goToBdmModule();
        cy.wait('@getBdm').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        bdmObject.searchBdm('test');
    });
})