import { Todo } from "../classes";
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    console.log(nombreElemento);

    if (nombreElemento.includes('input')) { // click en el check -> completa, descompleta
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) { // click en la X, hay que borrar
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    //console.log(todoList);
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return };
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) element.classList.add('hidden');
                break;
            case 'Completados':
                if (!completado) element.classList.add('hidden');
                break;

            default:
                break;
        }
    }

})

/*
import '../css/componentes.css';
//import webpacklogo from '../assets/img/webpack-logo.png';
export const saludar = (nombre) => {
    console.log('Creandp etiqueta H1');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre}!!!`;
    document.body.append(h1);
    /*
    console.log(webpacklogo);
    const img = document.createElement('img');
    img.src = webpacklogo;
    document.body.append(img);
    */
//}



