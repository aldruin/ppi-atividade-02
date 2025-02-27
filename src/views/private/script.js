async function carregarDetalhes() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) return;

  try {
    const response = await fetch(`http://localhost:3000/pacotes/${id}`);
    const pacote = await response.json();

    if (!pacote) {
      document.body.innerHTML = "<h2>Pacote não encontrado!</h2>";
      return;
    }

    document.getElementById("titulo").textContent = `Pacote para ${pacote.destino}`;
    document.getElementById("descricao").textContent = `Descrição: ${pacote.descricao || "Sem descrição disponível"}`;
    document.getElementById("data").textContent = `Data: ${new Date(pacote.data_partida).toLocaleDateString()}`;
    document.getElementById("preco").textContent = `Preço: R$ ${pacote.preco}`;

    window.precoUnitario = pacote.preco;
    atualizarValorTotal();
  } catch (error) {
    console.error("Erro ao carregar detalhes:", error);
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