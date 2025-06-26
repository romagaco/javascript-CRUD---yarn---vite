import {getUsers, deleteUsers, updateUser} from "./api.js";

const editUser = null;
const form = document.getElementById("form");

// render de usuarios
const renderUsers = async () : Promise<void> => {
    const users = await getUsers();
    const userList = document.getElementById("user-list");

    users.forEach((user : any ) : void => {
        const element = document.getElementById("li");

        element.innerHTML= `
        <span>${user.name} (${user.email})</span>
        <button type="button" class="edit" data-id="${user.id}">Editar</button>
        <button type="button" class="delete" data-id="${user.id}">Eliminar</button>
        `;

        userList.appendChild(element);
    });
};
//manejar el sumit
const handleSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await updateUser({ name, email, id: editUser ? editUser.id: null});

    form.reset();

    renderUsers();
}
//manejar edit
const handleEdit = async (id, name, email) => {
    editUser = { id, name, email};

    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
}

// manejar delete
const handleDelete = async (id) => {
    await deleteUsers(id);

    renderUsers();
}

// agregar eventos al HTML
form.addEventListener("submit", handleSubmit);

userList.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("edit")) {
        const id = target.getAttribute("data-id");
        const user = Array.from(target.parentNode.children)[0].innerText.split(
            " (",
        );

        const name = user[0];
        const email = user[1].replace(")", "");

        handleEdit(id, name, email);
    } else if (target.classList.contains("delete")) {
        const id = target.getAttribute("data-id");
        handleDelete(id);
    }
});

renderUsers();