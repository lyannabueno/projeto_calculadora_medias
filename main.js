const form = document.getElementById('form-atividade')

const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji festejando"/>';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado"/>';

const atividades = [];
const notas = [];

const spanAprovado = '<span class="resultado aprovado">Approved</span>';
const spanReprovado = '<span class="resultado reprovado">Disapproved</span>';

const initialScreen = document.getElementById('initial-screen');
const mainContent = document.getElementById('main-content');
const startButton = document.getElementById('start-button');
const userNumberInput = document.getElementById('user-number');
const alertMessage = document.getElementById('alert-message');

startButton.addEventListener('click', () => {
    const userNumber = parseFloat(userNumberInput.value.trim());
    if (userNumber) {
        alertMessage.style.display = 'none';
        initialScreen.style.display = 'none';
        mainContent.classList.remove('d-none');
    } else {
        alertMessage.style.display = 'block';    
    }
});

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    const activityMessage = document.getElementById('activity-message'); // Referência ao parágrafo

    if (atividades.includes(inputNomeAtividade.value)) {
        activityMessage.textContent = `The activity "${inputNomeAtividade.value}" has already been entered.`;
    } else {
        activityMessage.textContent = '';
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${parseFloat(inputNotaAtividade.value) >= parseFloat(userNumberInput.value) ? imgAprovado : imgReprovado}</td>`; 
        linha += '</td>'

        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= parseFloat(userNumberInput.value) ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i ++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}