const datos = {
    nombre:'',
    apellido:'',
    usuario:false,
    password:false,
    rpassword:false,
    email:false,
}
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const usuarioInput = document.querySelector('#usuario');
const passwordInput = document.querySelector('#password');
const rpasswordInput = document.querySelector('#rpassword');
const emailInput = document.querySelector('#email');
const formulario = document.querySelector('#form');

nombreInput.addEventListener('input', leerTexto);
apellidoInput.addEventListener('input', leerTexto);
usuarioInput.addEventListener('input', leerTexto);
passwordInput.addEventListener('input', leerTexto);
rpasswordInput.addEventListener('input', leerTexto);
emailInput.addEventListener('input', leerTexto);

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    const {nombre, apellido, usuario, password, rpassword, email} = datos;
     if (nombre === '' || apellido === '' || usuario === '' || password === '' || rpassword === '' || email === '' || usuario === '') {
        mostrarAlerta('Todos los campos son obligatorios' ,'error')
        return;
    }else if (nombre.length > 25 ) {
        mostrarAlerta('Campo "Nombre" maximo de 25 caracteres', 'error');
        return;
    }else if (apellido.length > 25 ) {
        mostrarAlerta('Campo "Apellido" maximo de 25 caracteres', 'error');
        return;
    }else if (/^[a-zA-Z]{10,20}$/.test(usuario) !== true) {
        mostrarAlerta('Expresion invalida, el CCUsuario no debe contener caracteres extraños', 'error') ;
        mostrarAlerta('O debe tener minimo 10 y maximo 20 caracteres', 'error');
        return;   
    }else if (/^[a-zA-Z]{15,20}$/.test(password) == true) {
        mostrarAlerta('Password debe contener caracteres especiales  [#,%,/,&] ', 'error') ;
        mostrarAlerta('O debe tener minimo 15 y maximo 20 caracteres', 'error');
        return;   
    }else if (password !== rpassword) {
        mostrarAlerta(' Las contraseñas no coinciden ', 'error') ;
        return;   
    }else if (email.length > 120) {
        mostrarAlerta('Campo "email" maximo de 120 caracteres', 'error') ;
        return;   
    }
    mostrarAlerta('Mensaje enviado correctamente');
});

function leerTexto(e) {
    datos[e.target.id] = e.target.value;  
}

function mostrarAlerta(mensaje, error = null) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;

    if(error) {
        alerta.classList.add('error');
    } else {
        alerta.classList.add('correcto');
    } 

    formulario.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 7000);
}


//*----------------------------*//

function showDiv(){
    document.getElementById('mostrar').style.display = '';
}
function showDiv1(){
    document.getElementById('textarea').style.display = '';
}
