async function carregarPacotes() {
  try {
    const response = await fetch("http://localhost:3000/pacotes");
    if (!response.ok) throw new Error("Erro ao buscar os pacotes");

    const pacotes = await response.json();
    const container = document.getElementById("pacotesContainer");
    container.innerHTML = "";

    pacotes.forEach(pacote => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pacote.id}</td>
        <td>${pacote.destino}</td>
        <td>${new Date(pacote.data_partida).toLocaleDateString("pt-BR")}</td>
        <td>${new Date(pacote.data_retorno).toLocaleDateString("pt-BR")}</td>
        <td>R$ ${parseFloat(pacote.preco).toFixed(2)}</td>
        <td>
          <a href="details.html?id=${pacote.id}" class="btn btn-primary btn-sm">Visualizar</a>
          <a href="editar-pacote.html?id=${pacote.id}" class="btn btn-warning btn-sm">Editar</a>
          <button class="btn btn-danger btn-sm" onclick="excluirPacote(${pacote.id})">Excluir</button>
        </td>
      `;
      
      container.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar pacotes:", error);
  }
}

async function excluirPacote(id) {
  if (confirm("Tem certeza que deseja excluir este pacote?")) {
    try {
      const response = await fetch(`http://localhost:3000/pacotes/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Erro ao excluir o pacote");
      
      alert("Pacote excluído com sucesso!");
      carregarPacotes();
    } catch (error) {
      console.error("Erro ao excluir pacote:", error);
      alert("Erro ao excluir o pacote.");
    }
  }
}

document.addEventListener("DOMContentLoaded", carregarPacotes);
