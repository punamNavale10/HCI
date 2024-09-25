const chatContainer = document.getElementById('chat-container');
        const documentScannerContainer = document.getElementById('document-scanner-container');
        const chatBox = document.getElementById('chat-box');
        const uploadedFilename = document.getElementById('uploaded-filename');

        function showChat() {
            chatContainer.style.display = 'flex';
            documentScannerContainer.style.display = 'none';
        }

        function showDocumentScanner() {
            chatContainer.style.display = 'none';
            documentScannerContainer.style.display = 'flex';
        }

        document.getElementById('send-button').addEventListener('click', () => {
            const userInput = document.getElementById('user-input').value;
            if (userInput) {
                addUserMessage(userInput);
                sendMessageToServer(userInput, 'chat');
                document.getElementById('user-input').value = '';
            }
        });

        function addUserMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message user-message';
            messageElement.textContent = `👤:  ${message}`;
            chatBox.appendChild(messageElement); // Add to the end
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function uploadFile() {
            const fileInput = document.getElementById('file-input');
            const file = fileInput.files[0];
            if (file) {
                uploadedFilename.textContent = `Uploaded: ${file.name}`;
                const formData = new FormData();
                formData.append('file', file);

                fetch('/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log('File uploaded successfully:', data);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
            }
        }



        document.getElementById('user-input').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                sendMessage();
            }
        });

        document.getElementById('document-scanner-send-button').addEventListener('click', sendMessage);


        document.getElementById('document-scanner-send-button').addEventListener('click', () => {
            const scannerInput = document.getElementById('document-scanner-input').value;
            if (scannerInput) {
                addScannerMessage(scannerInput);
                sendMessageToServer(scannerInput, 'document');
                document.getElementById('document-scanner-input').value = '';
            }
        });


        function addScannerMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message user-message';
            messageElement.textContent = `👤 : ${message}`;
            document.getElementById('document-scanner-box').appendChild(messageElement); // Add to the end
        }

        function sendMessageToServer(message, endpoint) {
            fetch(`/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                if (endpoint === 'chat') {
                    addBotMessage(data.response);
                } else if (endpoint === 'document') {
                    addScannerBotMessage(data.response);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        function addBotMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message bot-message';
            messageElement.textContent = `🤖 : ${message}`;
            chatBox.appendChild(messageElement); // Add to the end
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function addScannerBotMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message bot-message';
            messageElement.textContent = `🤖 :  ${message}`;
            document.getElementById('document-scanner-box').appendChild(messageElement); // Add to the end
        }

        function addHistoryItem(message) {
            const historyList = document.getElementById('history-list');
            const listItem = document.createElement('li');
            listItem.innerHTML = `${message} <button class="delete-button" onclick="deleteHistoryItem(this)">Delete</button>`;
            historyList.appendChild(listItem);
        }

        function deleteHistoryItem(button) {
            button.parentNode.remove();
        }

        document.getElementById('user-input').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                sendMessage();
            }
        });

        document.getElementById('send-button').addEventListener('click', sendMessage);



        function sendMessage() {
            const userInput = document.getElementById('user-input').value.trim();
            if (userInput) {
                addUserMessage(userInput);
                sendMessageToServer(userInput, 'chat');
                addHistoryItem(userInput);
                document.getElementById('user-input').value = '';
            }
        }
        function addHistoryItem(message) {
            const historyList = document.getElementById('history-list');
            const listItem = document.createElement('li');
            listItem.innerHTML = `${message} <button class="delete-button" onclick="deleteHistoryItem(this)">Delete</button>`;
            historyList.appendChild(listItem);

            // Remove the "No history found" message if it exists
            const noHistoryMessage = document.getElementById('no-history');
            if (noHistoryMessage) {
                noHistoryMessage.remove();
            }
        }

        f// Your existing JavaScript code

        function addHistoryItem(message) {
            const historyList = document.getElementById('history-list');
            const listItem = document.createElement('li');
            listItem.innerHTML = `${message} <button class="delete-button" onclick="deleteHistoryItem(this)">❌</button>`;
            historyList.appendChild(listItem);

    // Remove the "No history found" message if it exists
        const noHistoryMessage = document.getElementById('no-history');
            if (noHistoryMessage) {
                noHistoryMessage.remove();
            }
        }

        function deleteHistoryItem(button) {
            button.parentNode.remove();

    // If there are no more history items, add back the "No history found" message
            const historyList = document.getElementById('history-list');
            if (historyList.childElementCount === 0) {
                const noHistoryMessage = document.createElement('li');
                noHistoryMessage.textContent = 'No history found';
                noHistoryMessage.id = 'no-history';
                historyList.appendChild(noHistoryMessage);
            }
        }
