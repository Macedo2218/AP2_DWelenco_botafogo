// Função para carregar os jogadores da API
function loadPlayers() {
    console.log("Carregando jogadores...");

    fetch('jogadores.json')  // Certifique-se de que o caminho do JSON está correto
        .then(response => response.json())
        .then(jogadores => {
            const masculinoContainer = document.getElementById('masculino-container');
            const femininoContainer = document.getElementById('feminino-container');
            
            jogadores.forEach(player => {
                // Verifica o elenco e cria o card
                if (player.elenco === 'masculino') {
                    masculinoContainer.innerHTML += createPlayerCard(player);
                } else if (player.elenco === 'feminino') {
                    femininoContainer.innerHTML += createPlayerCard(player);
                }
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os jogadores:", error);
        });
}

// Função para criar o card do jogador
function createPlayerCard(player) {
    // Cria o HTML do card do jogador
    return `
        <div class="player-card">
            <img src="${player.imagem}" alt="${player.nome}">
            <h3>${player.id} - ${player.nome}</h3>
            <p><strong>Posição:</strong> ${player.posicao}</p>
            <p><strong>Naturalidade:</strong> ${player.naturalidade}</p>
            <p><strong>Altura:</strong> ${player.altura}</p>
            <p><a href="#" onclick="viewPlayerDetails(${player.id})">Ver Mais</a></p>
        </div>
    `;
}

// Função para redirecionar para a página de detalhes e armazenar os dados do jogador
function viewPlayerDetails(player) {
    // Armazena os dados do jogador no localStorage
    localStorage.setItem('selectedPlayer', JSON.stringify(player));
    
    // Redireciona para a página de detalhes
    window.location.href = "detalhes.html?id=" + player.id;

}

// Função para filtrar as seções de jogadores
function filterSections(section) {
    const masculinoSection = document.getElementById('masculino-section');
    const femininoSection = document.getElementById('feminino-section');
    
    if (section === 'todos') {
        masculinoSection.style.display = 'block';
        femininoSection.style.display = 'block';
    } else if (section === 'masculino') {
        masculinoSection.style.display = 'block';
        femininoSection.style.display = 'none';
    } else if (section === 'feminino') {
        masculinoSection.style.display = 'none';
        femininoSection.style.display = 'block';
    }
}

// Função para buscar jogadores pelo nome
function searchPlayer() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const allCards = document.querySelectorAll('.player-card');
    
    allCards.forEach(card => {
        const playerName = card.querySelector('h3').innerText.toLowerCase();
        if (playerName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Carregar jogadores assim que a página for carregada
window.onload = loadPlayers;
