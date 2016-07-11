// Card click handler event.
var cardClickHandler = function (event) {
    // Block action if user selects more than two cards.
    if (selectedCards.length < 2) {
        if (!this.classList.contains('open', 'done')) {
            this.classList.add('open');

            // Put selected card id in global list.
            selectedCards.push(this.id);

            // Make sure two cards have been opened.
            if (selectedCards.length == 2) {
                // Get first selected card and verify.
                var alpha = document.getElementById(selectedCards[0]);
                if (alpha === null) {
                    console.error('Could not access card with id "%s".', selectedCards[0]);
                }
                // Get second selected card and verify.
                var omega = document.getElementById(selectedCards[1]);
                if (omega === null) {
                    console.error('Could not access card with id "%s".', selectedCards[1]);
                }
                
                // Handle success or failure on timeout.
                var success = alpha.dataset.symbol === omega.dataset.symbol;
                var interval = success ? 250 : 750;
                cardsCloseTimeout = setTimeout(cardsCloseTimeoutHandler.bind(null, success), interval);
            }
        }
    }
};

// Timeout handler when comparing card values.
var cardsCloseTimeoutHandler = function (success) {
    // Get first selected card and verify.
    var alpha = document.getElementById(selectedCards[0]);
    if (alpha === null) {
        console.error('Could not access card with id "%s".', selectedCards[0]);
    }
    // Get second selected card and verify.
    var omega = document.getElementById(selectedCards[1]);
    if (omega === null) {
        console.error('Could not access card with id "%s".', selectedCards[1]);
    }
    
    // Perform action on cards.
    if (success) {
        // Set cards as "done"
        alpha.classList.add('done');
        omega.classList.add('done');

        // Increment pairs found.
        pairsFound++;
    } else {
        // Reset open cards.
        alpha.classList.remove('open');
        omega.classList.remove('open');
    }
    
    // Check if game is over.
    if (pairsFound == pairsTotal) {
        console.log('Done!')
    }

    // Emtpy selected cards and clear timeout.
    selectedCards = [];
    clearTimeout(cardsCloseTimeout);
};

// Get cards container.
var cards = document.getElementById('cards');

// Selected cards
var selectedCards = [];
var cardsCloseTimeout = null;

// Set card values.
var cardsHorizontal = 4;
var cardsVertical = 4;
var cardsTotal = cardsHorizontal * cardsVertical;

// Pairs.
var pairsTotal = cardsTotal / 2;
var pairsFound = 0;

// Symbols
var symbolItems = [];
for (var symbolIndex = 0; symbolIndex < pairsTotal; symbolIndex++) {
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
    card.dataset.symbol = cardSymbol;

    // Add backside.
    var back = document.createElement('div');
    back.classList.add('back');
    flipper.appendChild(back);

    // Add click listener.
    card.addEventListener('click', cardClickHandler, false);
    
    // Append the card to the cards container.
    cards.appendChild(card);
}
