const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const cotacoes = require('./util/cotacao');

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPaht = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPaht);


app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index',{
    title: 'NodeJS',
    autor: 'salomao calheiros'
  });
})

app.get('/help', (req, res) => {
  res.render('help');
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'NodeJS',
    autor: 'salomao calheiros'
  });
})

app.get('/cotacoes', (req,res)=>{

   if(!req.query.ativo){
      return res.status(400).json({
        erro : {
          message: 'O Ativo deve ser informado.',
          code: 400
        }
      });
   }
   const symbol = req.query.ativo;
   cotacoes(symbol, (data,err) =>{

    if(err){
      return res.status(404).json(err);
    }
     res.status(200).json(data);
   });

});

app.get('*',(req,res) => {
  res.status(404).render('404',{
    title: '404',
    errorMessage: 'Página não encontrada'
  });
})

app.listen(3000, ()=>{
  console.log('server is up on port 3000');
  });