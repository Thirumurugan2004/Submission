import React from "react";  

const baseUrl = 'https://i.imgur.com/';
const person = {
    name: "Thirumurugan",
    imageId: '7vQD0fP',
    imageSize: 's',
    theme: {
        backgroundColor: "black",
        color: 'pink'
    }
};

export default function TestImage() {
    const a = baseUrl+person.imageId+person.imageSize+'.jpg';
    return (
        <div style={person.theme}>
            <h1>{person.name}'s To Do List</h1>
            <img
                className="avatar"
                src={a}
                alt={person.name}
            />
            <ul>
                <li>Learn React</li>
                <li>Build a To Do App</li>
                <li>Master JavaScript</li>
            </ul>
        </div>
    );
}