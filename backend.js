var deck = {'A': 4, 'K': 4, 'Q': 4, 'J': 4, 10 : 4, 9 : 4, 8 : 4, 7 : 4, 6 : 4, 5 : 4, 4 : 4, 3 : 4, 2 : 4};
var lst_suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
var suits = {'A': [...lst_suits], 'K': [...lst_suits], 'Q': [...lst_suits], 'J': [...lst_suits], 10 : [...lst_suits], 9 : [...lst_suits], 8 : [...lst_suits], 7 : [...lst_suits], 6 : [...lst_suits], 5 : [...lst_suits], 4 :  [...lst_suits], 3 : [...lst_suits], 2 : [...lst_suits]};
var deckSize = 52;

function randomDraw(deckSize){
    var select = Math.floor((Math.random() * deckSize) + 1);
    var running = 0;
    for (var card in deck){
        running += deck[card]
        if (running >= select){
            deck[card] -= 1;
            return card; 
        }
    }
    
}
function dealFunction(){ //deal cards
    deckSize --;
    if (deckSize <= 0){
        document.getElementById('outcome').innerHTML = ('Deck is depleted!');
        return;
    }
    var card_outcome = randomDraw(deckSize);
    var size_suits = suits[card_outcome].length;
    var remove_suit = Math.floor((Math.random() * size_suits) + 1);
    var outcome_suit = suits[card_outcome][remove_suit];
    suits[card_outcome].splice(remove_suit, 1);
    document.getElementById('outcome').innerHTML = (card_outcome + ' of ' + outcome_suit);


}

function resetGame(){ //Reset all variables, except score

}
