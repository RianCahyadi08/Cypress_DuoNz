import Authentication from "../../pom/authentication/Authentication.cy";
import Agency from "../../pom/Agency.cy";

describe("User access agency module", () => {

    const authenticationObject = new Authentication();
    const agencyObject = new Agency();
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

    it("Verify access agency module", () => {
        cy.intercept('GET', '/system/agency/list').as('getAgencyList');
        cy.intercept('GET', '/administrator/account/manager').as('getAccountManager');
        cy.intercept('GET', '/system/agency/group/list').as('getGroupList');
        agencyObject.goToAgencyModule();
        cy.wait(['@getAgencyList', '@getAccountManager', '@getGroupList']).then(([reqAgencyList, reqAccountManager, reqGroupList]) => {
            expect(reqAgencyList.response.statusCode).to.eq(200);
            expect(reqAccountManager.response.statusCode).to.eq(200);
            expect(reqGroupList.response.statusCode).to.eq(200);
        });
    })

    it("Verify search agency module", () => {
        cy.intercept('GET', '/system/agency/list').as('getAgencyList');
        cy.intercept('GET', '/administrator/account/manager').as('getAccountManager');
        cy.intercept('GET', '/system/agency/group/list').as('getGroupList');
        agencyObject.goToAgencyModule();
        cy.wait(['@getAgencyList', '@getAccountManager', '@getGroupList']).then(([reqAgencyList, reqAccountManager, reqGroupList]) => {
            expect(reqAgencyList.response.statusCode).to.eq(200);
            expect(reqAccountManager.response.statusCode).to.eq(200);
            expect(reqGroupList.response.statusCode).to.eq(200);
        });
        agencyObject.searchAgency("Duo123");
    })

    it.only("Verify export agency info report", () => {
        cy.intercept('GET', '/system/agency/list').as('getAgencyList');
        cy.intercept('GET', '/administrator/account/manager').as('getAccountManager');
        cy.intercept('GET', '/system/agency/group/list').as('getGroupList');
        agencyObject.goToAgencyModule();
        cy.wait(['@getAgencyList', '@getAccountManager', '@getGroupList']).then(([reqAgencyList, reqAccountManager, reqGroupList]) => {
            expect(reqAgencyList.response.statusCode).to.eq(200);
            expect(reqAccountManager.response.statusCode).to.eq(200);
            expect(reqGroupList.response.statusCode).to.eq(200);
        });
        agencyObject.exportAgencyInfoReport();
    })
})