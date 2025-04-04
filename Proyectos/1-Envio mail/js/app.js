document.addEventListener("DOMContentLoaded", function(){
    const email = {
        email : "",
        asunto : "",
        mensaje : ""
    }
    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const inputCC = document.querySelector("#CC")
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector("#boton-enviar")
    const btnReset = document.querySelector("#boton-reset");
    const spinner = document.querySelector("#spinner");


    //Asignar eventos
    //Blur. Ocurre cuando un usuario clica en otro punto o presiona Tab para ir al siguiente campo de un formulario.

    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);
    inputCC.addEventListener("input", validar)
    btnReset.addEventListener("click", resetear);
    formulario.addEventListener("submit", enviarEmail)

    function resetear(){  
        e.preventDefault();
        //reiniciar el objeto
        email.email ="";
        email.asunto ="";
        email.mensaje ="";

        formulario.reset();
        comprobarEmail();
    }

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");
        
        setTimeout(() =>{
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");
               //reiniciar el objeto
            email.email ="";
            email.asunto ="";
            email.mensaje ="";

            formulario.reset();
            comprobarEmail();
            const alertaExito = document.querySelector("p");
        alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold",
            "text-sm", "uppercase");
        alertaExito.textContent = "Mensaje enviado correctamente";

        formulario.appendChild(alertaExito);
        setTimeout(() => {
            alertaExito.remove();
        },3000)
        },3000)
        
        

    }

    function validar(e){
        if(e.target.value.trim() === "" && e.target.id !=="CC" ){//.trim es un método que elimina los espacios en blanco
            mostrarAlerta("Campo obligatorio", e.target.parentElement );
            email[e.target.name] ="";
            comprobarEmail();
            return;
        } 

        if ((e.target.id === "email" || e.target.id === "CC" ) && !validarEmail(e.target.value)){
            mostrarAlerta("El email no es válido", e.target.parentElement);
            email[e.target.name] ="";
            comprobarEmail();
            return;
        
        }
        limpiarAlerta(e.target.parentElement);

        // Asignar los valores

        email[e.target.name] =e.target.value.trim().toLowerCase();

        // Comprobar el objeto e-mail
        comprobarEmail();
    };

    function mostrarAlerta(mensaje, referencia){
       
        limpiarAlerta(referencia);
        //Generamos una alerta en HTML
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center")//le damos estilo desde Javascript e identificamos
            //Inyectar el error al formulario
        referencia.appendChild(error);
    };
    // Creamos funcion para limpiar Campo obligatorio
    function limpiarAlerta(referencia){
         //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector(".bg-red-600");
        if(alerta) {
            alerta.remove()
        }

    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
       if(Object.values(email).includes("")){
        btnSubmit.classList.add("opacity-50");
        btnSubmit.disabled = true;
        
       } else{
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
       }
    }
});