import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Friend = props => {
  //destructure my data prop for less typing
  const { name, age, email, id } = props.data;

  //declare all states and constants
  const [editing, setEditing] = useState(false);
  const [friendValue, setFriendValue] = useState(props.data);

  const handleDelete = () => {
    //handleDelete changes updating to true
    //this has effect throughout ternary statements
    props.setUpdate(true);
    axiosWithAuth()
      //then makes an axios call using the token
      //to delete the specific id of the object
      //per server documentation
      .delete("/friends/" + id)
      .then(res => {
        //the resolution returns a new array
        //set the state to new array to trigger a re-render
        //switch updating back to false
        props.setList(res.data);
        props.setUpdate(false);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  //typical handlechange
  const handleChange = e => {
    setFriendValue({ ...friendValue, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    if (editing === true) {
      //if the state of editing is true, clicking will do a put
      //which updates the current object with the id, according
      //to server docs
      axiosWithAuth()
        .put(`/friends/${id}`, friendValue)
        .then(res => {
          //resolution is a new array, set it to state for re-render
          //set editing back to false
          props.setList(res.data);
          setEditing(false);
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    }
  };

  return (
    <div className="friend">
      {/* depending on the state of editing, h2 may be an input or the given name */}
      <h2>
        {editing ? (
          <input
            type="text"
            name="name"
            value={friendValue.name}
            onChange={handleChange}
          />
        ) : (
            name
          )}
      </h2>
      <p>
        {/* depending on the state of editing, p may be an input or the given age */}
        Age:{" "}
        {editing ? (
          <input
            type="text"
            name="age"
            value={friendValue.age}
            onChange={handleChange}
          />
        ) : (
            age + "yrs old"
          )}
      </p>
      <p>
        {/* depending on the state of editing, p may be an input or the given email */}
        Email:{" "}
        {editing ? (
          <input
            type="text"
            name="email"
            value={friendValue.email}
            onChange={handleChange}
          />
        ) : (
            email
          )}
      </p>
      <div className="buttons">
        <button onClick={handleDelete}>Delete Friend</button>
        <button
          onClick={() => {
            //runs the handle edit function before setting state of editing
            //this way, a single button can handle both the toggle
            //of editing, as well as the submit
            handleEdit();
            setEditing(true);
          }}
        >
          {/* button text changes to reflect which one it will do on click */}
          {editing ? "Submit Changes" : "Edit Friend"}
        </button>
      </div>
    </div>
  );
};

export default Friend;