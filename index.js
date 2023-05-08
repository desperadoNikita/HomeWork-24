      const contactList = document.getElementById('contact-list');
      const addContactForm = document.getElementById('add-contact-form');
      
      function displayContacts(contacts) {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
          const li = document.createElement('li');
          li.innerHTML = `${contact.name}: ${contact.phone}`;
          contactList.appendChild(li);
        });
      }
      
      function getContacts() {
        fetch('http://localhost:7000/contacts')
          .then(response => response.json())
          .then(data => displayContacts(data))
          .catch(error => console.error(error));
      }
     
      function addContact(contact) {
        fetch('http://localhost:7000/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact)
        })
        .then(response => response.json())
        .then(data => {
          getContacts(); 
          addContactForm.reset(); 
        })
        .catch(error => console.error(error));
        }

        function deleteContact(id) {
          fetch(`http://localhost:7000/contacts/${id}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            getContacts();
          })
          .catch(error => console.error(error));
        }
        
        contactList.addEventListener('click', event => {
          if (event.target.matches('.delete-contact-button')) {
            const id = event.target.dataset.id;
            deleteContact(id);
          }
        });
        
        function displayContacts(contacts) {
          contactList.innerHTML = '';
          contacts.forEach(contact => {
            const li = document.createElement('li');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.classList.add('delete-contact-button');
            deleteButton.dataset.id = contact.id;
            li.innerHTML = `${contact.name}: ${contact.phone}`;
            li.appendChild(deleteButton);
            contactList.appendChild(li);
          });
        }
  
  addContactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name-input').value;
    const phone = document.getElementById('phone-input').value;
    addContact({name, phone});
  });

  getContacts();