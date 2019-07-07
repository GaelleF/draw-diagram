const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const diagram =  require('./diagramsReact')


app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin) // Clever, not a good practise though..
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
  })
  app.use((err, req, res, next) => {
    if (err) {
      res
        .status(err.statusCode || 500)
        .json({ data: err.data, error: err.message })
      return console.error(err)
    }
  
    next(err)
  })
  
  

app.use(bodyParser.urlencoded({ extended: true}))
app.get('/', (req, res) => {
    res.send('hello world')
})
app.post('/analyse-folder', async (req, res) => {
    console.log('RES ', req.body)
    const result = await diagram.analyseFolder(req.body.path)
   //console.log('RESULT', result)
    res.send(result)
})
app.listen(4000, ()=> console.log('server listen on port 4000'))