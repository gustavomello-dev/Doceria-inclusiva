import { doceslac, docesacu } from "./js/doces.js";
const itens = doceslac
const doces = docesacu

const produtosUm = document.querySelector('[data-js = proum]')
const produtosDois = document.querySelector('[data-js = prodois]')
const inputFilter = document.querySelector('#input_filter')


const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const modalImg = document.querySelector("#modalImg");
const modalNome = document.querySelector("#modalNome");
const modalDescricao = document.querySelector("#modalDescricao");
const modalValor = document.querySelector('#modalValor')

const fazerPedido = document.querySelector("#fazerPedido");
const finalizarPedido = document.querySelector("#finalizarPedido");
const whatsapp = document.querySelector('#icon-what')

const fundoCarrinho = document.querySelector('#carrinho')
const itemCarrinho = document.querySelector('.item-carrinho')
const iconCarrinho = document.querySelector('#icon-carrinho')
const closeCarrinho = document.querySelector('#closeCarrinho')
const texto = document.querySelector('#texto')
const limparCarrinho = document.getElementById("limparCarrinho");
const couter = document.querySelector('#text_couter')

const telefone = '+5511997993894'
const nome = 'Gustavo'
const ty = '7 Brigadeiros'

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


couter.innerHTML = carrinho.length

class Pedido{
    constructor(nome, pedido){
        this.nome = nome;
        this.pedido = pedido;

    }

    mensagem(){
        return `Olá sou o ${this.nome} e quero fazer o seguinte pedido ${this.pedido}`;
    }
}

carrinho.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `Olá sou o ${p.nome} e quero fazer o seguinte pedido ${p.pedido}`;
    texto.appendChild(li);

    
});


produtosUm.innerHTML = itens.map(item =>{
            return `
                <div class="card">
                    <img src="${item.img}" alt="${item.alt}">
                    <h3>${item.nome}</h3>
                    <p id="descricao" >${item.descricao}</p>
                    <p  id="valor" ><strong>${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
                </div>`}
).join('')

produtosDois.innerHTML = doces.map(item =>{
            return `
                <div class="card">
                    <img src="${item.img}" alt="${item.alt}">
                    <h3>${item.nome}</h3>
                    <p id="descricao" >${item.descricao}</p>
                    <p id="valor"><strong>${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
                </div>`}
).join('')


function filtroPorNome () {
    const busca = document.querySelector('#input_filter').value.toLowerCase();
    const itens = document.querySelectorAll('.card');

    itens.forEach(item => {
        const name = item.querySelector('.card > h3')?.textContent.toLowerCase() || '';

        if(name.includes(busca)) {
            item.style.display = 'grid'
        } else {
            item.style.display = 'none'
        }
    })
}

inputFilter.addEventListener('input', filtroPorNome);

document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return; // clicou fora

    const img = card.querySelector("img").src;
    const alt = card.querySelector("img").alt;
    const nome = card.querySelector("h3").textContent;
    const descricao = card.querySelector("#descricao").textContent;
    const valor = card.querySelector('#valor').textContent;

    modalImg.src = img;
    modalImg.alt = alt;
    modalNome.textContent = nome;
    modalDescricao.textContent = descricao;
    modalValor.textContent = valor

    modal.style.display = "flex";
});


closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// fechar clicando fora
window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

fazerPedido.addEventListener("click", () => {
    const qtd = Number(prompt("Digite a quantidade:"));
    if (qtd) {
        const nomeCliente = prompt("Digite seu nome:");
        const formatdo = nomeCliente.charAt(0).toUpperCase() + nomeCliente.slice(1).toLowerCase()
    if (nomeCliente) {
        
        const pedido = new Pedido(formatdo, `${qtd}x ${modalNome.textContent}`);

        const precoTexto = modalValor.textContent.replace(/[R$\s]/g, '').replace(',', '.');  
        const preco = parseFloat(precoTexto);
        const valor = qtd * preco;


      // adiciona no carrinho
        carrinho.push({ nome: pedido.nome, pedido: pedido.pedido, preco:valor });
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

      // adiciona visualmente na lista
        const li = document.createElement("li");
        li.textContent = pedido.mensagem();
        texto.appendChild(li);

        couter.innerHTML = carrinho.length

        modal.style.display = "none";
    }
    }
});

// botão finalizar pedido
finalizarPedido.addEventListener("click", () => {
    if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
    }

    const mensagens = carrinho.map(p => `Olá sou o ${p.nome} e quero fazer o seguinte pedido ${p.pedido}`).join("\n");
    const mensagemFinal = `🛒 Meu pedido:\n${mensagens}`;
    

    
    window.open(`https://wa.me/${telefone}?text=${mensagemFinal}`, '_blank');
})

iconCarrinho.addEventListener('click', () => {
    fundoCarrinho.style.display = "flex";
})

closeCarrinho.addEventListener("click", () => {
    fundoCarrinho.style.display = "none";
});

// fechar clicando fora
window.addEventListener("click", e => {
    if (e.target === fundoCarrinho) {
        fundoCarrinho.style.display = "none";
    }
});

limparCarrinho.addEventListener("click", () => {
    if (confirm("Deseja realmente limpar o carrinho?")) {
        carrinho = []; // zera o array
        localStorage.removeItem("carrinho"); // remove do storage
        texto.innerHTML = ""; // limpa lista visual
        alert("Carrinho limpo com sucesso!");
    }

    couter.innerHTML = carrinho.length
});

whatsapp.addEventListener('click', () => {
    window.open(`https://wa.me/${telefone}`, '_blank');
})