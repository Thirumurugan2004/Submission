import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
// import Welcome from './welcome';
// import MyFormExample from "./FormExample";
import ToDoList from './ToDoList';
import ToDoList1 from './ToDoList1';
import TestImage from './TestImage';
import CheckList from './CheckList';
import CardPattern from './CardPattern';
import ArrayDetails from './ArrayObj';
import PersonDetails from './PersonDetails';
import { people } from './Person'; 
import FormController from './Form/FormController';
import PopupManager from './Popup/PopupManager';
import ClockWithColor from './Clock/ClockWithColor';
import TimeDisplay from './Clock/TimeDisplay';






const root = ReactDOM.createRoot(document.getElementById('root'));

const sampleArray = [42, 'Hello', true,5,'thiru'];
root.render(
  <React.StrictMode>
    <App />
    <TestImage />
    <ToDoList />
    <ToDoList1 />
    <CheckList />
    <CardPattern {...{name: "Thirumurugan", age: 21}}/>
    <ArrayDetails items={sampleArray} />
    <PersonDetails people={people} /> 
    <PopupManager />
    <FormController />
    <TimeDisplay />
    <ClockWithColor />
    

    {/* <MyFormExample name="thiru"/>
    <MyFormExample name="murugan"/>
    <App />
    <Welcome /> */}
  </React.StrictMode>
);
const test = ReactDOM.createRoot(document.getElementById('test'));

// function x(){
//   return ["thiru","murugan"];
// }
// let y = x();

// const elements = [];
// for (let i = 0; i < 5; i++) {
//   elements.push(<App key={i} />);
// }

test.render(
  <React.StrictMode>
    {/* {y}
    {elements} */}
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
