import React, { Component } from 'react';
import CardFile from './components/File'
//import {analyseFolder} from './analytics/diagramsReact'



class Draw extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: null
        
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:4000/analyse-folder', {
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            //   },
            method: 'POST',
            body: JSON.stringify({
                path: '../la-belle-table-client'
                //this.props.path
            })
        })
        .then(res=> res.json())
        .then(res=> {
            console.log('fetch',res)
            this.setState({data: res})})
    }

    // analyseFolderServer = () => fetch('http://localhost:6666/analyse-folder', {
    //     method: 'post',
    //     body: new URLSearchParams({
    //         path: this.props.path
    //     })
    // })
    // .then(res=> res.json())
    // .then(res=> console.log('fetch',res))

    // resultAnalyse =  this.analyseFolderServer(this.props.path)


  render() {
      console.log('RESULT : ',  this.state.data)
      if(this.state.data !== null){
        console.log('test : ',  this.state.data)
        return this.state.data.map((file,index) => {
            console.log('test file: ',  file, index)
            return (
            <CardFile key={file.path} description={file}> schema of {file.path}</CardFile>
        )

    })
      }
    
      return <div> Loading ...</div>
   
  }
}

  export default Draw