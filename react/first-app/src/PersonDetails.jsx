// PersonDetails.js
import React from 'react';

function PersonDetails({ people }) {
    return (
        <div>
            <h1>People Details</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>No Of People : {people.length}</h3>
                {people.map((person, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "20px"}}>

                        <img
                            src={person.image}
                            alt={person.name}
                            style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }}
                        />

                        <div>
                            <strong>{person.name}, </strong> {person.age} years old, works as a {person.job}.

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PersonDetails;
