Cypress.Commands.add('buyTv', (tvIndex, tvVal) => {

    cy.log('SAVE TV NAME')
    cy.get('[class*="canBuy"]').eq(tvIndex).find('[class*="name"]').then(($name) => {
        const tvName = $name.text()
        cy.wrap(tvName).as('tvName' + tvIndex)
    })

    cy.log('SAVE TV PRICE')
    cy.get('[class*="canBuy"]').eq(tvIndex).find('[class="c2"]').then(($price) => {
        var tvPrice = $price.text()
        tvPrice = tvPrice.replace(/[,-]+/g, '')
        cy.wrap(tvPrice).as('tvPrice' + tvIndex)
    })

    cy.log('ADD TO THE CART')
    cy.get('[class="btnk1"]').eq(tvIndex).click()
    cy.get('[id="confirm-product-accessories-dialog"]').click()
    cy.get('@tvName' + tvIndex).then(tvName => {
        cy.get('[class="productInfo__texts__productName"]').should('contain', tvName)
    })

    cy.log('CHECK BASKET ICON - COUNT')
    cy.get('[id="basket"]').find('[class="count"]').then(($count) => {
        const count = $count.text()
        cy.wrap(count).as('count')
    })
    cy.get('@count').should('eq', tvVal)

    cy.log('GO BACK TO LIST')
    cy.get('[id="varBBackButton"]').click()
    cy.url().should('include', '18849604')  
})

Cypress.Commands.add('checkNameInBasket', (tvIndex) => {
    cy.get('@tvName' + tvIndex).then(tvName => {
        cy.get('[class="mainItem"]').eq(tvIndex).should('contain', tvName)
    })
})

Cypress.Commands.add('checkPriceInBasket', (tvIndex) => {
    cy.get('@tvPrice' + tvIndex).then(tvPrice => {
        cy.get('[class="ui-draggable"]').eq(tvIndex).find('[class="c5"]').should('contain', tvPrice)
    })
})
