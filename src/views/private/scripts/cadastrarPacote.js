document.getElementById('formCadastroPacote').addEventListener('submit', async function(event) {
  event.preventDefault();

  const destino = document.getElementById('destino').value;
  const data_partida = document.getElementById('data_partida').value;
  const data_retorno = document.getElementById('data_retorno').value;
  const preco = document.getElementById('preco').value;
  const descricao = document.getElementById('descricao').value;

  if (!destino || !data_partida || !data_retorno || !preco || !descricao) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const pacoteData = {
    destino,
    data_partida,
    data_retorno,
    preco,
    descricao
  };

  try {
    const response = await fetch('http://localhost:3000/pacotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pacoteData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('Pacote cadastrado com sucesso!');
      window.location.href = 'pacotes.html'; // Redireciona para a lista de pacotes
    } else {
      alert('Erro ao cadastrar pacote: ' + data.error);
    }
  } catch (error) {
    alert('Erro ao conectar ao servidor: ' + error.message);
  }
});
