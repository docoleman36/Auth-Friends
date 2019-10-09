import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Friends from "./Friends.js";

const Dashboard = () => {
  //declare an empty object, makes it easy to return to blank later
  const friendObj = {
    id: "",
    name: "",
    age: "",
    email: ""
  };

  //declare all states and constants
  const [friendValue, setFriendValue] = useState(friendObj);
  const [friendsList, setFriendsList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  //typical handle change
  const handleChange = e => {
    setFriendValue({ ...friendValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    //submit type buttons/forms refresh, prevent that.
    e.preventDefault();
    //spread in current state and change the id to numbers :)
    setFriendValue({ ...friendValue, id: Date.now() });
    //set updating state for ternary flavor
    setIsUpdating(true);
    axiosWithAuth()
      .post("/friends", friendValue)
      .then(res => {
        //resolution returns new array, set to state for re-render
        setFriendsList(res.data);
        setIsUpdating(false);
      })
      .then(() => {
        //after finishing first task list, reset state
        //to my handy dandy empty object
        setFriendValue(friendObj);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  //upon rendering the page, set editing for ternary flavor
  //get the array of friends and set to state for mappiness
  useEffect(() => {
    setIsUpdating(true);
    axiosWithAuth()
      .get("/friends")
      .then(res => {
        setFriendsList(res.data);
        setIsUpdating(false);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <section className="dashboard">
      <div className="addFriend">
        <h1>Add a new friend!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={friendValue.name}
            onChange={handleChange}
          />
          <label htmlFor="age">Name:</label>
          <input
            type="text"
            name="age"
            placeholder="35"
            value={friendValue.age}
            onChange={handleChange}
          />
          <label htmlFor="email">Name:</label>
          <input
            type="text"
            name="email"
            placeholder="joe.doe@gmail.com"
            value={friendValue.email}
            onChange={handleChange}
          />
          <button type="submit">Add Friend</button>
        </form>
      </div>
      <div className="friends">
        <h1>
          {isUpdating
            ? "Loading..."
            : `You have ${friendsList.length} friends!`}
        </h1>
        <div className="friendsList">
          {friendsList.map(cv => {
            return <Friends data={cv} key={cv.id} setUpdate={setIsUpdating} setList={setFriendsList} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;