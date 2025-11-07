import React from "react";

function Item({name,isPacked}){
    let itemContent = name
    if(!isPacked){
        return <li className="item">{itemContent} ❌</li>;
    }
    return <li className="item">{itemContent} ✅</li>;
}

export default function CheckList(){
    return(
        <section>
            <h1>My Travel Checklist</h1>
            <ul>
                <Item name="PassPort" isPacked={true}/>
                <Item name="Sunglasses" isPacked={false}/>
                <Item name="Charger" isPacked={true}/>
                <Item name="Toothbrush" isPacked={true}/>
                <Item name="Comb" isPacked={false}/>
            </ul>
        </section>
    );
}