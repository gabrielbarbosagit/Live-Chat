// script.js
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Função para adicionar uma nova mensagem à interface do usuário
function addMessage(message) {
  const newMessageElement = document.createElement('div');
  newMessageElement.textContent = message;
  chatMessages.appendChild(newMessageElement);
}

// Função para enviar uma mensagem
function sendMessage(message) {
  // Aqui você pode chamar a API para enviar a mensagem, substituindo o trecho abaixo com a chamada adequada à sua API
  // Exemplo fictício:
  // api.sendMessage(message).then(response => {
  //   if (response.success) {
  //     // Atualiza a interface do usuário com a nova mensagem
  //     addMessage(response.message);
  //     // Limpa o input de texto
  //     chatInput.value = '';
  //   } else {
  //     console.error('Erro ao enviar mensagem:', response.error);
  //   }
  // }).catch(error => {
  //   console.error('Erro ao enviar mensagem:', error);
  // });

  // Neste exemplo fictício, apenas adicionamos a mensagem diretamente à interface do usuário
  addMessage(message);
  chatInput.value = '';
}

// Event listener para o envio do formulário
chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (message !== '') {
    sendMessage(message);
  }
});

