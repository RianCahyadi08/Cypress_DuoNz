import Authentication from "../../pom/authentication/Authentication.cy";
import AgentInfo from "../../pom/AgentInfo.cy";

describe("User access agent info module", () => {
    
    const path = require("path");
    const downloadsFolder = Cypress.config("downloads");
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const filename = `duo-bdm-agent-list-states${year}-${month}-${day}`;
    const authenticationObject = new Authentication();
    const agentInfoObject = new AgentInfo();
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

    it("Verify access agent info module", () => {
        cy.intercept('GET', '/system/person/info/list').as('getAgentInfo');
        agentInfoObject.goToAgentInfoModule();
        cy.wait('@getAgentInfo').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
    });

    it("Verify search agent info", () => {
        cy.intercept('GET', '/system/person/info/list').as('getAgentInfo');
        agentInfoObject.goToAgentInfoModule();
        cy.wait('@getAgentInfo').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        agentInfoObject.searchAgentInfo("Test agent info");
    });

    it("Verify export agent info report", () => {
        cy.intercept('GET', '/system/person/info/list').as('getAgentInfo');
        agentInfoObject.goToAgentInfoModule();
        cy.wait('@getAgentInfo').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        agentInfoObject.exportAgentInfoReport();
        // cy.readFile(`${downloadsFolder}/${filename}`);
        cy.readFile(path.join(downloadsFolder, filename)).should('exist');
    });
})