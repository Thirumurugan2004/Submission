import React from "react";

const today = new Date();
const name = "Thirumurugan";
const age = 21;


function formatDate(date){
    return new Intl.DateTimeFormat('en-US',{weekday: 'long'}).format(date);
}

function ToDoList(){
    return(
        <div>
            <h1>To Do List for {name} {age} on {formatDate(today)}</h1>
        </div>
    );
}

export default ToDoList;