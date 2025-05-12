document.addEventListener("DOMContentLoaded", () => {
  popularSelects();
});

document.getElementById('btn').addEventListener('click', mostrarCulturaPop);

const culturaPop = [
  { ano: 1987, filme: "Os Intocáveis", musica: "With or Without You – U2" },
  { ano: 1988, filme: "Rain Man", musica: "Sweet Child O' Mine – Guns N' Roses" },
  { ano: 1989, filme: "Sociedade dos Poetas Mortos", musica: "Like a Prayer – Madonna" },
  { ano: 1990, filme: "Ghost", musica: "Nothing Compares 2 U – Sinéad O'Connor" },
  { ano: 1991, filme: "O Silêncio dos Inocentes", musica: "Smells Like Teen Spirit – Nirvana" },
  { ano: 1992, filme: "Drácula de Bram Stoker", musica: "I Will Always Love You – Whitney Houston" },
  { ano: 1993, filme: "A Lista de Schindler", musica: "What's Up? – 4 Non Blondes" },
  { ano: 1994, filme: "Pulp Fiction", musica: "The Sign – Ace of Base" },
  { ano: 1995, filme: "Coração Valente", musica: "Gangsta’s Paradise – Coolio" },
  { ano: 1996, filme: "Trainspotting", musica: "Macarena – Los Del Río" },
  { ano: 1997, filme: "Titanic", musica: "My Heart Will Go On – Celine Dion" },
  { ano: 1998, filme: "O Resgate do Soldado Ryan", musica: "…Baby One More Time – Britney Spears" },
  { ano: 1999, filme: "Clube da Luta", musica: "No Scrubs – TLC" },
  { ano: 2000, filme: "Gladiador", musica: "Music – Madonna" },
  { ano: 2001, filme: "O Senhor dos Anéis: A Sociedade do Anel", musica: "Fallin' – Alicia Keys" },
  { ano: 2002, filme: "Cidade de Deus", musica: "Hot in Herre – Nelly" },
  { ano: 2003, filme: "Procurando Nemo", musica: "Crazy in Love – Beyoncé" },
  { ano: 2004, filme: "Menina de Ouro", musica: "Yeah! – Usher" },
  { ano: 2005, filme: "Batman Begins", musica: "We Belong Together – Mariah Carey" },
  { ano: 2006, filme: "O Labirinto do Fauno", musica: "Hips Don’t Lie – Shakira" },
  { ano: 2007, filme: "Onde os Fracos Não Têm Vez", musica: "Umbrella – Rihanna" },
  { ano: 2008, filme: "O Cavaleiro das Trevas", musica: "Viva La Vida – Coldplay" },
  { ano: 2009, filme: "Avatar", musica: "Poker Face – Lady Gaga" },
  { ano: 2010, filme: "A Origem", musica: "Love the Way You Lie – Eminem ft. Rihanna" },
  { ano: 2011, filme: "Meia-Noite em Paris", musica: "Rolling in the Deep – Adele" },
  { ano: 2012, filme: "Os Vingadores", musica: "Somebody That I Used to Know – Gotye" },
  { ano: 2013, filme: "Gravidade", musica: "Blurred Lines – Robin Thicke" }
];

function popularSelects() {
  const anos = [...new Set(culturaPop.map(item => item.ano))].sort((a, b) => a - b);
  const selectMin = document.getElementById("anoMin");
  const selectMax = document.getElementById("anoMax");

  anos.forEach(ano => {
    const optionMin = document.createElement("option");
    optionMin.value = ano;
    optionMin.textContent = ano;
    selectMin.appendChild(optionMin);

    const optionMax = document.createElement("option");
    optionMax.value = ano;
    optionMax.textContent = ano;
    selectMax.appendChild(optionMax);
  });


  selectMin.value = anos[0];
  selectMax.value = anos[anos.length - 1];
}

function selecionarNumeroAleatorio() {
  const min = parseInt(document.getElementById("anoMin").value);
  const max = parseInt(document.getElementById("anoMax").value);

  if (min > max) {
    alert("O ano mínimo não pode ser maior que o ano máximo!");
    return;
  }

  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  return numeroAleatorio;
}

function mostrarCulturaPop() {
  const anoSorteado = selecionarNumeroAleatorio();
  const resultado = culturaPop.find(item => item.ano === anoSorteado);

  const output = document.getElementById('output');
  if (resultado) {
    output.innerHTML = `
      <p id="ano">Ano: ${resultado.ano}</p>
      <p id="filme">🎬 Filme: <a href="https://www.google.com/search?q=${encodeURIComponent(resultado.filme)}" target="_blank">${resultado.filme}</a></p>
      <p id="musica">🎵 Música: <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(resultado.musica)}" target="_blank">${resultado.musica}</a></p>
    `;
  } else {
    output.innerHTML = `<p>Ano sorteado (${anoSorteado}) não possui dados registrados.</p>`;
  }
}
