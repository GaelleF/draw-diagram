import {Card, Elevation} from "@blueprintjs/core";
import  React from'react'


const containerStyle =  {
    backgroundColor:'black', 
    minHeight: '500px', 
    display:'flex',
    border:'2px solid white',
    margin:'30px',
    color: 'white',
}
//className="bp3-card" elevation={Elevation.TWO}
const mockProps = { 
    path:''
}
//props 
//description :
    // path
    // content
    //extension 
    //typeFile
    //imports
//position

 const CardFile = (props) =>{
     const customStyle= {
         position: 'relative',
         border: '#222 solid 1px',
         margin :'10px',
         backgroundColor: 'gainsboro',
         color: 'black',
         margin: 'auto',
         //top: this.props.position.top,
         //left : this.props.position.left
     }

    return (<Card  className="bp3-card" elevation={Elevation.TWO} style={customStyle}>
        <h2 > {`path : ${props.description.path}`} </h2>
        <div>{`imports : ${props.description.imports}`}</div>
    </Card>)
}

export default CardFile