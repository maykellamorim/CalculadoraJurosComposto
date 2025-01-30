// Seleção dos elementos do formulário
const calcularBtn = document.getElementById("calcular");
const imprimirBtn = document.getElementById("imprimir");
const resultadoContainer = document.getElementById("resultado");

// Evento de clique para calcular as parcelas
calcularBtn.addEventListener("click", () => {
  const valor = parseFloat(document.getElementById("valor").value); // Valor da venda
  const juros = parseFloat(document.getElementById("juros").value) / 100; // Taxa de juros ao mês
  const dataEmissao = new Date(document.getElementById("dataEmissao").value);
  const dataFinal = new Date(document.getElementById("dataFinal").value);
  const numParcelas = parseInt(document.getElementById("parcelas").value); // Número de parcelas

  // Verifica se os campos estão preenchidos corretamente
  if (isNaN(valor) || isNaN(juros) || isNaN(numParcelas) || isNaN(dataEmissao) || isNaN(dataFinal)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Calcula a diferença total de dias entre a data de emissão e a data final
  const diffDias = Math.ceil((dataFinal - dataEmissao) / (1000 * 60 * 60 * 24));

  // Converte os dias em meses (assumindo média de 30 dias por mês)
  const n = diffDias / 30;

  // Exibe a quantidade total de dias calculados
  document.getElementById("resultado-dias").innerText = `Período calculado: ${diffDias} dias (${n.toFixed(2)} meses)`;

  // Aplica a fórmula de juros compostos: M = P * (1 + i)^n
  const montante = valor * Math.pow(1 + juros, n);
  const valorParcela = montante / numParcelas;

  // Calcula o intervalo médio de dias entre as parcelas
  const intervaloDias = Math.floor(diffDias / numParcelas);

  let parcelasHTML = "<table id='resultado-tabela'><tr><th>Parcela</th><th>Data</th><th>Valor</th></tr>";

  for (let i = 0; i < numParcelas; i++) {
    // Calcula a data de vencimento da parcela somando o intervalo médio de dias
    const dataParcela = new Date(dataEmissao);
    dataParcela.setDate(dataParcela.getDate() + intervaloDias * (i + 1));

    parcelasHTML += `<tr>
      <td>${i + 1}</td>
      <td>${dataParcela.toLocaleDateString()}</td>
      <td>R$ ${valorParcela.toFixed(2)}</td>
    </tr>`;
  }

  parcelasHTML += `</table><p id="total-com-juros">Total com Juros: R$ ${montante.toFixed(2)}</p>`;
  resultadoContainer.innerHTML = parcelasHTML;
});

// Evento de clique para imprimir os resultados
imprimirBtn.addEventListener("click", () => {
  window.print();
});
