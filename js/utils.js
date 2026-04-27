export function validarcampos(nome,email){
return nome.trim() === "" && email.trim() === "";

}

export function criarelemento (tag, texto = ""){
    const el = document.createElement(tag);
    el.textContent = texto;
    return el;
}