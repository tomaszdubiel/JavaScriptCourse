//Author Tomasz Dubiel

//Cards variables
let suits = ['Hearts', 'Spade', 'Club', 'Diamond']
let figures = ['Ace', 'King', 'Queen', 'Jack', '10', 
            '9', '8', '7', '6', '5', '4', '3', '2']

//DOM variables
let textArea = document.getElementById('text-area'),
    startBtn = document.getElementById('start-button'),
    hitBtn = document.getElementById('hit-button'),
    stayBtn = document.getElementById('stay-button');

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

//Start settings
hitBtn.style.display = 'none';
stayBtn.style.display = 'none';
ShowStatus();

//Logic
startBtn.addEventListener('click', function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = CreateDeckOfCards();
    //ShowCards(deck);
    ShuffleDeck(deck);
    //ShowCards();
    dealerCards = [GetNextCard(), GetNextCard()];
    playerCards = [GetNextCard(), GetNextCard()];

    startBtn.style.display = 'none';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';
    ShowStatus();
})

hitBtn.addEventListener('click', function(){
    playerCards.push(GetNextCard());
    CheckForEndOfGame();
    ShowStatus();
})

stayBtn.addEventListener('click', function(){
    gameOver =true;
    CheckForEndOfGame();
    ShowStatus();
})

function CreateDeckOfCards()
{
    let deckOfCards = [];
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < figures.length; j++)
        {
            let tempDeck = {
                suit: suits[i],
                figure: figures[j]
            }
            deckOfCards.push(tempDeck);
        }
    }
    return deckOfCards
}

function ShuffleDeck(deck){

    for(let i=0; i < deck.length; i++)
    {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let temp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = temp;
    }
}

function GetNextCard()
{
    return deck.shift();
}

function GetCardString(card)
{
    return card.value + ' of ' + card.suit
}

function ShowStatus()
{
    if(!gameStarted)
    {
        textArea.innerText = 'Welcome to BlackJack!';
        return;
    }

    let dealerCardsString = ''
    for(let i=0; i < dealerCards.length; i++)
    {
        dealerCardsString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardsString = ''
    for(let i=0; i < playerCards.length; i++)
    {
        playerCardsString += getCardString(playerCards[i]) + '\n';
    }

    UpdateScore();

    textArea.innerText = 'DEALER:\n' +
    dealerCardsString +
    'Score: ' + dealerScore + '\n \n' +

    'PLAYER:\n' +
    playerCardsString +
    'Score: ' + playerScore + '\n \n';

    if(gameOver)
    {
        if(playerWon)
        {
            textArea.innerText += 'YOU WIN!';
        }
        else
        {
            textArea.innerText += 'DEALER WINS!';
        }
        startBtn.style.display = 'inline';
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
    }
    
}

function CheckForEndOfGame()
{
    //TODO
}

function getCardString(card)
{
    return card.figure + ' of ' + card.suit;
}

function UpdateScore()
{
    dealerScore = CalcScore(dealerCards);
    playerScore = CalcScore(playerCards);
}

function CalcScore(cards)
{
    let score = 0;
    let hasAce = false;
    for(let i = 0; i < cards.length; i++)
    {
        score += GetCardNumericValue(cards[i].figure);
        if(cards[i].figure === 'Ace')
        {
            hasAce = true;
        }
    }
    if(hasAce && score + 10 <= 21)
    {
        return score + 10
    }
    return score;
}

function GetCardNumericValue(figure)
{
    switch(figure)
    {
        case 'Ace':
            return 1;
        case '9':
            return 9;
        case '8':
            return 8;
        case '7':
            return 7;
        case '6':
            return 6;
        case '5':
            return 5;
        case '4':
            return 4;
        case '3':
            return 3;
        case '2':
            return 2;
        default:
            return 10;
    }
}

///leftovers

//let cards = CreateDeckOfCards();
//ShowCards();
//ShuffleDeck();
//ShowCards();

function ShowCards(deck)
{
    deck.forEach(element => {
        console.log(element.value + ' of ' + element.suit)
    });

    console.log('***************************************************')
}

//ShowCards();

