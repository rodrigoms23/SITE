window.onload = function () {
  const spanData = document.getElementById('spanData');
  const spanFone = document.getElementById('spanFone');
  spanData.textContent = 'campo não obrigatório';
  spanFone.textContent = 'campo não obrigatório';
  document.querySelector('#limpar').style.display= 'none';
  document.querySelector('#envio').style.display= 'none';
  const botaoVerif = document.querySelector('#verificador');
  botaoVerif.addEventListener('click', validaForm);
  document.forms.formulario.onsubmit = validaForm;
};
function mostrarDados() {
  const nome = document.querySelector('#nome');
  const email = document.querySelector('#email');
  const cpf = document.querySelector('#cpf');
  const data = document.querySelector('#data');
  const telefone = document.querySelector('#telefone');
  const resultado = document.querySelector('.resultado');
  const radio = document.getElementsByName('estadocivil');
  const checkbox = document.getElementsByName('motivo');
  resultado.style.color = 'green';
  resultado.style.background = 'darkblue';
  resultado.innerHTML = '';
  resultado.innerHTML += nome.value + ' | ';
  resultado.innerHTML += cpf.value + ' | ';
  resultado.innerHTML += email.value + ' | ';
  resultado.innerHTML += data.value + ' | ';
  resultado.innerHTML += telefone.value + ' | ';
  for (let item of radio) {
    if (item.checked) resultado.innerHTML += item.value + ' | ';
  }
  for (let item of checkbox) {
    if (item.checked) resultado.innerHTML += item.id + ' | ';
  }
}
function validaForm(e) {
  let form = e.target;
  let formValido = true;
  const spanNome = document.getElementById('spanNome');
  const spanCpf = document.getElementById('spanCpf');
  const spanEmail = document.getElementById('spanEmail');
  const bordaNome = document.getElementById('nome');
  const bordaCpf = document.getElementById('cpf');
  const bordaEmail = document.getElementById('email');
  //VERIFICA NOME VAZIO

  if (form.nome.value == '') {
    formValido = false;
    spanNome.textContent = 'NOME NÃO PODE SER VAZIO';
    bordaNome.style.border = ' 2px solid red';
  } else {
    spanNome.textContent = '';
    bordaNome.style.border = ' 2px solid gray';
  }

  //VERIFICA CPF VAZIO
  if (form.cpf.value == '') {
    formValido = false;
    spanCpf.textContent = 'CPF NÃO PODE SER VAZIO';
    bordaCpf.style.border = ' 2px solid red';
  } else {
    if (form.cpf.value.length != 11) {
      spanCpf.textContent = 'CPF TEM QUE TER 11 DÍGITOS';
    } else {
      spanCpf.textContent = '';
      bordaCpf.style.border = ' 2px solid gray';
    }
  }

  //VERIFICA EMAIL VAZIO @  e .com
  if (form.email.value == '') {
    formValido = false;
    spanEmail.textContent = 'EMAIL NÃO PODE SER VAZIO';
    bordaEmail.style.border = ' 2px solid red';
  } else {
    if (form.email.value.search('@') == -1)
      spanEmail.textContent = 'Email sem @';
    else if (form.email.value.search('.com') == -1)
      spanEmail.textContent = 'Email sem .com';
    else {
      spanEmail.textContent = '';
      bordaEmail.style.border = ' 2px solid gray';
      console.log("entrei ");
    }
  }

  // VERIFICA SE ESCOLHEU ESTADO CIVIL
  const listaCivil = document.querySelectorAll('.alternativas');
  console.log(listaCivil);
  const tituloCivil = document.getElementById('civil');
  const bordaCivil = document.querySelector('.estadoCivil');
  for (let radio of listaCivil)
    if (radio.checked) {
      tituloCivil.textContent = 'Estado civil';
      bordaCivil.style.border = '2px solid gray';
      break;
    } else {
      tituloCivil.textContent = 'Escolha pelo menos 1';
      bordaCivil.style.border = '2px solid red';
    }

  //VERIFICA MOTIVO CONTATO PELO MENOS 1
  const listaContato = document.querySelectorAll('.alternativas2');
  const tituloCont = document.querySelector('.contato');
  const bordaContato = document.querySelector('.motivoContato');
  let quant = 0;
  for (let checkbox of listaContato) {
    if (checkbox.checked) {
      quant++;
    }
  }
  if (quant <= 0 || quant > 2) {
    formValido = false;
    tituloCont.textContent = 'Escolha apenas 1 ou 2 opções';
    bordaContato.style.border = '2px solid red';
  } else {
    tituloCont.textContent = 'Motivo do Contato';
    bordaContato.style.border = '2px solid gray';
  }
  /////VERIFICA SE FORMVALIDO == TRUE OU FALSE/////
  const verifi = e.submitter.innerHTML;
  console.log(e.submitter.innerHTML, 'form valido');

  /////VERIFICA SE FORMVALIDO == TRUE OU FALSE/////
  if (!formValido) e.preventDefault();
  else {
    e.preventDefault();
    mostrarDados();
    visualizaOpc();
    document.querySelector('#limpar').style.display= 'block';
    document.querySelector('#envio').style.display= 'block';
    document.querySelector("#envio").addEventListener('click',x);
  }
}
function x(){
  console.log("deucerto")
}
function resetar() {
  document.location.reload(true); //recarregar a pagina
}
function visualizaOpc() {
  //não deixa usuario alterar campos
  document.getElementById('nome').disabled = true;
  document.getElementById('email').disabled = true;
  document.getElementById('cpf').disabled = true;
  document.getElementById('telefone').disabled = true;
  document.getElementById('data').disabled = true;
  document.getElementById('estadoCivil').disabled = true;
  document.getElementById('motivoContato').disabled = true;
  document.querySelector('#verificador').style.display= 'none';
}
function botaoLimpar() {
  const spanNome = document.getElementById('spanNome');
  const spanCpf = document.getElementById('spanCpf');
  const spanEmail = document.getElementById('spanEmail');
  const tituloCont = document.querySelector('.contato');
  const tituloCivil = document.getElementById('civil');

  spanNome.textContent = '';
  spanCpf.textContent = '';
  spanEmail.textContent = '';
  tituloCont.textContent = 'Motivo do Contato';
  tituloCivil.textContent = 'Estado civil';
}
