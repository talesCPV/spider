const game = new Object
game.dificulty = 0
game.selected = 0


function addCard(div,num,suit){
    const card = newCard(num,suit)

    div.appendChild(card)
    const offset = div.querySelectorAll('.card').length 
    if(div.classList.contains('finished')){
        card.style.left = (offset * 10)+'px'
    }else if(div.classList.contains('steps')){
        card.style.right = (offset * 10)+'px'
    }else if(div.classList.contains('column')){
        card.style.top = `calc(100vw/10 * 1.5 + ${(offset * 20)}px)`
    }
}

function newCard(n=0,st=0){
    n = n==1 ? 'A' : n==11 ? 'J' : n==12 ? 'Q' : n==13 ? 'K' : n
    const naipe = ['♠','♥','♣','♦']
    const out = document.createElement('div')
    out.className = 'card'
    out.style.color = st%2?'red':'black'

    if(n==0){
        const img = document.createElement('img')
        img.src = 'assets/back.png'
        out.appendChild(img)
    }else{
        const num = document.createElement('div')
        num.className = 'num'
        num.innerHTML = n
        out.appendChild(num)

        const suit = document.createElement('div')
        suit.className = 'suit'
        suit.innerHTML = naipe[st]
        out.appendChild(suit)
    
        const big = document.createElement('div')
        big.className = 'big'
        big.innerHTML = naipe[st]
        out.appendChild(big)
    }

    return out
}

function sortDecks(){
    const baralho = []
    for(let i=0; i<104; i++){
        baralho.push(i%13 +1)
    }

    game.decks = []
    while(baralho.length){
        const i = Math.floor(Math.random()*baralho.length)
        game.decks.push(baralho[i])
        baralho.splice(i,1)
    }
}

function reset(){

    game.suit = Math.floor(Math.random() * 4)
    const table = document.querySelector('.table')
    table.innerHTML = ''
    for(let i=0; i<10; i++){
        const cln = document.createElement('div')
        cln.className = 'column'
        cln.id = `cln-${i}`
        table.appendChild(cln)
    }

    sortDecks()
    
    const steps = document.querySelector('.steps')
    steps.innerHTML = ''
    for(let i=0; i<5; i++){
        addCard(steps,0)
    }

    let col=0
    for(let i=game.decks.length; i>=0; i--){
        const cln = document.querySelector(`#cln-${col}`)
        if(i>=10){
            addCard(cln,0)
        }else{
            addCard(cln,game.decks[i],game.suit)
        }
        col = col==9 ? 0 : col+1
    }

}