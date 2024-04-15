document.addEventListener('DOMContentLoaded', function () {
    const quantityButtons = document.querySelectorAll('.fa-plus-circle, .fa-minus-circle');
    const deleteButtons = document.querySelectorAll('.fa-trash-alt');
    const likeButtons = document.querySelectorAll('.fa-heart');
  
    // Ajouter des écouteurs d'événements pour les boutons de quantité
    quantityButtons.forEach(button => {
      button.addEventListener('click', adjustQuantity);
    });
  
    // Ajouter des écouteurs d'événements pour les boutons de suppression
    deleteButtons.forEach(button => {
      button.addEventListener('click', deleteItem);
    });
  
    // Ajouter des écouteurs d'événements pour les boutons de like
    likeButtons.forEach(button => {
      button.addEventListener('click', toggleLike);
    });
  });
  
  // Fonction pour ajuster la quantité de l'article
  function adjustQuantity(event) {
    const clickedButton = event.target;
    const quantityElement = clickedButton.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
  
    // Incrémenter ou décrémenter la quantité en fonction du bouton cliqué
    if (clickedButton.classList.contains('fa-plus-circle')) {
      quantity++;
    } else if (clickedButton.classList.contains('fa-minus-circle')) {
      if (quantity > 0) {
        quantity--;
      }
    }
  
    // Mettre à jour la quantité affichée
    quantityElement.textContent = quantity;
  
    // Mettre à jour le prix total
    updateTotalPrice();
  }
  
  // Fonction pour supprimer un article du panier
  function deleteItem(event) {
    const clickedButton = event.target;
    const cardBody = clickedButton.closest('.card-body');
    cardBody.parentElement.remove();
  
    // Mettre à jour le prix total
    updateTotalPrice();
  }
  
  // Fonction pour basculer le bouton de like
  function toggleLike(event) {
    const clickedButton = event.target;
    clickedButton.classList.toggle('liked');
  }
  
  // Fonction pour mettre à jour le prix total
  function updateTotalPrice() {
    let totalPrice = 0;
    const unitPrices = document.querySelectorAll('.unit-price');
    const quantities = document.querySelectorAll('.quantity');
  
    // Calculer le prix total pour chaque article
    unitPrices.forEach((unitPrice, index) => {
      const price = parseFloat(unitPrice.textContent.replace('$', ''));
      const quantity = parseInt(quantities[index].textContent);
      totalPrice += price * quantity;
    });
  
    // Mettre à jour l'affichage du prix total
    const totalPriceElement = document.querySelector('.total');
    totalPriceElement.textContent = totalPrice.toFixed(2) + ' $';
  }
  
