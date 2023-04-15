// Set the access token for Axios
axios.defaults.headers.common['Authorization'] = 'PA5po1mijRqzQnSaymxtk4H7';

let username = ''; // Initialize username variable


// Function to enter the room
const enterRoom = () => {
  axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', { name: username })
    .then(response => {
      if (response.status === 200) {
        console.log('Entered the room:', response.data);
        fetchMessages(); 
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        console.error('Failed to enter the room:', 'Username already in use');
        alert('Failed to enter the room: Username already in use'); // Show alert
        username = ''; // Reset username
        promptForUsername(); // Prompt for another username
      } else {
        console.error('Failed to enter the room:', error);
      }
    });
};

// Function to prompt user for username
const promptForUsername = () => {
  // Only prompt for username if it hasn't been entered before
  if (!username) {
    const promptInput = prompt('Enter your username:');
    if (promptInput !== null && promptInput.trim() !== '') { // Check if prompt input is not null and not empty
      const inputElement = document.querySelector('input'); // Select the existing input element
      inputElement.setAttribute('data-test', 'input-name'); // Add data-test attribute with value 'input-name' to input element
      username = promptInput.trim(); // Set username from prompt input
      enterRoom(); // Call enterRoom() function
    } else {
      // If username is not entered or entered as empty, prompt again
      promptForUsername(); // Prompt for another username
    }
  }
};

// Call promptForUsername() function to prompt for username when page is loaded
promptForUsername();







// Function to fetch messages from the server
const fetchMessages = () => {
  axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    .then(response => {
      if (response.status === 200) {
        console.log('Fetched messages:', response.data);
        displayMessages(response.data);
      }
    })
    .catch(error => {
      console.error('Failed to fetch messages:', error);
    });
};

// Function to display messages according to layout
// Function to display messages according to layout
const displayMessages = (messages) => {
  const chatMessagesElement = document.getElementById('chat-messages');
  chatMessagesElement.innerHTML = '';
  messages.forEach(message => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-test', 'message'); // Add data-test attribute with value 'message'
    const messageTime = new Date().toLocaleTimeString(); // Get the current time from your PC
    listItem.innerHTML = `<strong>${message.from}</strong> ${message.text} ${messageTime}`; // Update the message with the current time

    chatMessagesElement.appendChild(listItem);
  });

  // Scroll to the bottom of the chat messages container
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
};


// Call the fetchMessages function to fetch messages initially
fetchMessages();

// Call the function every 3 seconds to fetch periodic updates
setInterval(() => {
  fetchMessages();
}, 3000);


// Function to send status update to the server
function sendStatusUpdate() {
  axios.post('https://mock-api.driven.com.br/api/vm/uol/status', { name: username })
    .then(response => {
      console.log(`Status update sent for user ${username}.`);
    })
    .catch(error => {
      console.error(`Error sending status update for user ${username}: ${error.message}`);
    });
}

// Call the function every 5 seconds to send periodic status updates
setInterval(() => {
  sendStatusUpdate();
}, 5000);





// Get references to the input field and send button
const chatInput = document.getElementById('chat-input');

// Set the data-test attribute for the chatInput element
chatInput.setAttribute('data-test', 'input-message');

const sendButton = document.getElementById('send-button');

// Add click event listener to the send button
sendButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  const messageText = chatInput.value; // Get the text from the input field
  if (messageText) {
    // If the input field is not empty, send the public message
    sendMessage(username, messageText);
    chatInput.value = ''; // Clear the input field after sending the message
  }
});





// Função para enviar uma mensagem pública

// Função para enviar uma mensagem pública
// Função para enviar uma mensagem pública
function sendMessage(userName, messageText) {
  // Obter o horário atual
  const currentTime = new Date().toLocaleTimeString();

  // Criar um objeto de mensagem no formato desejado
  const message = {
    from: userName,
    to: 'public',
    text: messageText,
    time: currentTime,
    type: 'message',
    'data-test': 'message' // Adicionar o atributo data-test à mensagem
  };

  // Exibir a mensagem no console
  console.log(`From: ${userName}, Text: ${messageText}, Time: ${currentTime}`);

  // Adicionar a mensagem enviada imediatamente ao container de mensagens
  const messagesContainer = document.getElementById('chat-messages');
  const messageElement = document.createElement('li');
  // Usar textContent para inserir o texto da mensagem de forma segura
  messageElement.textContent = `${message.from}: ${message.text} ${message.time}`;
  messagesContainer.appendChild(messageElement);

  // Rolar até o final do container de mensagens do chat
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Enviar uma solicitação POST para o endpoint da API para enviar uma mensagem pública
  axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', message)
  .then(response => {
    // Se o servidor responder com um status de sucesso (200), continuar buscando e exibindo mensagens
    console.log(`Mensagem pública enviada pelo usuário ${userName}.`);
    // Buscar e exibir as mensagens novamente para atualizar o chat
    fetchMessagesAndDisplay();
  })
  .catch(error => {
    // Lidar com erro ao enviar mensagem pública
    console.error(`Erro ao enviar mensagem pública: ${error.message}`);
    // Recarregar a página para voltar à etapa de entrada do nome somente se o erro não estiver relacionado a problemas de rede
    if (error.response) {
      window.location.reload();
    }
  });
};
