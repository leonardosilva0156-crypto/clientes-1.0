import { validarcampos, criarelemento } from "./utils.js";


export class clienteapp {
    constructor (){
        this.email = document.getElementById('email');
        this.nome = document.getElementById('nome');
        this.botao = document.getElementById('add');
        this.ul = document.querySelector('ul')
        this.clientes = [];
        this.api ='https://crudcrud.com/api/b4edb29121364f02a9fa42486080f84b/clientes'
    }

    init(){
        this.botao.addEventListener('click', (e) => this.adicionarcliente(e));
        this.carregarclientes();
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
            this.clientes.push(data);
            this.renderizarlista();
            this.limparcampos();
        });
    }

    carregarclientes(){
        fetch(this.api)
        .then(res => res.json())
        .then(data => {
            this.clientes = data;

            const total = 
            this.clientes.reduce((acc) => acc + 1,0);
            
            
            this.renderizarlista();
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

    deletarcliente(id){
        fetch(`${this.api}/${id}`, {
            method: 'DELETE'
        })
        
        .then(Response => {
            if(!Response.ok){
                throw new error(`Erro: ${Response.status} ${Response.statustext}`);
            }
            return Response.json;

        })

        .then(() => {
            alert('cliente deletado com sucesso');
        })

        .catch(error => {
            alert("Erro ao deletar cliente: " + error.message);
        })
        
    
        const cliente = this.clientes.find(c => c._id === id);
        this.renderizarlista();
    }

    limparcampos(){
        this.nome.value = '';
        this.email.value = '';
    }

    


}

