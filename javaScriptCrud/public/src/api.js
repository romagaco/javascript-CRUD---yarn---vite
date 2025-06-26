const API_URL ="https://jsonplaceholder.typicode.com/users";


//getUsers
export const getUsers = async () => {
    const response = await fetch(API_URL);

    return await response.json();
};

//geleteUsers 
export const deleteUsers = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

//editUsers
export const updateUser = async (user) => {
    /* let response = null;
    if (!user.ide){
        // agregamos usuario
        response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    } else {
        response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return await response.json();
    }; */
    // simplificamos el codigo de arriba
    const url = user.id? `${API_URL}/${id}` : API_URL;
    const method = user.id ? "PUT" : "POST";

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return await response.json();
};

//condicion que indique si el usuario esta siendo editado