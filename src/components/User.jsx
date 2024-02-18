import { useState } from "react";

const User = ({name, location}) => {
    const [count] = useState(0);
    const [count2] = useState(2);
    return(
        <div className="user-card">
            <h1>Count = {count}</h1>
            <h1>Count2 = {count2}</h1>
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: @jainrithik</h4>
        </div>
    )
}

export default User;