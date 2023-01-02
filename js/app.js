function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//cotizar seguro con los datos

Seguro.prototype.cotizarSeguro = function(){
/*
    1 = americano 1.15
    2 = asiatico 1.05
    3 = europer 1.35
*/
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
    
        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // leer el año

    const diferencia = new Date().getFullYear() -  this.year;
    // el costo reduce entre mas viejo sea el carro en un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === 'basico'){
        cantidad *= 1.3;
    }else{
        cantidad *= 1.5;
    }

    return cantidad;
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

//muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertar html

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
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
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'correcto');

    //Instanciar seguro

    const seguro = new Seguro(marca, year, tipo);
    seguro.cotizarSeguro(); 

    //utilizar el prototype que va a cotizar

}