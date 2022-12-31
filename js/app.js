function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){}


//llenar los años

UI.prototype.llenarYears = () => {
    const max = new Date().getFullYear();
    const min = max - 22;
    
    for (let i = max; i  > min; i--) {
        const option = document.createElement('option');
        const selectYear = document.querySelector('#year');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }

}

// instanciar ui
const ui = new UI();


document.addEventListener("DOMContentLoaded", () => {
    ui.llenarYears(); 
})


eventListeners();

function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    // leer datos

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if (marca === '' || year === '' || tipo === ''){
        console.log('falta info');
    }else {
        console.log('cotizando..');
    }
}