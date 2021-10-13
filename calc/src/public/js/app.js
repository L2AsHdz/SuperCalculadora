document.querySelector("#operar").addEventListener("click", () => {
    let num1 = document.querySelector('#numero1').value;
    let num2 = document.querySelector('#numero2').value;
    let operacion = document.querySelector("#operacion");
    if (!validarForm(num1, num2, operacion.value)) {
        switch (operacion.value) {
            case '1': {
                console.log('Suma');
            } break;
            case '2': {console.log('Resta');}break;
            case '3': {console.log('Multiplicacion');}break;
            case '4': {console.log('Division');}break;
            case '5': {console.log('Potencia');}
        }
    }
});


let validarForm = (num1, num2, operacion) => {
    let areErrors = false;
    let errNum1 = document.querySelector('#errNum1');
    let errNum2 = document.querySelector('#errNum2');
    let errOp = document.querySelector('#errOp');

    if (isEmpty(num1)) {
        errNum1.innerHTML = 'El campo no puede estar vacio';
        errNum1.classList.remove('d-none');
        areErrors = true;
    } else if (!isFloat(num1)) {
        errNum1.innerHTML = 'Debe ser un dato numerico';
        errNum1.classList.remove('d-none');
        areErrors = true;
    }

    if (isEmpty(num2)) {
        errNum2.innerHTML = 'El campo no puede estar vacio';
        errNum2.classList.remove('d-none');
        areErrors = true;
    } else if (!isFloat(num2)) {
        errNum2.innerHTML = 'Debe ser un dato numerico';
        errNum2.classList.remove('d-none');
        areErrors = true;
    }

    if (operacion == 0) {
        errOp.innerHTML = 'Debe seleccionar una operacion';
        errOp.classList.remove('d-none');
        areErrors = true;
    }
    return areErrors;
};

let operar = (op) => {
    
};

let isEmpty = s => {
    if (s.length === 0) {
        return true;
    }
};

let isFloat = s => {
    if (!Number.isNaN(Number.parseFloat(s))) {
        return true;
    }
}
