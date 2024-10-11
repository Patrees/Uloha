window.addEventListener('load', function() {
    const button = document.querySelector('.btn');
    const form = document.querySelector('form');
    const list = this.document.querySelector('.cards ul');
    let draggedItem = null;

    //Vytvorenie pola na ulozenie kariet //
    let cardsArray = [
        { heading: "Nadpis 1", paragraph: "Text pre kartu 1" },
        { heading: "Nadpis 2", paragraph: "Text pre kartu 2" },
        { heading: "Nadpis 3", paragraph: "Text pre kartu 3" },
        { heading: "Nadpis 4", paragraph: "Text pre kartu 4" },
        { heading: "Nadpis 5", paragraph: "Text pre kartu 5" }
    ];

    //Funkcia na vytvorenie HTML card z objektu pola //

    function createCardElement(card) {
        const newElement = document.createElement('li');
        newElement.classList.add('sdk');
        newElement.setAttribute('draggable', 'true');

        const newCloseIcon = document.createElement('img');
        newCloseIcon.src = './images/close-red-icon.svg';
        newCloseIcon.classList.add('close-icon');
        
        const newHeading = document.createElement('h3');
        newHeading.textContent = card.heading;

        const newParagraph = document.createElement('p');
        newParagraph.textContent = card.paragraph;

        newElement.appendChild(newCloseIcon);
        newElement.appendChild(newHeading);
        newElement.appendChild(newParagraph);

        list.appendChild(newElement);
    }

    // Funkcia na pridanie card do pola a do DOM //

    function addNewCard(heading, paragraph) {
        const newCard = {
            heading: heading,
            paragraph: paragraph
        };

    // Pridanie objektu card do pola //

    cardsArray.push(newCard);


    // Vytvorenie HTML card //

    createCardElement(newCard);

    }

    // Funkcia pridanie karty po stlaceni tlacidla //

    button.addEventListener('click', function(event) {
        event.preventDefault();

        let headingValue = document.querySelector('input[name="HeaderCard"]').value.trim();
        let paragraphValue = document.querySelector('textarea[name="TextCard"]').value.trim();
        const existingErrorMessage = document.querySelector('.error-message');
        

        if (headingValue === '' || paragraphValue === '') {
            if (!existingErrorMessage) {
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('animate__animated', 'animate__bounce', 'error-message');
                errorMessage.textContent = 'Vyplň prosim ta formulár';
                form.insertBefore(errorMessage, form.firstChild);
            }
        }else {
            if (existingErrorMessage) {
                existingErrorMessage.classList.add('animate__animated', 'animate__backOutDown')
                setTimeout( function() {
                    form.removeChild(existingErrorMessage); 
                }, 500);
            }
           addNewCard(headingValue, paragraphValue);
            form.reset();
        }
    });

    // Zobrazenie card pri nacitani //

    function displayAllCards() {
        list.innerHTML = ''; // vycistenie zoznamu
        cardsArray.forEach(function(card) {
            createCardElement(card); // vytvorenie elementu pre kazdy card
        });
    }

    // Drag and drop funkcionalita //

    list.addEventListener('dragstart', function(event) {
        if (event.target.tagName === 'LI') {
            draggedItem = event.target;
            setTimeout(function() {
                draggedItem.classList.add('dragging');
            }, 0);
        }
    });

    list.addEventListener('dragend', function(event) {
        if (event.target.tagName === 'LI') {
            setTimeout(function() {
                draggedItem.classList.remove('dragging')
                draggedItem = null;
            }, 0);
        }
    });

    list.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    list.addEventListener('drop', function(event) {
        event.preventDefault();
        if (event.target.tagName === 'LI' && draggedItem !== event.target) {
            list.insertBefore(draggedItem, event.target);
        }
            
    });

    // Funkcia odstránenie karty //

    list.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-icon')) {
            event.target.parentElement.classList.add('animate__animated', 'animate__backOutDown');
            setTimeout( function() {
                event.target.parentElement.remove(); 
            }, 500);
            
        }
    });

    displayAllCards();


});

