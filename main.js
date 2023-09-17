const form = document.getElementById('form-atividade')

const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji festejando"/>';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado"/>';

const atividades = [];
const notas = [];

const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

const notaMinima = (parseFloat(prompt('Digite a nota mínima: '))); /* prompt é o input de python, por exemplo*/

let linhas = ''; /* ao retirar 'linhas' de dentro da função (e) ela é transformada em uma variável global e, logo, mantém seu estado entre múltiplos submit*/

form.addEventListener('submit', function(e) {
    e.preventDefault(); /* previne o comportamento padrão do evento de submissão do formulário, que é recarregar a página */

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value)); /* transforma a string em um número flutuante */

        let linha = '<tr>'; /* essas linhas estão criando uma string que representa uma linha de uma tabela HTML */
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; 
        /* ? = se for verdade 
        : = se for mentira */
        linha += '</td>'

        linhas += linha; /* concatena cada 'linha' à 'linhas' */
    }

    inputNomeAtividade.value = ''; /* os campos voltam a ficar vazios após o submit */
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody') /* seleciona o 1º elemento 'tbody' */
    corpoTabela.innerHTML = linhas; /* substitui todo o conteúdo anterior de 'tbody' pelo atual escrito em 'linha' */
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i ++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}