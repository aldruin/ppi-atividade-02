(() => {
  'use strict';

  const form1 = document.getElementById('formCadastro');
  const form2 = document.getElementById('formCadastro2');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const continuar1 = document.getElementById('continuar1');
  const alertMessage = document.getElementById('alertMessage');
  const progressBar = document.getElementById('progressBar');

  let step1Data = {};


  continuar1.addEventListener('click', () => {
    console.log('Validando Passo 1');

    if (form1.checkValidity()) {
      console.log('Passo 1 validado');


      const step1FormData = new FormData(form1);
      step1FormData.forEach((value, key) => {
        step1Data[key] = value;
      });


      step1.classList.add('d-none');
      step2.classList.remove('d-none');
      progressBar.style.width = "100%";
      progressBar.textContent = "Passo 2 de 2";
    } else {
      console.log('Erro na validação do Passo 1');
      form1.classList.add('was-validated');
    }
  });


  form2.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form2);
    const data = { ...step1Data };

    formData.forEach((value, key) => {

      data[key] = value;
    });

    console.log('Dados enviados:', data);


    if (!data.nome || !data.telefone || !data.email || !data.senha || !data.cpf || !data.data_nascimento || !data.sexo) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    fetch('http://localhost:3000/clientes/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.success) {
        const alertMessage = document.getElementById('alertMessage');
        alertMessage.classList.remove('d-none');
        form1.reset();
        form2.reset();
        step1.classList.remove('d-none');
        step2.classList.add('d-none');

        setTimeout(() => {
          window.location.replace('login.html');
        }, 1500)
      } else {
        alert('Erro ao cadastrar, tente novamente.');
      }
    })
    .catch(error => {
      console.error('Erro ao tentar cadastrar:', error);
      alert('Erro ao tentar cadastrar. Por favor, tente novamente.');
    });
  });
})();
