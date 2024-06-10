class Dashboard {

    goToDashboardModule() {
        cy.get('a[href*="#/administration/dashboard"]').click();
    }

}

export default Dashboard;