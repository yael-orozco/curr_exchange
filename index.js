document.addEventListener('DOMContentLoaded', setCurrencyOptions(), false);
document.addEventListener('DOMContentLoaded', () => {
    let czkInput = document.getElementById('czkInput');
    let curInput = document.getElementById('selectedCurInput');
    czkInput.addEventListener('input', event => {
        let selectedCurrency = document.getElementById('currencies').value;
        let conversion = convert(Number(event.target.value), selectedCurrency, false);
        document.getElementById('selectedCurInput').value = Math.round(conversion * 100) / 100;
    })
    curInput.addEventListener('input', event => {
        let selectedCurrency = document.getElementById('currencies').value;
        let conversion = convert(Number(event.target.value), selectedCurrency, true);
        document.getElementById('czkInput').value = Math.round(conversion * 100) / 100;
    })
}, false);

let receivedData;

function setCurrencyOptions(){
    let scriptURL = 'http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php';
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        receivedData = JSON.parse(this.responseText);
        for(let i = 0; i < receivedData.data.length; i++){
            let newOption = document.createElement('option');
            newOption.setAttribute('value',receivedData.data[i].code)
            newOption.innerHTML = receivedData.data[i].country_label + ' - ' + receivedData.data[i].curr_label + ' (' + receivedData.data[i].code + ')';
            let dropdownMenu = document.getElementById('currencies');
            dropdownMenu.appendChild(newOption);
            let currencyOptions = document.getElementById('currencies');

            currencyOptions.addEventListener('change', event => {
                let currencyLabel = document.getElementById('curLabel');
                currencyLabel.innerHTML = event.target.value + ':';

                let selectedCurrency = document.getElementById('currencies').value;
                let conversion = convert(Number(document.getElementById('czkInput').value), selectedCurrency, false);
                document.getElementById('selectedCurInput').value = Math.round(conversion * 100) / 100;
            })
        }
    }

    xhttp.open('GET', scriptURL, true);
    xhttp.send();
    
}

function fetchExchangeData(){
    let scriptURL = 'http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php';
    
    const newDataRequest = new XMLHttpRequest();
    newDataRequest.onload = function(){
        receivedData = JSON.parse(this.responseText);
    };
    newDataRequest.open('GET', scriptURL);
    newDataRequest.send();
}

function convert(amount, targetCurrency, toCZK){
    fetchExchangeData();
    let curData = receivedData.data.filter(obj => obj.code == targetCurrency);
    let curRate = curData[0].rate;
    let unit = curData[0].unit;
    if(toCZK == false){
        return amount/curRate*unit;
    }
    else{
        return amount*curRate;
    }
    
}

function convertToCZK(amount, sourceCurrency){
    fetchExchangeData();
    
}

