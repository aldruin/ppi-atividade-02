async function carregarPacote(id) {
  try {
    const response = await fetch(`http://localhost:3000/pacotes/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar os dados do pacote");

    const pacote = await response.json();

    document.getElementById("idPacote").value = pacote.id;
    document.getElementById("destino").value = pacote.destino;
    document.getElementById("descricao").value = pacote.descricao;
    document.getElementById("data_partida").value = pacote.data_partida.split("T")[0];
    document.getElementById("data_retorno").value = pacote.data_retorno.split("T")[0];
    document.getElementById("preco").value = parseFloat(pacote.preco).toFixed(2);
  } catch (error) {
    console.error("Erro ao carregar pacote:", error);
    alert("Erro ao carregar os dados do pacote.");
  }
}

async function atualizarPacote(event) {
  event.preventDefault();

  const id = document.getElementById("idPacote").value;
  const destino = document.getElementById("destino").value;
  const descricao = document.getElementById("descricao").value;
  const data_partida = document.getElementById("data_partida").value;
  const data_retorno = document.getElementById("data_retorno").value;
  const preco = parseFloat(document.getElementById("preco").value).toFixed(2);

  const pacoteAtualizado = {
    destino,
    descricao,
    data_partida,
    data_retorno,
    preco
  };

  try {
    const response = await fetch(`http://localhost:3000/pacotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pacoteAtualizado)
    });

    if (!response.ok) throw new Error("Erro ao atualizar o pacote");

    alert("Pacote atualizado com sucesso!");
    window.location.href = "pacotes.html";
  } catch (error) {
    console.error("Erro ao atualizar pacote:", error);
    alert("Erro ao atualizar o pacote.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id) {
    carregarPacote(id);
  }

  const form = document.getElementById("formEditarPacote");
  form.addEventListener("submit", atualizarPacote);
});
