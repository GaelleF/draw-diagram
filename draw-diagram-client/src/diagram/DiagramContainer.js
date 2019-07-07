import {Card, Elevation} from "@blueprintjs/core";
import  React from'react'
import Draw from'./Draw'

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


 const DiagramContainer = (props) =>{
    return (<Card  className="bp3-card" elevation={Elevation.TWO} style={containerStyle}>
        <Draw path={mockProps.path} />
    </Card>)
}

export default DiagramContainer