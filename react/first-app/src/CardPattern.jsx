import React from "react";

// function Card({children}){
//     return(
//         <div className="card">
//             {children}
//         </div>
//     );
// }

export default function CardPattern(props){
    return(
        // <Card>
        //     <h2>Card Title</h2>
        //     <p>This is some content inside the card.</p>
        // </Card>

        <h1> Hii {props.name}.{props.age} years old.</h1>
        
    );
}