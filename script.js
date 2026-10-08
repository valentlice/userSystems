const form = document.querySelector('#formCadastro');


form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(Object.fromEntries([...form.elements]
        .filter(element => element.id)
        .map(element => [element.id, element.value])));
});

