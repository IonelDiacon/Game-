//1.Deposit some money
//.2Determine number of lines to bet on
//3. Collect abet amount
//4.Spin the slot machine
//5. Check if the user won
//6. Give the user teir winnings
//7. Play again
// import prompt from "prompt-sync"
const prompt = require("prompt-sync")()

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}
const SYMBOLS_VALUE = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}










const deposit1= () =>{
    while(true){

    const deposit = prompt('Deposit amount: ')
    const numberOfDeposit = parseFloat(deposit)
     if(isNaN(numberOfDeposit)|| numberOfDeposit<=0 ){
        console.log("Invalid  deposit amount")
     }else{
        return numberOfDeposit
     }
    }




}
const getNumbersOfLines = () =>{
    while(true){

        const lines = prompt('Enter the numbers of lines to bet on(1-3):  ')
        const numberOfLines = parseFloat(lines)
         if(isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines > 3 ){
            console.log("Invalid  deposit amount")
         }else{
            return numberOfLines  
         }
        }
    
    
}
const getBet = (balance,lines) =>{
    while(true){

        const bet = prompt('Enter the total bet per line:  ')
        const numberOfBet = parseFloat(bet)
         if(isNaN(numberOfBet)|| numberOfBet<=0 || numberOfBet > balance / lines ){
            console.log("Invalid  deposit amount")
         }else{
            return numberOfBet 
         }
        }
    
}

const spin = () => {
     const symbols = []
     for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)) // obj. ent.. face loop sau map doar asupra obiectelor (are doua parametri key,value mereu)
     {
        for(let i = 0 ; i < count; i++){//daca i e mai mic ca count i++
        symbols.push(symbol)
        }
       
     }


      const reels = [[]]
      for (let i = 0; i < COLS; i++){
        reels.push([])
        const reelSymbols = [...symbols]
        for(let j = 0;j < ROWS;j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.slice(randomIndex,1)/////////// nu inteleg ///////////////

        }
      }
    
      return reels
}

const transpose = (reels) =>{
    const rows = []

    for(let i=0; i < COLS; i++){
        rows.push([])
        for(let j = 0; j <COLS; j++){
            rows[i].push(reels[j][i])  /////////// nu inteleg ///////////////
        }
    
    }
    return  rows;
}

const printRows = (rows) => {    
    for (const row of rows){  /////////// nu inteleg ///////////////
        let rowString = ""
        for(const[i,symbol] of row.entries()){
            rowString+= symbol
            if(i !=row.lenght -1){
                rowString+=" | "

            }
        }
        console.log(rowString)
    }
}


const getWinnings = (rows,bet,lines) =>{
    let winnings= 0
    for(let row = 0;row<lines; row++){
        const symbols = rows[row]
        let allSame = true
    
    for (const symbol of symbols){
        if(symbol!=symbols[0]){
            allSame =false;
            break;
        }
    }
    if (allSame){
        winnings += bet * SYMBOLS_VALUE[symbols[0]]
    }
    
    }
    return winnings
}
const game =()=>{
    let balance=deposit1()
  while(true){
    console.log('You have a balance of $'+balance)
    const numberOfLines = getNumbersOfLines()
const bet = getBet(balance,numberOfLines)
balance -=bet*numberOfLines
const reels = spin()
const rows = transpose(reels)
printRows(rows)
const winnings =getWinnings(rows, bet ,numberOfLines) 
balance+=winnings
console.log('You won $'+ winnings.toString())

if (balance <=6){
    console.log('you don have money')
    break;
}
const PlayAgain = prompt('Do tou want to play again(y/n)?')
if(PlayAgain != 'y')break
}
}
game()

