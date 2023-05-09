import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Button, Card, Col } from 'react-bootstrap'

const SingleComponent = ({entryData, setChangeIngredient, deleteSingleEntry, setChangeEntry}) => {
  return (
    <Card>
        <Row>
            <Col>
                Dish : {entryData != undefined && entryData.dish}
            </Col>
            <Col>
                Ingredients : {entryData != undefined && entryData.ingredients}
            </Col>
            <Col>
                Calories : {entryData != undefined && entryData.calories}
            </Col>
            <Col>
                Fat : {entryData != undefined && entryData.fat}
            </Col>

            <Col><Button onClick={}> Delete Entry </Button></Col>
            <Col><Button onClick={}> Change Ingredients </Button></Col>
            <Col><Button onClick={}> Change Entry </Button></Col>
        </Row>
    </Card>
  )
}

export default SingleComponent
