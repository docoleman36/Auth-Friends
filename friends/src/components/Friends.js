import React, {useEffect, useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';


const Friends = () => {
  const [friend, setFriend] = useState([]);
  
  const update = () => {
    axiosWithAuth()
      .put('/friends/1', {body: {"name": "Jim", "age": 30, "email": "jim@gmail.com"}})
      .then(res => {
        console.log(res.data);
        setFriend(res.data);
      })
      .catch(err => console.log(err));
  }
   useEffect(() => {
    axiosWithAuth()
      .get('/friends')
      .then(res => {
        console.log(res.data);
        setFriend(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div>
        <h1>Friends List</h1>
        {friend.map(friends => (
            <div key={friends.id} className="card-container">
                <div>
                    <h3>{friends.name}</h3>
                    <p>{friends.age}</p>
                    <p>{friends.email}</p>
                    <button onClick={update}>Update a Friend</button>
                </div>
            </div>
        ))
        }
    </div>
  )
}

export default Friends;