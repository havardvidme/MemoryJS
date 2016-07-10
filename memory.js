// Get cards container.
var cards = document.getElementById('cards');

// Set card values.
var cardsHorizontal = 4;
var cardsVertical = 4;
var cardsTotal = cardsHorizontal * cardsVertical;

// Create each card and add to container.
for (var cardIndex = 0; cardIndex < cardsTotal; cardIndex++) {
    var card = document.createElement('div');
    card.appendChild(document.createTextNode(cardIndex));
    cards.appendChild(card);
}
