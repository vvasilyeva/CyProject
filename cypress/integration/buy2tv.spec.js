describe('Alza - shopping cart', () => {
    it ('Buy 2 most expensive TVs', () => {

      const tvArray = ['1', '2']

      cy.visit('/')

      cy.log('GO TO TV SECTION, SORT BY PRICE')
      cy.get('[id="litp18849604"]').click()
      cy.url().should('include', '18849604')
      cy.get('[aria-controls="cenadesc"]').click()
        .should('have.attr', 'aria-selected', 'true')
      cy.wait(500)

      var accounts =[]
      cy.get('[class*="browsingitem"]').find('[class="c2"]').each(elements => {     
        accounts.push(elements.text())   
      })
      cy.wrap(accounts).should('be.descending')

      cy.log('BUY TVs')
      cy.wrap(tvArray).each(($el, index) => {
        cy.buyTv(index, $el)
      })

      cy.log('CHECK SHOPPING CART')
      cy.get('[id="basket"]').click()
      cy.get('[id="orderpage"]').should('be.visible')

      cy.wrap(tvArray).each(($el, index) => {
        cy.checkNameInBasket(index)
        cy.checkPriceInBasket(index)
      })

    })

})