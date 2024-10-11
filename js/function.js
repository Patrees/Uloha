window.addEventListener('load', function() {
    const button = document.querySelector('.btn');
    const form = document.querySelector('form');
    const list = this.document.querySelector('.cards ul');
    let draggedItem = null;

    //Funkcia pridanie novej cards //

    function addNewElement(classList, heading, paragraph) {
        const newElement = document.createElement('li');
        newElement.classList.add(classList);
        newElement.draggable = true;

        const newHeading = document.createElement('h3');
        newHeading.textContent = heading;

        const newParagraph = document.createElement('p');
        newParagraph.textContent = paragraph;

        newElement.appendChild(newHeading);
        newElement.appendChild(newParagraph);

        list.appendChild(newElement);
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
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Vyplň prosimity formulár';
                form.insertBefore(errorMessage, form.firstChild);
            }
        }else {
            if (existingErrorMessage) {
                form.removeChild(existingErrorMessage);
            }
            addNewElement('sdk', headingValue, paragraphValue);
            form.reset();
        }
    });

    // DRAG AND DROP FUNKCIA //

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

