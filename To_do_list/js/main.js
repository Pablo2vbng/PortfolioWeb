// VARIABLES DE RECOGIDA DE DATOS
const input = document.getElementById('to-do-list-form__input');
const form = document.getElementById('to-do-list-form');
const ul = document.getElementById('to-do-list-ul');


//FUNCIONES

const addLi = (e) => {
   //PREVENTDEFAULT PARA QUE CUANDO PRESIONEMOS EL BOTÓN NO RECARGUE LA PAGINA
    e.preventDefault();

    //RECOGEMOS EL TEXTO DEL IMPUT EN UNA VARIABLE
    const text = input.value
    
    //OJO SI ESTÁ VACÍA
    if (text !== "") {
        
        //VARIABLES
        //CREAMOS LOS HIJOS ELEMENTOS DEL UL
        const li = document.createElement('li')
        const deleteBtn = document.createElement('button')
        const span = document.createElement('span')
        
        //VAMOS PREPARANDO EL HTML PARA ESTILOS
        li.className = "to-do-list-ul__li"
        deleteBtn.className = "to-do-list-ul__li-btn"

        //AÑADIMOS EL TEXTO A LOS NUEVOS ELEMENTOS
        span.textContent = text
        deleteBtn.textContent= "X"
        
        //EVENTO PARA MARCAR COMO HECHA UNA TAREA
        span.addEventListener('click', () => {
            span.style.textDecoration = 'line-through' 
        })

        //EVENTO PARA EL BOTÓN ELIMINAR
        deleteBtn.addEventListener('click', () => {
            ul.removeChild(li)
        })

        //MÉTODOS PARA AÑADIR
        li.appendChild(span)
        li.appendChild(deleteBtn)
        ul.appendChild(li)        
       
    }
     //PARA NO CONCATENAR LOS TEXTOS RESETEAMOS EL INPUT
     input.value = ""
};

form.addEventListener('submit', addLi)

