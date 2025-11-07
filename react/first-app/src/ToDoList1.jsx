import React from "react";

function ToDoList1() {
    const person = {
        name: "Thirumurugan",
        img1: "https://openclipart.org/image/2400px/svg_to_png/220907/Circles-In-Circle.png",
        theme: {
            backgroundColor: "lightblue",
            color: "darkblue"
        }
    };

    return (
        <div style={person.theme}>
            <h1>{person.name}'s To Do List</h1>
            <img
                src={person.img1}
                alt="Placeholder Image"
                style={{ width: "200px", height: "200px" }}
            />

            <ul>
                <li>Learn React</li>
                <li>Build a To Do App</li>
                <li>Master JavaScript</li>
            </ul>
        </div>
    );
}

export default ToDoList1;