
// typeFile : reactComponent|utils|api
const findTypeFile = (contentFile)=> {
    const regexReactImport =new RegExp()
    const regexReactClass= new RegExp()
    const regexReactComponent= new RegExp(/React/g)
    let reactimport= 0
    let reactComponent=0

    const importList= contentFile.map(line => {
        const arrayLine=line.split('\ ').filter(element => element !== '')
        const importAnalyse= extractImport(line)
            return importAnalyse   
     }).filter(importElement=> importElement !== undefined)
     let type = 'other'
   // console.log('importList',importList)
    if (importList.join('').match(regexReactComponent)) {
        type ='reactComponent'
    }

    return {typeFile: type, imports: importList}
}

const extractImport = (line) => {

    if (line.includes('import') && line.includes('from')) {
        const arrayLine=line.split('\ ').filter(element => element !== '')
        const indexFrom= arrayLine.indexOf('from')
        if (indexFrom > 1 && arrayLine[0] === 'import') {
            let importName = ''
            arrayLine.forEach((element, index) => {
                if (index>0 && index<indexFrom) {
                    importName +=` ${element}` 
                }
            })
            return importName.trim()
        }
    }
    return undefined
}


module.exports = {findTypeFile}
//export {findTypeFile}
// module.exports = {findTypeFile}