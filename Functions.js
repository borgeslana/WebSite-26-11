const listaPedido = [];

function adicionarPedido(item) {
    if (!item || item.trim() === '') {
        alert('O item não pode estar vazio!');
        return;
    }
    listaPedido.push(item.trim());
    atualizarPedido();
}

function atualizarPedido() {
    const lista = document.getElementById('lista-pedido');
    if (!lista) {
        console.error('Elemento com ID "lista-pedido" não encontrado.');
        return;
    }
    lista.innerHTML = ''; // Limpa a lista antes de atualizá-la

    listaPedido.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => removerPedido(index);

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

function removerPedido(index) {
    if (index >= 0 && index < listaPedido.length) {
        listaPedido.splice(index, 1);
        atualizarPedido();
    } else {
        console.error('Índice inválido para remoção:', index);
    }
}

function finalizarPedido() {
    if (listaPedido.length === 0) {
        alert('Nenhum item no pedido para finalizar.');
        return;
    }

    // Enviar o pedido para o servidor
    fetch('processa_pedido.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listaPedido),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'sucesso') {
                alert(data.mensagem);
                listaPedido.length = 0; // Limpa o array
                atualizarPedido();
            } else {
                alert(`Erro: ${data.mensagem}`);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar o pedido:', error);
            alert('Erro ao enviar o pedido. Tente novamente.');
        });
}