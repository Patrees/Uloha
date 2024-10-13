import {
  fetchCardsDatabase,
  insertCardsDatabase,
  deleteCardsDatabase,
  updateCardsDatabase,
} from "./home.js";

window.addEventListener("load", function () {
  const list = document.querySelector(".cards ul");
  const button = document.querySelector(".btn");
  const form = document.querySelector("form");

  let draggedItem = null;

  //Funkcia na vytvorenie HTML card z objektu pola //
  
  function createCardElement(card) {
    const newElement = document.createElement("li");
    newElement.classList.add("sdk");
    newElement.setAttribute("draggable", "true");

    const newCloseIcon = document.createElement("img");
    newCloseIcon.src = "./images/close-red-icon.svg";
    newCloseIcon.classList.add("close-icon");
    newCloseIcon.setAttribute("data-id", card.id);

    const newHeading = document.createElement("h3");
    newHeading.textContent = card.heading;
    newHeading.setAttribute("data-id", card.id);
    newHeading.classList.add("editing-heading");
    newHeading.addEventListener("click", enableEdit);

    const newParagraph = document.createElement("p");
    newParagraph.textContent = card.paragraph;
    newParagraph.setAttribute("data-id", card.id);
    newParagraph.classList.add("editing-paragraph");
    newParagraph.addEventListener("click", enableEdit);

    newElement.appendChild(newCloseIcon);
    newElement.appendChild(newHeading);
    newElement.appendChild(newParagraph);

    list.appendChild(newElement);
  }

  //funkcia na zobrazenie card//

  async function displayAllCards() {
    const cardsArray = await fetchCardsDatabase();

    cardsArray.forEach(function (card) {
      createCardElement(card);
    });

    displayAllCards();
  }

  button.addEventListener("click", submitButton);
  list.addEventListener("click", deleteFromList);

  // Funkcia na editaciu kariet//


  // function enableEdit(event) {
  //   const element = event.target;
  //   const originalText = element.textContent;
  //   const type = element.tagName.toLowerCase();

  //   let input;
  //   if (type === "h3") {

  //     input = document.createElement("input");

  //   } else if (type === "p") {

  //     input = document.createElement("textarea");

  //   } 

  //   input.value = originalText;
  //   input.classList.add("editing-input");

  //   element.replaceWith(input);
  //   input.focus();

  //   input.addEventListener("blur", function () {
  //     const updatedText = input.value.trim();

  //     if (updatedText && updatedText !== originalText) {
  //       updateCardContent(element, getAttribute("data-id"), type, updatedText);
  //       input.replaceWith(element);
  //     } else {
  //       input.replaceWith(element);
  //     }
  //   });

  // input.addEventListener("keydown", function (event) {
  //   if (event.key === "Enter" && type === "h3") {
  //     input.blur();
  //   }
  // });

  // async function updateCardContent(id, type, updatedText) {
  //   let updateField = {}
  //   if (type === "h3") {
  //     updateField = { heading: updatedText };
  //   } else if (type === "p") {
  //     updateField = { paragraph: updatedText };
  //   }

  //   const succes = await updateCardsDatabase(id, updateField);
  //   if (succes) {
  //     console.log("Uspesny update");
  //   } else {
  //     console.log("Nesuspesny update");
  //   }
  // }



  // Funkcia pridanie karty po stlaceni tlacidla //

  function submitButton(event) {
    event.preventDefault();

    let headingValue = document
      .querySelector('input[name="HeaderCard"]')
      .value.trim();
    let paragraphValue = document
      .querySelector('textarea[name="TextCard"]')
      .value.trim();
    const existingErrorMessage = document.querySelector(".error-message");

    if (headingValue === "" || paragraphValue === "") {
      if (!existingErrorMessage) {
        const errorMessage = document.createElement("p");
        errorMessage.classList.add(
          "animate__animated",
          "animate__bounce",
          "error-message"
        );
        errorMessage.textContent = "Vyplň prosim ta formulár";
        form.insertBefore(errorMessage, form.firstChild);
      }
    } else {
      if (existingErrorMessage) {
        existingErrorMessage.classList.add(
          "animate__animated",
          "animate__backOutDown"
        );
        setTimeout(function () {
          form.removeChild(existingErrorMessage);
        }, 500);
      }
      insertCardsDatabase(headingValue, paragraphValue);
      createCardElement({ heading: headingValue, paragraph: paragraphValue });
      form.reset();
    }
  }



  // Drag and drop funkcionalita //

  list.addEventListener("dragstart", function (event) {
    if (event.target.tagName === "LI") {
      draggedItem = event.target;
      setTimeout(function () {
        draggedItem.classList.add("dragging");
      }, 0);
    }
  });

  list.addEventListener("dragend", function (event) {
    if (event.target.tagName === "LI") {
      setTimeout(function () {
        draggedItem.classList.remove("dragging");
        draggedItem = null;
      }, 0);
    }
  });

  list.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  list.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.tagName === "LI" && draggedItem !== event.target) {
      list.insertBefore(draggedItem, event.target);
    }
  });

  

  // Funkcia odstránenie karty z databazy //


  function deleteFromList(event) {
    if (event.target.classList.contains("close-icon")) {
      event.target.parentElement.classList.add(
        "animate__animated",
        "animate__backOutDown"
      );
      const cardID = event.target.getAttribute("data-id");
      const isdeleted = deleteCardsDatabase(cardID);
      if (isdeleted) {
        setTimeout(function () {
          event.target.parentElement.remove();
        }, 500);
      }
    }
  }


});
