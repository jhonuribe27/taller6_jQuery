
//*----------------------------*//

function showDiv(){
    document.getElementById('mostrar').style.display = '';
}
function showDiv1(){
    document.getElementById('textarea').style.display = '';
}


//*----------------------------------*//

$(function(){
    'use strict';

    $('#bregistro').on('click',function() {
        $('#registro').show();
    });
    $('#bgrilla').on('click',function() {
        
        $.ajax({
            type: 'GET',
            url: 'datos.json',
            dataType: 'json'
        }).done((data) => {
            $.each(data, function (indice, persona) {
                let fila = $('<tr>');
                fila.append($(`<td>${persona.id}</td>`));
                fila.append($(`<td>${persona.name}</td>`));
                fila.append($(`<td>${persona.username}</td>`));
                fila.append($(`<td>${persona.email}</td>`));
                
                fila.append($(`<td>${persona.address.street}</td>`));
                fila.append($(`<td>${persona.address.suite}</td>`));
                fila.append($(`<td>${persona.address.city}</td>`));
                fila.append($(`<td>${persona.address.zipcode}</td>`));
                
                fila.append($(`<td>${persona.address.geo.lat}</td>`));
                fila.append($(`<td>${persona.address.geo.lng}</td>`));
                fila.append($(`<td>${persona.phone}</td>`));
                fila.append($(`<td>${persona.website}</td>`));
                fila.append($(`<td>${persona.company.name}</td>`));
                fila.append($(`<td>${persona.company.catchPhrase}</td>`));
                fila.append($(`<td>${persona.company.bs}</td>`));

                $('#tabla tbody').append(fila);
            });
            $('#tabla').show();
        });
    });
    $('#bocultar').on('click',function() {
        $('#registro').hide();
        $('#tabla').hide();
    });
});

/*------------------------------- */
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

/*-------Edad-------*/

const fechaNacimiento = document.getElementById("fechaNacimiento");
const edad = document.getElementById("edad");

const calcularEdad = (fechaNacimiento) => {
    const fechaActual = new Date();
    const anoActual = parseInt(fechaActual.getFullYear());
    const mesActual = parseInt(fechaActual.getMonth()) + 1;
    const diaActual = parseInt(fechaActual.getDate());

    // 2016-07-11
    const anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
    const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
    const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

    let edad = anoActual - anoNacimiento;
    if (mesActual < mesNacimiento) {
        edad--;
    } else if (mesActual === mesNacimiento) {
        if (diaActual < diaNacimiento) {
            edad--;
        }
    }
    return edad;
};

window.addEventListener('load', function () {

    fechaNacimiento.addEventListener('change', function () {
        if (this.value) {
            edad.innerText = `Su edad es: ${calcularEdad(this.value)} años`;
        }
    });

});