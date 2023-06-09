import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container, Modal, FormControl } from "react-bootstrap";
import SingleComponent from "./SingleComponent";

const EntriesComponent = () => {
  const [entries, setEntries] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [changeEntry, setChangeEntry] = useState({ "change": false, "id": 0 });
  const [changeIngredient, setChangeIngredient] = useState({
    change: false,
    id: 0,
  });
  const [newIngredientName, setNewIngredientName] = useState("");
  const [addNewEntry, setAddNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    dish: "",
    ingredients: "",
    calories: 0,
    fat: 0,
  });

  // use effect

  useEffect(() => {
    getAllEntries();
  }, []);

  if (refreshData) {
    setRefreshData(false);
    getAllEntries();
  }

  // Calling the apis
  const addSingleEntry = async () => {
    setAddNewEntry(true);
    var url = "http://localhost:8000/entry/create";
    const response = await axios.post(url, {
      ingredients: newEntry.ingredients,
      dish: newEntry.dish,
      calories: newEntry.calories,
      fat: parseFloat(newEntry.fat),
    });
    if (response.status == 200) {
      setRefreshData(true);
    }
  };

  //   Delete a entry
  const deleteSingleEntry = async (id) => {
    var url = "http://localhost:8000/entry/delete/" + id;
    const response = await axios.delete(url, {});
    if (response.status == 200) {
      setRefreshData(true);
    }
  };

  //   get all entries
  const getAllEntries = async () => {
    var url = "http://localhost:8000/entry/entries";
    const response = await axios.get(url, {
      responseType: "json",
    });
    if (response.status == 200) {
      setRefreshData(true);
    }
  };

  const changeSingleEntry = async () =>{
    changeEntry.change = false;
    var url = "http://localhost:8000/entry/update/"+changeEntry.id  
    const response = await axios.put(url, newEntry)
    if (response.status == 200) {
      setRefreshData(true);
    }
  }
  
  const changeIngredientForEntry = async () => {
    changeIngredient.change = false;
    var url = "http://localhost:8000/entry/ingredient/update/"+changeIngredient.id;
    const response = await axios.put(url, {
      "ingredients": newIngredientName
    }) 
    if (response.status == 200) {
      setRefreshData(true);
    } 

  }
  return (
    <div>
      <Container>
        <Button
          onClick={() => {
            setAddNewEntry(true);
          }}
        >
          Track today's calories
        </Button>
      </Container>
      <Container>
        {entries != null &&
          entries.map((entry, i) => (
            <SingleComponent
              entryData={entry}
              setChangeIngredient={setChangeIngredient}
              deleteSingleEntry={deleteSingleEntry}
              setChangeEntry={setChangeEntry}
            />
          ))}
      </Container>
      <Modal
        show={addNewEntry}
        onHide={() => {
          setAddNewEntry(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Calorie entry</Modal.Title>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Dish</Form.Label>
              <Form.Control
                onChange={(event) => {
                  newEntry.dish = event.target.value;
                }}
              ></Form.Control>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                onChange={(event) => {
                  newEntry.ingredients = event.target.value;
                }}
              ></Form.Control>
              <Form.Label>Calories</Form.Label>
              <Form.Control
                onChange={(event) => {
                  newEntry.calories = event.target.value;
                }}
              ></Form.Control>
              <Form.Label>Fat</Form.Label>
              <Form.Control
              type="number"
                onChange={(event) => {
                  newEntry.fat = event.target.value;
                }}
              ></Form.Control>
            </Form.Group>
            <Button
              onClick={() => {
                addSingleEntry;
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setAddNewEntry(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal.Header>
      </Modal>

      {/* pop up for changing the ingredient */}
      <Modal
        show={changeIngredient.change}
        onHide={() => setChangeIngredient({ change: false, id: 0 })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>new ingredients</Form.Label>
            <FormControl
              onChange={(event) => {
                setNewIngredientName(event.target.value);
              }}
            ></FormControl>
          </Form.Group>
          <Button
            onClick={() => {
              changeIngredientForEntry();
            }}
          >
            Change
          </Button>
          <Button
            onClick={() => {
              setChangeIngredient({ "change": false, "id": 0 });
            }}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={changeEntry.change}
        onHide={() => setChangeEntry({ "change": false, "id": 0 })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Dish</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.dish = event.target.value;
              }}
            ></Form.Control>
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.ingredients = event.target.value;
              }}
            ></Form.Control>
            <Form.Label>Calories</Form.Label>
            <Form.Control
              onChange={(event) => {
                newEntry.calories = event.target.value;
              }}
            ></Form.Control>
            <Form.Label>Fat</Form.Label>
            <Form.Control
            type="number"
              onChange={(event) => {
                newEntry.fat = event.target.value;
              }}
            ></Form.Control>
          </Form.Group>
          <Button onClick={() => {
              changeSingleEntry();
            }}>Change</Button>
          <Button onClick={() => {
              setChangeEntry  ({ "change": false, "id": 0 });
            }}>Cancel</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EntriesComponent;
