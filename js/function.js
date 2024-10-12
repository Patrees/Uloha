import { fetchCardsDatabase, insertCardsDatabase, deleteCardsDatabase } from "./home.js";



        // Funkcia pridanie karty po stlaceni tlacidla //

    async function submitButton(event) {
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
        insertCardsDatabase (headingValue, paragraphValue);
        createCardElement({heading: headingValue, paragraph: paragraphValue});
        form.reset();
    }
}


        // Funkcia odstránenie karty z databazy //

        async function deleteFromList(event) {
            if (event.target.classList.contains('close-icon')) {
                event.target.parentElement.classList.add('animate__animated', 'animate__backOutDown');
                const cardID = event.target.getAttribute('data-id');
                const isdeleted = deleteCardsDatabase(cardID)
                if (isdeleted) {

                    setTimeout( function() {
                        event.target.parentElement.remove(); 
                    }, 500);

                }
        }   
    }

window.addEventListener('load', function() {
    
    const list = document.querySelector('.cards ul');
    const button = document.querySelector('.btn');
    const form = document.querySelector('form');

    let draggedItem = null;

 //Funkcia na vytvorenie HTML card z objektu pola //
 function createCardElement(card) {
    const newElement = document.createElement('li');
    newElement.classList.add('sdk');
    newElement.setAttribute('draggable', 'true');

    const newCloseIcon = document.createElement('img');
    newCloseIcon.src = './images/close-red-icon.svg';
    newCloseIcon.classList.add('close-icon');
    newCloseIcon.setAttribute('data-id', card.id);
    
    const newHeading = document.createElement('h3');
    newHeading.textContent = card.heading;

    const newParagraph = document.createElement('p');
    newParagraph.textContent = card.paragraph;

    newElement.appendChild(newCloseIcon);
    newElement.appendChild(newHeading);
    newElement.appendChild(newParagraph);

    list.appendChild(newElement);
}


    //funkcia na zobrazenie card//
    
    async function displayAllCards() {
        const cardsArray = await fetchCardsDatabase();

        cardsArray.forEach(function(card) {
            createCardElement(card);  
        });
    }

    button.addEventListener('click', submitButton);
    list.addEventListener('click', deleteFromList);
   
    displayAllCards();

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


});


  
       




