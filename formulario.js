const formulario = document.getElementById('miFormulario');
const inputs = document.querySelectorAll('#miFormulario input');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
    nombre: false,
    apellido: false,
    correo: false,
};

function validaFormulario(e) {
    switch (e.target.name) {
        case "nombre":
        case "apellido":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validaFormulario);
    input.addEventListener('blur', validaFormulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.nombre && campos.apellido && campos.correo) {
        const data = {
            username: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            // Asegúrate de incluir los demás campos según la estructura esperada por tu API
        };

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            formulario.reset();
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
            document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});
