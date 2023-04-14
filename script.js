// Set the access token for Axios
axios.defaults.headers.common['Authorization'] = 'PA5po1mijRqzQnSaymxtk4H7';

let username = ''; // Initialize username variable

// Function to enter the room
const enterRoom = () => {
  axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', { name: username })
    .then(response => {
      if (response.status === 200) {
        if (!response.data.includes('Username already in use')) { // Check if error message "Username already in use" is not present in response data
          console.log('Entered the room:', response.data);
          fetchMessages();
        } else {
          console.error('Failed to enter the room:', 'Username already in use');
          alert('Failed to enter the room: Username already in use'); // Show alert
          promptForUsername(); // Prompt for another username
        }
      } else {
        console.error('Failed to enter the room:', response.statusText);
        alert('Failed to enter the room: ' + response.statusText); // Show alert
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 400) {
        console.error('Failed to enter the room: Username already in use');
        alert('Failed to enter the room: Username already in use'); // Show alert
        promptForUsername(); // Prompt for another username
      } else {
        console.error('Failed to enter the room:', error);
      }
    });
};

// Function to prompt user for username
const promptForUsername = () => {
  const promptInput = prompt('Enter your username:');
  if (promptInput !== null && promptInput.trim() !== '') { // Check if prompt input is not null and not empty
    const inputElement = document.querySelector('input'); // Select the existing input element
    inputElement.setAttribute('data-test', 'input-name'); // Add data-test attribute with value 'input-name' to input element
    username = promptInput.trim(); // Set username from prompt input
    enterRoom(); // Call enterRoom() function
  }
};

// Call the function to prompt user for username initially
promptForUsername();

// Rest of your code
// ...


// Rest of your code
// ...


// Rest of your code
// ...


// Rest of your code
// ...


// Rest of your code
// ...



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
const displayMessages = (messages) => {
  const chatMessagesElement = document.getElementById('chat-messages');
  chatMessagesElement.innerHTML = '';
  messages.forEach(message => {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-test', 'message'); // Add data-test attribute with value 'message'
    listItem.innerHTML = `<strong>${message.from}</strong> ${message.text} ${message.time}`;

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
// Function to send a public message
// Function to send a public message
// teste-dateteste
function sendMessage(userName, messageText) {
  // Get the current time
  const currentTime = new Date().toLocaleTimeString();

  // Create a message object in the desired format
  const message = {
    from: userName,
    to: 'public',
    text: messageText,
    time: currentTime,
    type: 'message'
  };

  // Display the message in the console
  console.log(`From: ${username}, Text: ${messageText}, Time: ${currentTime}`);

  // Send a POST request to the API endpoint to send a public message
  axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', message)
    .then(response => {
      // If the server responds with a successful status (200), continue fetching and displaying messages
      console.log(`Public message sent by user ${username}.`);
      // Removed the redundant call to fetchMessagesAndDisplay() here
    })
    .catch(error => {
      // Handle error for sending public message
      console.error(`Error sending public message: ${error.message}`);
    });
}