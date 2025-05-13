// controllers.js

class LoginController {
    static realizarLogin(nome, senha) {
        const usuario = Usuario.obterUsuario();
        if (usuario && usuario.nome === nome && usuario.senha === senha) {
            sessionStorage.setItem('usuarioLogado', nome);
            location.href = 'home.html';
        } else {
            alert('Nome ou senha inválidos!');
        }
    }
}

class UsuarioController {
    static cadastrarUsuario(nome, sobrenome, senha, dataNascimento, endereco) {
        const novoUsuario = new Usuario(nome, sobrenome, senha, dataNascimento, endereco);
        Usuario.salvarUsuario(novoUsuario);
        alert('Usuário cadastrado com sucesso!');
        location.href = 'index.html';
    }

    static carregarUsuarioLogado() {
        const usuarioLogado = sessionStorage.getItem('usuarioLogado');
        View.atualizarBemVindo(usuarioLogado);
    }
}

class AtividadeController {
    static carregarAtividades() {
        const atividades = Atividade.obterAtividades();
        View.renderizarAtividades(atividades);
    }

    static adicionarAtividade(tipo, data, horario, local, convidados, duracao) {
        const novaAtividade = new Atividade(tipo, data, horario, local, convidados, duracao);
        Atividade.adicionarAtividade(novaAtividade);
        this.carregarAtividades();
    }

    static removerAtividade(index) {
        const atividades = Atividade.obterAtividades();
        atividades.splice(index, 1);
        Atividade.salvarAtividades(atividades);
        this.carregarAtividades();
    }

    static concluirAtividade(index) {
        alert(`Atividade ${index + 1} concluída!`);
    }
}


class PerfilController {
    static carregarPerfil() {
        const usuario = Usuario.obterUsuario();
        if (usuario) {
            document.getElementById("nomeUsuario").textContent = usuario.apelido || usuario.nome + " " + usuario.sobrenome;
        }

        const meta = localStorage.getItem("metaKm") || 0;
        const percorridos = localStorage.getItem("percorridosKm") || 0;
        const amigos = JSON.parse(localStorage.getItem("amigos")) || [];

        document.getElementById("metaKm").textContent = `${meta} km`;
        document.getElementById("quantidadeAmigos").textContent = amigos.length;
        PerfilController.atualizarProgresso(meta, percorridos);
        PerfilController.carregarAtividades();
    }

    static abrirEdicao() {
        const novoApelido = prompt("Digite seu apelido (opcional):");
        const novaMeta = prompt("Digite sua meta de quilômetros:");

        if (novaMeta && !isNaN(novaMeta)) {
            localStorage.setItem("metaKm", novaMeta);
        }

        if (novoApelido) {
            const usuario = Usuario.obterUsuario();
            usuario.apelido = novoApelido;
            Usuario.salvarUsuario(usuario);
        }

        PerfilController.carregarPerfil();
    }

    static carregarFoto(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function () {
            const foto = reader.result;
            document.getElementById("fotoUsuario").src = foto;
            localStorage.setItem("fotoPerfil", foto);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    static atualizarProgresso(meta, percorridos) {
        const barra = document.getElementById("barraProgresso");
        const status = document.getElementById("statusKm");

        const percentual = (percorridos / meta) * 100;
        barra.style.width = `${percentual}%`;
        status.textContent = `${percorridos} km de ${meta} km`;
    }
}
