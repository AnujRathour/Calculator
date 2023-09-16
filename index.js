class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
      this.previousOperandTextElement=previousOperandTextElement;
      this.currentOperandTextElement=currentOperandTextElement;
      this.clear();
    }
    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined;
    }
    delete(){
       this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number=='.'&&this.currentOperand.includes('.')) return;
      this.currentOperand=this.currentOperand.toString()+number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand==='') return;
        if(this.previousOperand!==''){
            this.compute();
        }
        this.operation=operation;
       //   this.currentOperand=this.currentOperand.toString()+operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }
    getDisplayNumber(number){
        
    }
    compute(){
     let result=0;
     let prev=parseFloat(this.previousOperand);
     let curr=parseFloat(this.currentOperand);
     if(isNaN(prev)||isNaN(curr)) return;
     switch(this.operation){
        case '+':result=prev+curr;
        break;
        case '-':result=prev-curr;
        break;
        case '*':result=prev*curr;
        break;
        case '÷':result=prev/curr;
        break;
        default: return;
     }
     this.currentOperand=result;
     this.operation=undefined;
     this.previousOperand='';
    }
    updateDisplay(){
     this.currentOperandTextElement.innerText=this.currentOperand;
     if(this.operation!==null){
         this.previousOperandTextElement.innerText=`${this.previousOperand} ${this.operation}`;
     }
     else{
        this.previousOperandTextElement.innerText='';
     }
    }
}
const numberButtons=document.querySelectorAll("[data-number]");
const operationButtons=document.querySelectorAll('[data-operation]');
const deleteButton=document.querySelector('[data-delete]');
const allClearButton=document.querySelector('[data-all-clear]');
const equalsButton=document.querySelector('[data-equals]');
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');

const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click',()=>{
    calculator.clear();
   calculator.updateDisplay();

})
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})