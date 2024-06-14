import Authentication from "../../pom/authentication/Authentication.cy";
import TrainingModule from "../../pom/TrainingModule.cy";

describe("User access training module", () => {

    const authenticationObject = new Authentication();
    const trainingModuleObject = new TrainingModule();
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

    it("Verify access training module", () => {
        cy.intercept('GET', '/api/trainingModule/list').as('getTrainingModule');
        trainingModuleObject.goToTrainingModule();
        cy.wait('@getTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
    })

    it("Verify search training module", () => {
        cy.intercept('GET', '/api/trainingModule/list').as('getTrainingModule');
        trainingModuleObject.goToTrainingModule();
        cy.wait('@getTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        trainingModuleObject.searchTrainingModule("Test training module");
    });

    it("Verify create training module", () => {
        cy.intercept('GET', '/api/trainingModule/list').as('getTrainingModule');
        cy.intercept('POST', '/api/trainingModule/add').as('postCreateTrainingModule');
        trainingModuleObject.goToTrainingModule();
        cy.wait('@getTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        trainingModuleObject.createTrainingModule('test module rian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
        cy.wait('@postCreateTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
    });

    it("Verify update training module", () => {
        cy.intercept('GET', '/api/trainingModule/list').as('getTrainingModule');
        cy.intercept('POST', '/api/trainingModule/edit').as('updateTrainingModule')
        trainingModuleObject.goToTrainingModule();
        cy.wait('@getTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        trainingModuleObject.searchTrainingModule("test module rian");
        trainingModuleObject.updateTrainingModule("update training module", "lorem ipsum dolor sit amet, consectetur adipiscing elit");
        cy.wait('@updateTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
    });

    it("Verify delete training module", () => {
        cy.intercept('GET', '/api/trainingModule/list').as('getTrainingModule');
        cy.intercept('POST', '/api/trainingModule/delete').as('postDeleteTrainingModule')
        trainingModuleObject.goToTrainingModule();
        cy.wait('@getTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
        trainingModuleObject.searchTrainingModule("update training module");
        trainingModuleObject.deleteTrainingModule();
        cy.wait('@postDeleteTrainingModule').then((req) => {
            expect(req.response.statusCode).to.eq(200);
        });
    });

    
})