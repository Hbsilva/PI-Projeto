// models.js

// Modelo de Usuário
class Usuario {
    constructor(nome, sobrenome, senha, dataNascimento, endereco) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
    }

    static salvarUsuario(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    static obterUsuario() {
        return JSON.parse(localStorage.getItem('usuario'));
    }
}

// Modelo de Atividade
class Atividade {
    constructor(tipo, data, horario, local, convidados, duracao) {
        this.tipo = tipo;
        this.data = data;
        this.horario = horario;
        this.local = local;
        this.convidados = convidados;
        this.duracao = duracao;
    }

    static salvarAtividades(atividades) {
        localStorage.setItem('atividades', JSON.stringify(atividades));
    }

    static obterAtividades() {
        return JSON.parse(localStorage.getItem('atividades')) || [];
    }

    static adicionarAtividade(atividade) {
        const atividades = Atividade.obterAtividades();
        atividades.push(atividade);
        Atividade.salvarAtividades(atividades);
    }
}
