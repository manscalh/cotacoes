console.log('executando javascript');

const cotacoesForm = document.querySelector('form');
const mainMensage = document.querySelector('h3');
const symbol = document.querySelector('#symbol');
const price = document.querySelector('#price');

function clearData(){
  mainMensage.innerHTML = '';
  symbol.innerHTML = '';
  price.innerHTML = '';
}

cotacoesForm.addEventListener('submit', (event) =>{
  clearData();
  mainMensage.innerText = 'buscando...';
  event.preventDefault();
  const ativo = document.querySelector('input').value;
  cotacoesForm.reset();
  
    fetch(`/cotacoes?ativo=${ativo}`).then((response) =>{
      response.json().then((data) =>{
        if(data.erro){
          clearData();
          mainMensage.innerText = `${data.erro.message}`;
        }else{
          clearData();
          price.innerHTML = data.symbol;
          symbol.innerHTML= data.price;
        }
      })
  })

});