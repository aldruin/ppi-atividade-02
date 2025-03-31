async function carregarDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    document.body.innerHTML = "<h2>ID do pacote não fornecido!</h2>";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/pacotes/${id}`);
    if (!response.ok) {
      throw new Error("Pacote não encontrado");
    }

    const pacote = await response.json();

    if (!pacote) {
      document.body.innerHTML = "<h2>Pacote não encontrado!</h2>";
      return;
    }

    document.getElementById("titulo").textContent = `Pacote para ${pacote.destino}`;
    document.getElementById("descricao").textContent = `Descrição: ${pacote.descricao || "Sem descrição disponível"}`;
    document.getElementById("data_partida").textContent = `Partida: ${new Date(pacote.data_partida).toLocaleDateString("pt-BR")}`;
    document.getElementById("data_retorno").textContent = `Retorno: ${new Date(pacote.data_retorno).toLocaleDateString("pt-BR")}`;
    document.getElementById("preco").textContent = `Preço: R$ ${parseFloat(pacote.preco).toFixed(2)}`;

    window.precoUnitario = pacote.preco;
    atualizarValorTotal();
  } catch (error) {
    console.error("Erro ao carregar detalhes:", error);
    document.body.innerHTML = "<h2>Erro ao carregar os detalhes do pacote!</h2>";
  }
}

function atualizarValorTotal() {
  const quantidade = parseInt(document.getElementById("quantidade").value) || 1;
  const valorTotal = window.precoUnitario * quantidade;
  document.getElementById("valorTotal").textContent = `R$ ${valorTotal.toFixed(2)}`;
}

document.addEventListener("input", function (event) {
  if (event.target.id === "quantidade") {
    atualizarValorTotal();
  }
});

document.addEventListener("DOMContentLoaded", carregarDetalhes);
