const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs');
const { fileLoader } = require('ejs');

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , 'public')))


app.get('/', (req, res)=>{
    fs.readdir('allData',function(err, folder){
        
        res.render('index',{folder:folder})

    })
})
app.get('/create',(req, res)=>{
    res.render('create')
})
app.post('/create',(req, res)=>{
    
    const date = new Date()
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()

    fs.writeFile(`./allData/${day}-${month}-${year}-${req.body.filename}.txt`,`${req.body.textData}`,(err)=>{
        if(err){
            res.send(err.message)
        } else{
            res.redirect('/')
        }
    })
})
app.get('/read/:filename', (req, res)=>{

    fs.readFile(`./allData/${req.params.filename}`,function(err, data){
        
        res.render('read',{filename:req.params.filename, filedata:data})

    })
})
app.get('/update/:filename', (req, res)=>{

    fs.readFile(`./allData/${req.params.filename}`,function(err, data){
        
        res.render('update',{filename:req.params.filename, filedata:data})

    })
})
app.post('/edit/:filename', (req, res)=>{

    fs.writeFile(`./allData/${req.params.filename}`,`${req.body.newData}` , function(err, data){
        
        res.redirect('/')

    })
})

app.get('/delete/:filename', function(req, res){
    fs.unlink(`./allData/${req.params.filename}`,function(err){
        res.redirect('/')
    })
})

app.listen(3000)