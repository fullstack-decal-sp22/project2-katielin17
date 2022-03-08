class Calculator{
    constructor(prevOperandTextElement, currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }

    clear(){
        this.currentOperand = "0"
        this.prevOperand = ""
        this.operation = undefined
    }

    delete(){
        if (this.currentOperand <= 9){
            this.currentOperand = "0"
        } else{
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        }
    }

    appendNumber(number){
        if(this.currentOperand === "0"){
            this.currentOperand = number.toString()
        } else{
            this.currentOperand = this.currentOperand.toString()+ number.toString()
        }
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return
        if(this.prevOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ""  
    }

    compute(){
        let computation
        const prev = parseInt(this.prevOperand)
        const current = parseInt(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "x":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            default:
                return 
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ""
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`
        } else{
            this.prevOperandTextElement.innerText = ""
        }
    }
}


const numberButtons = document.querySelectorAll(`[data-number]`)
const operationButtons = document.querySelectorAll(`[data-operation]`)
const equalsButton = document.querySelector(`[data-equals]`)
const deleteButton = document.querySelector(`[data-delete]`)
const clearAllButton = document.querySelector(`[data-all-clear]`)
const prevOperandTextElement= document.querySelector(`[data-prev-operand]`)
const currentOperandTextElement = document.querySelector(`[data-current-operand]`)

const calculator = new Calculator (prevOperandTextElement,
    currentOperandTextElement)
   
numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })   
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })   
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})//Check out calculator_hints.js for hints if you're stuck
