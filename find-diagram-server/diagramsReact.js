const fs = require('fs');
const util =require('util')
//import {findTypeFile} from 'analyse-files/analyse-utils'
const analyseUtils = require('./analyse-files/analyse-utils')

const promisify = f => (...args) => new Promise((a,b)=>f(...args, (err, res) => err ? b(err) : a(res)));

const readdirSync = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

//const mainDir = '../la-belle-table-client'
//fs.fstat("/some/path").isDirectory()
//const path = (folder) => `${mainDir}/${folder}`
const folderToExclude =[]

/* 
treeFolder = [
    {folders:[
        {folder1:[
        {folder11:{folders:[
            {folder111:{folders:[], files:[file111, file212]}}],
        files:[file1, file2]}}
        ]},
        {folder2: null}, {folder3:null}],
    files:[{file1:null}, {file2:null}]}
]

*/
 const analyseFolder = async (mainDir) => {
     mainDir = '../la-belle-table-client'

    const path = (folder) => `${mainDir}/${folder}`
const isDirectory=(directory) => fs.existsSync(`${mainDir}/${directory}`) && fs.lstatSync(`${mainDir}/${directory}`).isDirectory()

const addNewDir = async(directories,path) => {
    let pathFolder ='';
    if (path !== ''){pathFolder=`${path}/`}
    
    const newDirs = directories.map(async folder => {

      let treeFolder ={flatFiles:[]} 
      treeFolder[`${pathFolder}${folder}`]= {folders:[], files:[]}
      const regexHide = new RegExp('/\\\./g') 

      if (!folder.match(regexHide) && !folder.includes('node_modules')&& !folder.includes('.git'))  {
        let newFolders = []
        if (isDirectory(`${mainDir}/${pathFolder}${folder}`)) {
            const foldersRead = await readdirSync(`${mainDir}/${pathFolder}${folder}`)
           
            foldersRead.forEach( async folderRead => {
                if (isDirectory(`${mainDir}/${pathFolder}${folder}/${folderRead}`)){
                //console.log('foldersRead : ', folderRead)
                    newFolders.push(folderRead)
                }
                else {
                    const key = `${folderRead}`
                    const extensionArray = folderRead.split('.')
                    const extension = extensionArray[extensionArray.length-1]
                    //const result = await readCodeFile(`${mainDir}/${pathFolder}${folder}/${folderRead}`)
                    treeFolder[`${pathFolder}${folder}`].files[key]={extension, path: `${pathFolder}${folder}`}
                    if (extension.toLowerCase() ==='js'||extension.toLowerCase() === 'jsx'|| extension.toLowerCase() ==='html'||extension.toLowerCase() === 'css'){
                        const keyFile = `${pathFolder}${folder}/${folderRead}`
                        
                    }
                   
                }
            })

            }
            treeFolder[`${pathFolder}${folder}`].folders = newFolders.length >0 ? await addNewDir(newFolders,`${pathFolder}${folder}`) : []
       return treeFolder
    }
    return `${pathFolder}${folder}`
    })
    return Promise.all(newDirs)
}


const analyseFiles = async (listFiles) => {

    const analysedFiles = listFiles.map( async file => {
        const extensionArray = file.split('.')
        const extension = extensionArray[extensionArray.length-1]
        if (extension === 'js' ){
          //  console.log('JS file : ', file)
            const result = await readCodeFile(file)
          //  console.log('JS : ', file, result)

            return result
        }
       return ''
        
    })

    return Promise.all(analysedFiles)
}

const selectDirectory = (directory)=> {
    const regexHide = new RegExp('/\/\./g') 

      if (!directory.match(regexHide) && !directory.includes('node_modules')&& !directory.includes('.git')&& !directory.includes('build')) {
          return true
      }
      return false
}

// const typeFile =(contentFile, )=>{}

// const calculateImport = (arrayContent) => {

//     const analyseContent= analyseUtils.findTypeFile(arrayContent)
//     console.log('analyseContent', analyseContent)

// }

const calculateType = (arrayFile) => {

    const analyseContent= analyseUtils.findTypeFile(arrayFile)
    //console.log('analyseContent', analyseContent)

    return analyseContent
    
}

const readCodeFile = async (pathFile) => {
    const extensionArray = pathFile.split('.')
    const extension = extensionArray[extensionArray.length-1]
    const contentFile = await readFile(pathFile, 'utf8');
    const arrayContent = contentFile.split('\n' )
   //console.log('contentFile : ', pathFile, contentFile)
   //return contentFile[0]
   //const imports = calculateImport(arrayContent) 
   const type = calculateType(arrayContent)
  // console.log('type', type, pathFile)
   return {path: pathFile, content: contentFile[0], extension, ...type}
}

const getFiles = (dir, files_) =>{
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory() && selectDirectory(name)){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}


// const finalResult = await  fs.readdir('../la-belle-table-client', async (err, res)=>{
//     const result =  await addNewDir(res,'')
    
    
//     const files_ = await getFiles('../la-belle-table-client')
//     const resultFiles = await analyseFiles(files_)
//    // console.log('resultFile', resultFiles.filter(analyse => analyse !== ''))
//    // console.log('newFiles', files_)
//    console.log('resultFiles', resultFiles)

//     return resultFiles 
    
// })
const analyseMainDir = async ()=> { 
    const res = await  readdirSync(mainDir)
    const result =  await addNewDir(res,'')
    
    
    const files_ = await getFiles(mainDir)
    const resultFiles = await analyseFiles(files_)
   // console.log('resultFile', resultFiles.filter(analyse => analyse !== ''))
   // console.log('newFiles', files_)
   console.log('resultFiles', resultFiles)

    return resultFiles 
    
}
const finalResult = await analyseMainDir()
console.log('FINAL RESULT : ', finalResult)
return finalResult.filter(files => files !== '')
}

/*
diagram of react component only
component: [{
    Component1: 
    {imports: [componentX,...],path: 'path', exports:[componentsY], query:[query1]}, typeFile : reactComponent|utils|api}
 }, Component2: 
    {imports: [componentX,...],path: 'path', exports:[componentsY], query:[query1]}, typeFile : reactComponent|utils|api}
}]
if nbImports> 5 => put aside and use color
sort components by nbExports
only js
add query from api or graphql/Query
graphQL: client , Query, mutation
state, props
*/

module.exports = {analyseFolder}
