

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

    it('Check Logo', () => {
        cy.get('#logo')
            .should('have.attr', 'src', '/Resources/css/transtur/images/transtur_id.png')
    })

    it('Car zone', () => {
        cy.get('#CarZoneIdSelectBoxItArrowContainer').click()

        cy.get('#CarZoneIdSelectBoxItOptions')
            .should('be.visible')
            .then($box => {
                cy.get($box.find('.selectboxit-option-icon-container'))
                    .its('length').then(($length) => {
                        cy.get($box.find('.selectboxit-option-icon-container')).eq(Cypress._.random($length - 1)).click({ force: true })
                    })
            })
        cy.get(':nth-child(7) > input').click()
        cy.location('pathname', { timeout: 60000 })
            .should('include', '/car/search');
        cy.wait(3000)
        cy.get('body').then(($body) => {
            if ($body.find('.empty-results > p').is(':visible')) {
                cy.go(-1)
            }
        })
    })

    it('Contact Phone', () => {
        cy.get('#more-phones > span')
            .should('contain', '+1 (833) 685-0373 Toll Free')
            .click()
        cy.contains('+1 (305) 677-3457 Assistance')
            .should('be.visible')
        cy.contains('+1 (305) 677-3504 Assistance')
            .should('be.visible')
        cy.contains('+1 (305) 677-9874 Assistance')
            .should('be.visible')
    })

    it('Your phone number:', () => {
        cy.get('#vonageClick2callme > a')
            .should('have.attr', 'href', 'https://click2callme.amz1.vocalocity.com/')
            .and('have.attr', 'target', 'Click_to_Call_Me')
    })
})
