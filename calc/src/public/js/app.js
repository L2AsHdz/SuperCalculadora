document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#calc').addEventListener('submit', validarFormulario);
});

let validarFormulario = evento => {
    evento.preventDefault();
    let num1 = document.querySelector('#numero1').value;
    let num2 = document.querySelector('#numero2').value;
    let operacion = document.querySelector('#operacion');

    if (formHasErrors(num1, num2, operacion.value)) {
        return;
    }
    document.forms['calc'].submit();
}

let formHasErrors = (num1, num2, operacion) => {
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

    if (isEmpty(operacion)) {
        errOp.innerHTML = 'Debe seleccionar una operacion';
        errOp.classList.remove('d-none');
        areErrors = true;
    }
    return areErrors;
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
