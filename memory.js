// Get cards container.
var cards = document.getElementById('cards');

// Set card values.
var cardsHorizontal = 4;
var cardsVertical = 4;
var cardsTotal = cardsHorizontal * cardsVertical;
var cardVariations = cardsTotal / 2;

// Symbols
var symbolItems = [];
for (var symbolIndex = 0; symbolIndex < cardVariations; symbolIndex++) {
    var symbolValue = String.fromCharCode(65 + symbolIndex);
    symbolItems.push(symbolValue);
    symbolItems.push(symbolValue);
}

// Add classes to cards container.
cards.classList.add('cards', 'cards-horizontal-' + cardsHorizontal.toString(), 'cards-vertical-' + cardsVertical.toString());

// Create each card and add to container.
for (var cardIndex = 0; cardIndex < cardsTotal; cardIndex++) {
    // Create a card with id and classes.
    var card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', 'card-' + cardIndex.toString());

    // Add flipper wrapper .
    var flipper = document.createElement('div');
    flipper.classList.add('flipper');
    card.appendChild(flipper);

    // Add frontside.
    var front = document.createElement('div');
    front.classList.add('front');
    flipper.appendChild(front);

    // Get symbol for the card.
    var cardSymbol = symbolItems.splice(Math.floor(Math.random() * symbolItems.length), 1);
    front.appendChild(document.createTextNode(cardSymbol));

    // Add backside.
    var back = document.createElement('div');
    back.classList.add('back');
    flipper.appendChild(back);
    
    // Append the card to the cards container.
    cards.appendChild(card);
}
