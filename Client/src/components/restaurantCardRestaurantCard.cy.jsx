import React from 'react'
import RestaurantCard from './restaurantCard'

describe('<RestaurantCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RestaurantCard 
      restaurant={
        {
          "id": 1,
          "name": "Le Petit Cambodge",
          "description": "Restaurant vietnamien",
          "category": "Vietnamien",
          "address": "20 Rue Alibert, 75010 Paris",
          "email": "dsflkqjml@dsqkfm.test",
          "capacity": 50
        }
      }
    />)
  })
})