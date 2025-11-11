function MyFormExample(args) {
  let props = args;
  return (
    <form>
      <input type="text" name="name" placeholder="name" />
      <button type="submit">{props.name}</button>
    </form>
  );
}
export default MyFormExample;


// import React from "react";

// function MyFormComponent({ children }) {
//   return <form>{children}</form>;
// }

// MyFormComponent.Input = function Input() {
//   return <input type="text" name="name" placeholder="name" />;
// };

// MyFormComponent.Button = function Button() {
//   return <input type="submit" value="send" />;
// };

// export default MyFormComponent;



// var MyFormComponent = React.createClass({ 
//     render : function(){
//       return(
//         <form> {this.props.children} </form>
//       );
//     }
//   });
  
//   MyFormComponent.Input = React.createClass({
//     render : function(){
//       return(
//         <input type="text" name="name" placeholder='name' />
//       );
//     }
//   });
  
//   MyFormComponent.Button = React.createClass({
//     render : function(){
//       return(
//         <input type="submit" value="send"/>
//       );
//     }
//   });
  
  // var FormExample = MyFormComponent;

  
  
//   function FormExample(){
//     return(
//       <Form>
//         <Form.Input />
//         <Form.Button />
//       </Form>
//     );
//   }

