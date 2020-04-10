<<<<<<< HEAD
//testing
=======
>>>>>>> d7c354359968acab8b1e852e6ca0c150af16fae0
var deck = {'A': 4, 'K': 4, 'Q': 4, 'J': 4, 10 : 4, 9 : 4, 8 : 4, 7 : 4, 6 : 4, 5 : 4, 4 : 4, 3 : 4, 2 : 4};
var lst_suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
var suits = {'A': [...lst_suits], 'K': [...lst_suits], 'Q': [...lst_suits], 'J': [...lst_suits], 10 : [...lst_suits], 9 : [...lst_suits], 8 : [...lst_suits], 7 : [...lst_suits], 6 : [...lst_suits], 5 : [...lst_suits], 4 :  [...lst_suits], 3 : [...lst_suits], 2 : [...lst_suits]};
var deckSize = 52;
var player_cards = []
var dealer_cards = []

function randomDraw(deckSize){//Helper function to randomize card draw
    //Returns the number of the card
    var select = Math.floor((Math.random() * deckSize) + 1);
    var running = 0;
    //Randomly finds card to draw, without knowing suit
    for (var card in deck){
        running += deck[card]
        if (running >= select){
            deck[card] -= 1;
            return card; 
        }
    }
}

function cardDraw(){//Helper function, draws card
    //Returns an array of number of card and suit
    deckSize --;
    if (deckSize <= 0){
        return ('Deck is depleted!');
    }
    var card_outcome = randomDraw(deckSize);
    var size_suits = suits[card_outcome].length;
    var remove_suit = Math.floor((Math.random() * size_suits));
    var outcome_suit = suits[card_outcome][remove_suit];
    suits[card_outcome].splice(remove_suit, 1);//Removes suit from deck
    return [card_outcome, outcome_suit];
}

function dealCards(){//Deals Card
    //Returns values of cards in player's hand and dealer's hadnd
    dealer = ''
    player = ''
    for (let step = 0; step < 4; step++){
        card_drawn_lst= cardDraw()
        if (step % 2 == 0){
            player += ' ' + card_drawn_lst[0] + ' of ' + card_drawn_lst[1] + ' | ';
            player_cards.push(card_drawn_lst[0])
            cardPicture(card_drawn_lst[0],card_drawn_lst[1],true,player_cards.length);
        }
        else{
            dealer += ' ' + card_drawn_lst[0] + ' of ' + card_drawn_lst[1] + ' | ';
            dealer_cards.push(card_drawn_lst[1])
            cardPicture(card_drawn_lst[0],card_drawn_lst[1],false,dealer_cards.length);
        }
    }
    document.getElementById('deal cards').innerHTML = "Dealer's cards: " + dealer;
    document.getElementById('play cards').innerHTML = "Player's cards: " + player;

    return [player_cards, dealer_cards];
}

function hit(){//hit
    //Return value of card hit
    cardDrawn_lst = cardDraw();
    document.getElementById('outcome').innerHTML = (cardDrawn_lst[0] + ' of ' + cardDrawn_lst[1]);
    player_cards.push(cardDrawn_lst[0])
    cardPicture(cardDrawn_lst[0],cardDrawn_lst[1],true,player_cards.length);
    return cardDrawn_lst[0];
}

function resetGame(){//Reset all variables, except score
    deck = {'A': 4, 'K': 4, 'Q': 4, 'J': 4, 10 : 4, 9 : 4, 8 : 4, 7 : 4, 6 : 4, 5 : 4, 4 : 4, 3 : 4, 2 : 4};
    lst_suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    suits = {'A': [...lst_suits], 'K': [...lst_suits], 'Q': [...lst_suits], 'J': [...lst_suits], 10 : [...lst_suits], 9 : [...lst_suits], 8 : [...lst_suits], 7 : [...lst_suits], 6 : [...lst_suits], 5 : [...lst_suits], 4 :  [...lst_suits], 3 : [...lst_suits], 2 : [...lst_suits]};
    deckSize = 52;
    document.getElementById('outcome').innerHTML = ('Deck Reset!');
    document.getElementById('addHere').innerHTML = "";
    player_cards=[];
    dealer_cards=[];
}

// stand returning weird values
function stand(){ //sum up current hold
    var counter = 0;
    for (index =0; index < player_cards.length; index ++){
        if (player_cards[index] == 'A'){
            counter += 11
        }
        else if (player_cards[index] == 'K' || player_cards[index] == 'Q' || player_cards[index] == 'J'){
            counter += 10;
        }
        else{
            counter += parseInt(player_cards[index])
        }
    }
    console.log(counter)
    return counter
}
function cardPicture(cardNum,suit,playerOrDealer,numCard){
    //if playerOrComp is true, means it's the player's card. If false, means it's the dealer's card
    var newImg = document.createElement('img');
    newImg.setAttribute('src','assets/'+cardNum+ '_of_' + suit+'.png');
    newImg.setAttribute('class', 'card');
    if(playerOrDealer){
        newImg.className+=' card-player';
    }
    else{
        newImg.className+=' card-dealer';
    }
    newImg.style.left = (30+(numCard-1)*10+'%');
    document.getElementById('addHere').appendChild(newImg);
<<<<<<< HEAD
}
=======
}
>>>>>>> d7c354359968acab8b1e852e6ca0c150af16fae0