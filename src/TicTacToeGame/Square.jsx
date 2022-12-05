import React from "react";
import Cross from '../assets/cross.png'
import Zero from '../assets/zero.png'

const Square = (props) => {

  let parseIcon=(value)=>{
    switch(value){
      case 'X':
      return <img  src={Cross}  alt="cross"/>
      case 'O':
      return <img  src={Zero}  alt="cross"/>
      default:
      return null
    }

  }


  return (
    <div
      onClick={props.onClick}
      style={{
        border: "1px solid",
        height: "100px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="square"
    >
      {parseIcon(props.value)}
    </div>
  );
};

export default Square;
