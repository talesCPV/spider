const game = new Object
game.dificulty = 0
game.select = 0


function addCard(div,num,suit){
    const card = newCard(num,suit)

    div.appendChild(card)
    const offset = div.querySelectorAll('.card').length
    if(div.classList.contains('finished')){
        card.style.left = (offset * 10)+'px'
    }else if(div.classList.contains('steps')){
        card.style.right = (offset * 10)+'px'
        card.addEventListener('click',()=>{
            console.log('nova rodada')
        })        
    }else if(div.classList.contains('column')){
        card.style.top = `calc(100vw/10 * 1.5 + ${(offset * 20)}px)`
        card.addEventListener('click',()=>{
            console.log('marcar carta')
        })
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

function sortDecks(dif=0){
    
    const sort = Math.floor(Math.random() * 4)
    const sec_suit =  sort== 3 ? 0 : sort+1

    game.suit = dif==0 ? [sort,sort,sort,sort] : dif == 1 ? [sort,sec_suit,sort,sec_suit] : [0,1,2,3]

    const baralho = []
    for(let i=0; i<104; i++){
        const card =  new Object
        card.suit = game.suit[i<26?0:i<52?1:i<78?2:3]
        card.num = i%13 +1
        baralho.push(card)
    }

    game.decks = []
    while(baralho.length){
        const i = Math.floor(Math.random()*baralho.length)
        game.decks.push(baralho[i])
        baralho.splice(i,1)
    }
}

function reset(dif=0){

    
    const table = document.querySelector('.table')
    table.innerHTML = ''
    for(let i=0; i<10; i++){
        const cln = document.createElement('div')
        cln.className = 'column'
        cln.id = `cln-${i}`
        table.appendChild(cln)
    }

    sortDecks(dif)
    
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
            addCard(cln,game.decks[i].num,game.decks[i].suit)
        }
        col = col==9 ? 0 : col+1
    }

}