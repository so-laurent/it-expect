import React from 'react'
import ReservationCard from './reservationCard'

describe('<ReservationCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ReservationCard 
      reservation={
        {
          "id": 1,
          "date": "2022-01-01",
          "time": "12:00",
          "Restaurant": {
            "id": 1,
            "name": "Le Petit Cambodge",
            "description": "Restaurant vietnamien",
            "category": "Vietnamien",
            "address": "20 Rue Alibert, 75010 Paris",
            "email": "sdfljml@dslkf.ster",
            "capacity": 50
          }
        }
      }
      editReservation={() => {}}
      deleteReservation={() => {}}
    />)
  })
})