
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


function teste(L=0,D=0,num=0,suit=0){

    const crd =  L<2 ? newCard(): newCard(num,suit)
    const dv = document.querySelector(`${L==0 ?'.finished': L==1 ? '.steps' : `#cln-${D}`}`)

    console.log(dv)
    
    addCard(dv,num,suit)
    



}