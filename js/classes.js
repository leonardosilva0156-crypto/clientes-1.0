import { validarcampos, criarelemento } from "./utils.js";


export class clienteapp {
    constructor (){
        this.email = document.getElementById('email');
        this.nome = document.getElementById('nome');
        this.botao = document.getElementById('add');
        this.ul = document.querySelector('ul')
        this.clientes = [];
        this.api ='https://crudcrud.com/api/0b1bb6fbdb96471d8cba147fae74d51e/clientes';
    }

    init(){
        this.botao.addEventListener('click', (e) => this.adicionarcliente(e));
        
    }

    adicionarcliente(e){
        e.preventDefault();

        if(!validarcampos(this.nome.value, this.email.value)) return;

        fetch(this.api, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                nome : this.nome.value,
                email : this.email.value,
            })
        })

        .then(res => res.json())
        .then(data => {
            this.clientes = this.clientes.filter((cliente) => cliente.id !== data._id);
            this.clientes.push(data);
            this.renderizarlista();
            this.limparcampos();
            
        });
    }

    renderizarlista(){
        this.ul.innerHTML = "";

        this.clientes.map(cliente => {
            const li = criarelemento('li', `${cliente.nome} - ${cliente.email}`);

            const del = criarelemento('button', 'X');

            del.addEventListener('click', () => {
                this.deletarcliente(cliente._id);


            });
            li.appendChild(del);
            this.ul.appendChild(li);

        });
         
    }


    limparcampos(){
        this.nome.value = "";
        this.email.value = "";
        this.nome.focus();
    };

    deletarcliente(id){
        fetch(`${this.api}/${id}`,{
            method: 'DELETE',
        })
        .then(() => {
             this.clientes =  this.clientes.filter((cliente) => cliente._id !== id);
             this.renderizarlista();

        });

        


    }}
