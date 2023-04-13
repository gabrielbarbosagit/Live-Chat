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
          console.error('Failed to enter the room: Username already in use');
          alert('Failed to enter the room: Username already in use'); // Show alert
          promptForUsername();
        } else {
          console.error('Failed to enter the room:', error);
        }
      });
  };
// Function to prompt user for username
const promptForUsername = () => {
  username = prompt('Enter your username:');
  enterRoom();
};

// Call the function to prompt user for username initially
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
const displayMessages = (messages) => {
    const chatMessagesElement = document.getElementById('chat-messages');
    chatMessagesElement.innerHTML = '';
    messages.forEach(message => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-test', 'message'); // Add data-test attribute with value 'message'
      listItem.innerHTML = `<strong>${message.from}</strong> ${message.text} ${message.time}`;
  
      chatMessagesElement.appendChild(listItem);
    });
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

// Function to send a public message
function sendMessage(userName, messageText) {
  // Get the current time
  const currentTime = new Date().toLocaleTimeString();

  // Create a message object in the desired format
  const message = {
    from: username,
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
      // Removed the redundant call
    })}