// Função para validar a senha
function checkPassword() {
    const senhaCorreta = "GALO";  

    // Pegando o valor digitado pelo usuário
    const passwordInput = document.getElementById('password').value;

    // Calculando o hash SHA-256 da senha fornecida
    const encoder = new TextEncoder();
    const data = encoder.encode(passwordInput);

    crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer)); 
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); 
        if (hashHex === sha256Hash(senhaCorreta)) {
            // Senha correta: Redireciona para a página de jogadores
            window.location.href = "index.html";
        } else {
            // Senha incorreta
            alert("Senha incorreta!");
        }
    });
}

// Função para calcular o hash SHA-256 da senha correta
function sha256Hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    });
}
