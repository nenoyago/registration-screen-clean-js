function cadastrarDados() {
    let campoNome = document.getElementById('Nome')
    let campoCpf = document.getElementById('Cpf')
    let campoNota = document.getElementById('Nota')
    let notaFormatada = Number(document.getElementById('Nota').value).toFixed(1)
    let corpoTabela = document.getElementById('corpoTabela')


    if (campoNome.value == '' || campoCpf.value == '' || notaFormatada == '') {
        alert('Insira seus dados!')
    } else if (validaCPF(campoCpf.value)) {
        alert('CPF inválido!')
        campoCpf.style.borderColor = '#ff0000'
        campoCpf.style.color = 'red'
    } else if (!isNumber(notaFormatada)) {
        alert('Campo NOTA inválido!')
        campoNota.style.borderColor = '#ff0000'
        campoNota.style.color = 'red'
    } else if (notaFormatada < 0 || notaFormatada > 10) {
        alert('Nota inválida!')
        campoNota.style.borderColor = '#ff0000'
        campoNota.style.color = 'red'
    } else if (isNumber(campoCpf.value) || isNumber(notaFormatada)) {
        let linha = document.createElement('tr')
        let colNome = document.createElement('td')
        let colCpf = document.createElement('td')
        let colNota = document.createElement('td')
        let colAlt = document.createElement('td')
        let colDel = document.createElement('td')

        let btnAlt = document.createElement('button')
        btnAlt.setAttribute('id', 'btnAlt')
        let lblAlt = document.createTextNode('Alterar')
        btnAlt.appendChild(lblAlt)

        let btnDel = document.createElement('button')
        btnDel.setAttribute('id', 'btnDel')
        let lblDel = document.createTextNode('Remover')
        btnDel.appendChild(lblDel)

        let txtNome = document.createTextNode(campoNome.value)
        let txtCpf = document.createTextNode(campoCpf.value)
        let txtNota = document.createTextNode(notaFormatada)

        colNome.appendChild(txtNome)
        colCpf.appendChild(txtCpf)
        colNota.appendChild(txtNota)
        colAlt.appendChild(btnAlt)
        colDel.appendChild(btnDel)

        linha.appendChild(colNome)
        linha.appendChild(colCpf)
        linha.appendChild(colNota)
        linha.appendChild(colAlt)
        linha.appendChild(colDel)
        corpoTabela.appendChild(linha)

        alterarElemento(colNota, txtNota, btnAlt)
        removerElemento(btnDel)

        campoNome.value = ''
        campoCpf.value = ''
        campoNota.value = ''
        campoNota.style.borderColor = 'transparent'
        campoNota.style.color = 'black'
        campoCpf.style.borderColor = 'transparent'
        campoCpf.style.color = 'black'
        campoNome.focus()
    }
}

function alterarElemento(colNota, txtNota, btnAlt) {
    btnAlt.addEventListener('click', function(){
        let inputNota = document.createElement('input')
        inputNota.setAttribute('id', 'inputNota')
        inputNota.setAttribute('type', 'text')
        inputNota.setAttribute('placeholder', '0 - 10')
        inputNota.setAttribute('maxlength', '4')
        inputNota.setAttribute('size', '4')
        let btnSalvar = document.createElement('button')
        btnSalvar.setAttribute('id', 'btnSalvar')
        let txtBtnSalvar = document.createTextNode('Salvar')
        btnSalvar.appendChild(txtBtnSalvar)
        colNota.removeChild(txtNota)
        colNota.appendChild(inputNota)
        colNota.appendChild(btnSalvar)

        btnSalvar.onclick = function () {
            let altNota = Number(document.getElementById('inputNota').value).toFixed(1)
            let altNotaTxt = document.createTextNode(altNota)
            if (altNota == '' || !isNumber(altNota) || altNota < 0 || altNota > 10) {
                alert('Campo NOTA inválido! Digite apenas valores númericos.')
                inputNota.style.borderColor = '#ff0000'
                inputNota.style.color = 'red'
            } else if (altNota != '') {
                txtNota = altNotaTxt
                colNota.removeChild(inputNota)
                colNota.removeChild(btnSalvar)
                colNota.appendChild(txtNota)
            }

        }
    })

}

function removerElemento(btnDel) {
    btnDel.onclick = function () {
        let r = confirm('Tem certeza que deseja excluir este registro?')
        if (r == true)
            corpoTabela.deleteRow(this)
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function validaCPF(campoCpf) {
    var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
    return cpfValido.test(campoCpf) ? false : true
}


function mascaraCPF(i) {
    var v = i.value;

    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14")
    if (v.length == 3 || v.length == 7) {
        i.value += ".";
    } if (v.length == 11) {
        i.value += "-"
    }
}


// evento para disparar a tecla enter
document.addEventListener('keypress', function (e) {
    if (e.which == 13) {
        cadastrarDados()
    }
}, false);
