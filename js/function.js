
    function addNewElement(classList, heading, paragraph) {
        const list = document.querySelector('.cards ul');
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

    window.addEventListener('load', function() {
     const button = document.querySelector('.btn');
     const form = document.querySelector('form');
     
    button.addEventListener('click', function(event) {
        event.preventDefault();

        let headingValue = document.querySelector('input[name="HeaderCard"]').value.trim();
        let paragraphValue = document.querySelector('textarea[name="TextCard"]').value.trim();     

        const existingErrorMessage = document.querySelector('.error-message');

        if (headingValue === '' || paragraphValue === '') {
           
            if (!existingErrorMessage) {
                const errorMessage = document.createElement('p');
                 errorMessage.classList.add('error-message');
                 errorMessage.textContent = 'Vyplň prosím formulár';
                 form.insertBefore(errorMessage, form.firstChild);
            }
          
        } else {
            if (existingErrorMessage) {
                form.removeChild(existingErrorMessage);
            }

            addNewElement('sdk', headingValue, paragraphValue);

            form.reset();

      }
    
    });



});

