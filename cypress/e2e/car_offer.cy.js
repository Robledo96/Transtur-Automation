describe('E2E trtastur', () => {
    beforeEach(function () {
        const suite = cy.state('test').parent
        if (suite.tests.some(test => test.state === 'failed')) {
            this.skip()
        }
    })

    //Page 1
    it('Visit', () => {
        cy.visit('/', { timeout: 90000 })
    })

    it('Car offer', () => {
        cy.get('.car-offer').eq(0)
            .should('have.attr', 'href', '/car/carInfo?s=341&m=85')
            .then($car_1 => {
                cy.get($car_1.find('img'))
                    .should('have.attr', 'src', '/Images/hyundai_i10_300x225.jpg')
                    .and('have.attr', 'title', 'Hyundai i10 o similar')
                    .get($car_1).click()
            })
    })

    it('Info of Hyundai i10 o similar', () => {
        cy.get('#ui-id-5').should('contain', 'Rental Conditions').click()
        cy.get('#ui-id-6').should('contain', 'Gallery')
            .and('have.attr', 'href', '/Photo/GetGallery?itemId=85&itemTable=CarModels')
            .click()
        cy.get('#ui-id-7').should('contain', 'Additional Charges').click()
        cy.get('#ui-id-8').should('contain', 'Cancellation').click()

    })
})