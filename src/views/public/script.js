async function carregarPacotes() {
  try {
    const response = await fetch("http://localhost:3000/pacotes");
    if (!response.ok) throw new Error("Erro ao buscar os pacotes");

    const pacotes = await response.json();
    const container = document.getElementById("pacotesContainer");
    container.innerHTML = "";

    pacotes.forEach(pacote => {
      const card = document.createElement("div");
      card.classList.add("col-12", "mb-3");

      card.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${pacote.destino}</h5>
                <p class="card-text">Partida: ${new Date(pacote.data_partida).toLocaleDateString("pt-BR")}</p>
                <p class="card-text">Retorno: ${new Date(pacote.data_retorno).toLocaleDateString("pt-BR")}</p>
                <p class="card-text">Preço: R$${parseFloat(pacote.preco).toFixed(2)}</p>
                <a href="/details.html?destino=${encodeURIComponent(pacote.destino)}&data=${encodeURIComponent(new Date(pacote.data_partida).toLocaleDateString("pt-BR"))}&preco=${encodeURIComponent(pacote.preco)}&descricao=${encodeURIComponent(pacote.descricao)}" class="btn btn-primary">Ver detalhes</a>
              </div>
            </div>
          `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar pacotes:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarPacotes);
