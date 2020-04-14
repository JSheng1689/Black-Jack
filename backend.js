var deck = {'A': 4, 'K': 4, 'Q': 4, 'J': 4, 10 : 4, 9 : 4, 8 : 4, 7 : 4, 6 : 4, 5 : 4, 4 : 4, 3 : 4, 2 : 4};
var lst_suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
var suits = {'A': [...lst_suits], 'K': [...lst_suits], 'Q': [...lst_suits], 'J': [...lst_suits], 10 : [...lst_suits], 9 : [...lst_suits], 8 : [...lst_suits], 7 : [...lst_suits], 6 : [...lst_suits], 5 : [...lst_suits], 4 :  [...lst_suits], 3 : [...lst_suits], 2 : [...lst_suits]};
var deckSize = 52;
var player_cards = []
var dealer_cards = []
var betting_amount = 0
var wallet = 2000;//amount of money in the bank $$
var handInProgress = false;//after the cards are dealt, the game is in progress until reset game
var playerBusted = false;

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
    handInProgress = true;
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

    document.getElementById('deal').style.display='none';
    document.getElementById('stand').style.display='inline';
    document.getElementById('hit').style.display='inline';
    var player_value = calculateHand(player_cards)//added this so the player hand score shows
    var deal_value = calculateHand([dealer_cards[1]]) //shows value of revealed card
    document.getElementById('player-score').innerHTML = player_value
    document.getElementById('dealer-score').innerHTML = deal_value //shows value of revealed card
    return [player_cards, dealer_cards];
}

function hit_player(){ //calls hit function with player cards
    var player_hit = hit(player_cards)
    var hand_value = calculateHand(player_cards)
    document.getElementById('player-score').innerHTML = hand_value
}

function hit(hand_to_hit){//hits the dealer or player cards, alters the input hand
    //Return value of card hit
    cardDrawn_lst = cardDraw();
    hand_to_hit.push(cardDrawn_lst[0])
    if(hand_to_hit==player_cards){//puts the card picture on the correct row
    cardPicture(cardDrawn_lst[0],cardDrawn_lst[1],true, hand_to_hit.length);
    }
    else{
        cardPicture(cardDrawn_lst[0],cardDrawn_lst[1],false, hand_to_hit.length);
    }
    if ((calculateHand(hand_to_hit) > 21) && (hand_to_hit == player_cards)){
        playerBusted=true;
        bust_after_hit(playerBusted);
    } 
    return cardDrawn_lst[0];
}
function bust_after_hit(didBust){ //Mainly sets up result screen, in addition to checking if player busts
    document.getElementById('dealerFirstCard').src=(hiddenCard);//reveals the dealer's first card that was face down
    var dealer_sum = calculateHand(dealer_cards)
    document.getElementById('stand').style.display='none';//makes stand and hit disappear and playAgain appear
    document.getElementById('hit').style.display='none';
    document.getElementById('playAgain').style.display='inline';
    document.getElementById('result').style.display='inline';//makes the result appear
    if (didBust){
        document.getElementById('result').innerHTML = 'Bust! Dealer Wins!'
        document.getElementById('wallet').innerHTML=('$'+wallet); //updates wallet score in html
        document.getElementById('dealer-score').innerHTML = dealer_sum
    }
    return dealer_sum
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
    if (hasAce){
        if ((value + 11) > 21){
            value += 1
        }
        else{
            value += 11
        }
    }
    return value
}
function resetGame(){//Reset all variables, except score
    deck = {'A': 4, 'K': 4, 'Q': 4, 'J': 4, 10 : 4, 9 : 4, 8 : 4, 7 : 4, 6 : 4, 5 : 4, 4 : 4, 3 : 4, 2 : 4};
    lst_suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    suits = {'A': [...lst_suits], 'K': [...lst_suits], 'Q': [...lst_suits], 'J': [...lst_suits], 10 : [...lst_suits], 9 : [...lst_suits], 8 : [...lst_suits], 7 : [...lst_suits], 6 : [...lst_suits], 5 : [...lst_suits], 4 :  [...lst_suits], 3 : [...lst_suits], 2 : [...lst_suits]};
    deckSize = 52;
    document.getElementById('addHere').innerHTML = "";
    player_cards=[];
    dealer_cards=[];
    betting_amount = 0;
    document.getElementById('bet counter').innerHTML = ('Bet: ' + betting_amount);
    handInProgress=false;
    playerBusted=false;
    document.getElementById('deal').style.display='inline';
    document.getElementById('playAgain').style.display='none';
    document.getElementById('result').style.display='none';
    document.getElementById('dealer-score').innerHTML = ''
    document.getElementById('player-score').innerHTML = ''
}

function stand(){ //sum up current hold
    if(playerBusted==false){ //if the player busted, the stand function is disabled
        var player_sum = calculateHand(player_cards)
        dealerTurn(player_sum)
    }
}
function dealerTurn(player_value){
    var dealer_sum = bust_after_hit(playerBusted)
    while (dealer_sum < 17){
        hit(dealer_cards)//adjusts dealer_cards, no double counting
        dealer_sum = calculateHand(dealer_cards)
        document.getElementById('dealer-score').innerHTML = dealer_sum
        if (dealer_sum > 21){
            document.getElementById('result').innerHTML = ('Dealer Busts, You Win!');
            wallet += (betting_amount*2);
            document.getElementById('wallet').innerHTML=('$'+wallet);
            return 
        }
    }
    document.getElementById('dealer-score').innerHTML = dealer_sum
    //Dealer never draws, add in that functionality
    if (player_value > dealer_sum && playerBusted==false){ //if the player already busted, the result can't be a win
        document.getElementById('result').innerHTML = ('You Win!');
        wallet += (betting_amount*2) //refunds the bet paid and adds the bet again for profit
    }
    else if (player_value == dealer_sum){
        document.getElementById('result').innerHTML = ('It\'s A Push!');
        wallet+= betting_amount; //refunds the bet paid
    }
    else{
        document.getElementById('result').innerHTML = ('Dealer Wins. Thanks for the money loser!');
    }
    document.getElementById('wallet').innerHTML=('$'+wallet); //updates wallet score in html

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
    newImg.style.left = (300+(numCard-1)*100+'px');
    document.getElementById('addHere').appendChild(newImg);
}

function betChip(amount){
    if(handInProgress==false){
        if(amount>wallet){//gives error if attempting to bet over the wallet amount
            document.getElementById('bet error').style.display='inline';
            $(document.getElementById('bet error')).fadeOut(1000);
        }
        else{
            betting_amount += amount
            wallet -= amount;
            document.getElementById('bet counter').innerHTML = ('Bet: ' + betting_amount);
            document.getElementById('wallet').innerHTML=('$'+wallet); //updates the wallet score
        }
    }
    else{
        document.getElementById('in progress').style.display='inline';
        $(document.getElementById('in progress')).fadeOut(1000);
    }
}
function resetBet(amount){
    //resets the bet when pressed
    if(!(handInProgress)){
        wallet+=betting_amount;
        betting_amount=0;
        document.getElementById('bet counter').innerHTML = ('Bet: ' + betting_amount);
        document.getElementById('wallet').innerHTML=('$'+wallet);
    }
}
