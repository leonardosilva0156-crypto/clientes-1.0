const email = document.getElementById('email');
const nome = document.getElementById('nome');

const click = document.getElementById('add');

click.addEventListener('click', (e) => {
    const elemento = e.preventDefault();

   if (nome.value.trim() === "") {
    return;}

    if (email.value.trim() === "") {
    return;}

    fetch('https://crudcrud.com/api/a09f2b66bfc443349b6dfec3d34223ae/clientes', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },

        body: JSON.stringify({
            nome: nome.value,
            email: email.value
        }),
    })

    .then((Response)  => Response.json())
    .then((data) => {
        const li = document.createElement('li');
        li.innerHTML = `${data.nome}` + ` - ${data.email}`;
        const ul = document.querySelector('ul');

        const del = document.createElement('button');
        del.textContent = 'X';
        del.classList.add('delete');
        del.addEventListener('click', () => {

            fetch(`https://crudcrud.com/api/a09f2b66bfc443349b6dfec3d34223ae/clientes/${data.id}`,{
                method: 'DELETE',
            });
            li.remove();
        });
        
        ul.appendChild(li);
        li.appendChild(del);

         nome.value = '';
         email.value = '';
    });
fetch('https://crudcrud.com/api/a09f2b66bfc443349b6dfec3d34223ae/clientes')
 .then((response) => response.json())
 .then((data) => {
    data.forEach((Element) => {
        const li = document.createElement('li');
        li.innerHTML = `${elemento.nome}`;
        const ul = document.querySelector('ul');

        const del = document.createElement('button');
        del.textContent = 'X';
        del.classList.add('delete');
        del.addEventListener('click', () => {

            fetch(`https://crudcrud.com/api/a09f2b66bfc443349b6dfec3d34223ae/clientes/${data.id}`,{
                method: 'DELETE',
            });
            li.remove();
        });
        
        ul.appendChild(li);
        li.appendChild(del);



    });

})

})

