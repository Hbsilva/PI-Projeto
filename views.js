// views.js

class View {
    // Atualiza a mensagem de boas-vindas
    static atualizarBemVindo(nomeUsuario) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Olá, ${nomeUsuario}!`;
        }
    }

    // Renderiza as atividades na página de atividades
    static renderizarAtividades(atividades) {
        const listaAtividades = document.getElementById('listaAtividades');
        if (listaAtividades) {
            listaAtividades.innerHTML = ''; // Limpa a lista

            atividades.forEach((atividade, index) => {
                const item = document.createElement('div');
                item.classList.add('atividade-item');
                item.innerHTML = `
                    <p>${atividade.tipo} - ${atividade.data} - ${atividade.horario}</p>
                    <button onclick="AtividadeController.editarAtividade(${index})">✏️</button>
                    <button onclick="AtividadeController.removerAtividade(${index})">🗑️</button>
                    <button onclick="AtividadeController.concluirAtividade(${index})">✔️</button>
                `;
                listaAtividades.appendChild(item);
            });
        }
    }
}
