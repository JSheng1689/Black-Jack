// Ace value not calculated, betting system, don't show value of dealer hand when calculateHand is called
var deck = {'A': 4, 'K': 4, 'Q': 4, 'J': 4, 10 : 4, 9 : 4, 8 : 4, 7 : 4, 6 : 4, 5 : 4, 4 : 4, 3 : 4, 2 : 4};
var lst_suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
var suits = {'A': [...lst_suits], 'K': [...lst_suits], 'Q': [...lst_suits], 'J': [...lst_suits], 10 : [...lst_suits], 9 : [...lst_suits], 8 : [...lst_suits], 7 : [...lst_suits], 6 : [...lst_suits], 5 : [...lst_suits], 4 :  [...lst_suits], 3 : [...lst_suits], 2 : [...lst_suits]};
var deckSize = 52;
var player_cards = []
var dealer_cards = []
var betting_amount = 0
var hiddenCard; 

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
    for (let step = 0; step < 4; step++){
        card_drawn_lst= cardDraw()
        if (step % 2 == 0){
            player_cards.push(card_drawn_lst[0])
            cardPicture(card_drawn_lst[0],card_drawn_lst[1],true,player_cards.length);
        }
        else{
            dealer_cards.push(card_drawn_lst[0])
            cardPicture(card_drawn_lst[0],card_drawn_lst[1],false,dealer_cards.length);
        }
    }
    return [player_cards, dealer_cards];
}

function hit(){//hit
    //Return value of card hit
    cardDrawn_lst = cardDraw();
    player_cards.push(cardDrawn_lst[0])
    cardPicture(cardDrawn_lst[0],cardDrawn_lst[1],true,player_cards.length);
    if (calculateHand(player_cards)[0] > 21){
        document.getElementById('result').innerHTML = ('Busted!')
    }
    return cardDrawn_lst[0];
}
function calculateHand(handArray){
    var hasAce = false;
    var value = 0;
    for (index = 0; index < handArray.length; index ++){
        if (handArray[index] == 'A'){
            hasAce = true;
        }
        else if (handArray[index] == 'K' || handArray[index] == 'Q' || handArray[index] == 'J'){
            value += 10;
        }
        else{
            value += parseInt(handArray[index])
        }
    }
    if (handArray == dealer_cards){
        document.getElementById('dealer-score').innerHTML = value
    }
    else{
        document.getElementById('player-score').innerHTML = value
    }
    return [value, hasAce]
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
    betting_amount = 0;
    document.getElementById('bet counter').innerHTML = ('Amount Betted: ' + betting_amount);
}

// stand returning weird values
function stand(){ //sum up current hold
    var hasAce = false;
    var player_sum = calculateHand(player_cards)[0]
    var hasAce = calculateHand(player_cards)[1]
    if (hasAce){
        if (player_sum + 11 > 21){
            player_sum += 1
        }
        else{
            player_sum += 11
        }
    }
    console.log("Sum of player hand " + player_sum)
    document.getElementById('dealerFirstCard').src=(hiddenCard);
    dealerTurn(player_sum)
}
function dealerTurn(player_value){
    var hasAce = false;
    var dealer_sum = calculateHand(dealer_cards)[0]
    var hasAce = calculateHand(dealer_cards)[1]
    if (hasAce){
        if (dealer_sum + 11 > 21){
            dealer_sum += 1
        }
        else{
            dealer_sum += 11
        }
    }
    console.log("Sum of dealer hand "+ dealer_sum)
    //Dealer never draws, add in that functionality
    if (player_value > dealer_sum){
        document.getElementById('result').innerHTML = ('Result: You Win!');
    }
    else if (player_value == dealer_sum){
        document.getElementById('result').innerHTML = ('Result: A Push!');
    }
    else{
        document.getElementById('result').innerHTML = ('Result: Dealer Wins :(');
    }
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
        if(numCard==1){
            newImg.setAttribute('src','assets/back.png');
            newImg.setAttribute('id','dealerFirstCard');
            hiddenCard=('src','assets/'+cardNum+ '_of_' + suit+'.png');
        }
        newImg.className+=' card-dealer';
    }
    newImg.style.left = (30+(numCard-1)*10+'%');
    document.getElementById('addHere').appendChild(newImg);
}

function betChip(amount){
    betting_amount += amount
    document.getElementById('bet counter').innerHTML = ('Amount Betted: ' + betting_amount);
}
