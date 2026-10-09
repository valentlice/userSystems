const form = document.querySelector('#formCadastro');
const buscarCep = document.querySelector('#buscarCep');
const cep = document.querySelector('#cep');
const estado = document.querySelector(`#estado`);

function mensagem(texto, tipo = "sucesso") {
    Toastify({
        text: texto,
        duration: 3000, 
        gravity: "top",
        position: "right",
        style: {
            backgroundColor: tipo === "sucesso" 
            ? "#198754" 
            : "#dc3545"

        }
    }).showToast();
}

buscarCep.addEventListener("click", async function() {
    const valor = cep.value.replace(/\D/g, '');
    if (valor.length !== 8) {
        mensagem("Digite um CEP válido.", "erro");
        return;
     } try {
            const resposta = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
            const dados = await resposta.json();
            console.log(dados);
            if(!resposta.ok || dados.erro) 
                throw new Error("CEP não encontrado.");
            document.querySelector('#logradouro').value = dados.logradouro
            document.querySelector('#bairro').value = dados.bairro
            document.querySelector('#cidade').value = dados.localidade
            document.querySelector('#estado').value = dados.uf

            mensagem("Endereço encontrado!");

        } catch (erro) {
            mensagem(erro.message, "erro");
           
        }
    
});


form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(Object.fromEntries([...form.elements]
        .filter(element => element.id)
        .map(element => [element.id, element.value])
    ));
    form.reset();
});

function adicionarOpcao(select, texto, valor){
    select.add(new Option(texto, valor))
}

async function carregarEstados () {
try {
   const resposta = await fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
   if (!resposta.ok){
    throw new Error("Não foi posssivel carregar estados.")
   }
   const estados = await resposta.json();
     estados.forEach(item => adicionarOpcao(estado, item.nome, item.sigla ))
} catch(erro){}

}
carregarEstados()


