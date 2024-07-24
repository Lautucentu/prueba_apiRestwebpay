
function recuperar_respuesta(val_token, val_url)
{
    let container = document.getElementById("contenedor") 
    container.innerHTML='';
    let div = document.createElement("div");
    let token=document.createElement("input");
    token.value= val_token;
    let label_token= document.createElement("label");
    label_token.textContent="token"
    let url = document.createElement("input");
    url.value =val_url;
    let label_url = document.createElement("label");
    label_url.textContent="url"
    container.appendChild(div);
    div.appendChild(label_token);
    div.appendChild(token);
    div.appendChild(label_url);
    container.appendChild(div);
    div.appendChild(url)
}
function num_aleatorio()
{
   return Math.floor(Math.random() * 100000001);
}

function agregar_num()
{
    var monto1 = document.getElementById('monto1');
    var monto2 = document.getElementById('monto2');
    
    monto1.value = num_aleatorio();
    monto2.value = num_aleatorio();

}
var num=0;
function num_orden()
{
    num=num+1;
}

agregar_num()

document.getElementById('btn_wepay').addEventListener('click', async() => {
    num_orden()

    let amount = (monto1.value + monto2.value);

    const url = 'https://webpay3g.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions';
  
    const headers = {
      'Content-Type': 'application/json',
      'Tbk-Api-Key-Id': '597047195418',
      'Tbk-Api-Key-Secret': 'fbaad114-fcec-4090-b4d2-d5d0f89a16ab'
    };
    
    const body = {
      buy_order: 'ordencompra' + num +'',
      session_id: 'sesion12345678',
      amount: amount,
      return_url: 'http://www.comercio.cl/webpay/retorno'
    };
    
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      })
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        let val_token=respuesta.token
        let val_url = respuesta.url
        recuperar_respuesta(val_token,val_url);})
    .catch(error => {
      console.error('Error:', error);
    })
    
});
