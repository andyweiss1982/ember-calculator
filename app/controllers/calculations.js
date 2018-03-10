import Controller from '@ember/controller';
import { storageFor } from 'ember-local-storage';
import mathjs from 'npm:mathjs';

const operators = ["*", "+", "-", "/", "^"];

export default Controller.extend({
  calculations: storageFor('calculations'),

  actions: {
    handleNumPress(num) {
      let   currentDisplay        = this.get('calculations.currentDisplay');
      let   currentCalculation    = this.get('calculations.currentCalculation');
      const justPressedOperation  = this.get('calculations.justPressedOperation');
      const isSecondDecimalPoint  = num === "." && currentDisplay.includes(".");
      const isOverwritingZero     = currentDisplay === "0" && num !== ".";
      const isLastCharacterNumber = !operators.includes(currentCalculation.slice(-1))
      const calcWithoutLastNumber = currentCalculation.split(" ").slice(0, -1).join(" ")
      if(isSecondDecimalPoint){return;}
      if(isOverwritingZero){
        currentDisplay = num;
      }else if(justPressedOperation){
        if(num === "."){
          currentDisplay = `0${num}`;
        }else{
          currentDisplay = num;
        }
      }else{
        currentDisplay += num;
      }
      if(isLastCharacterNumber){
        currentCalculation = calcWithoutLastNumber;
      }
      if(currentCalculation.length){
        currentCalculation = `${currentCalculation} ${currentDisplay}`;
      }else{
        currentCalculation = currentDisplay;
      }
      this.set('calculations.currentDisplay', currentDisplay);
      this.set('calculations.currentCalculation', currentCalculation);
      this.set('calculations.justPressedOperation', false)
    },
    handleSignPress(){
      let   currentDisplay      = this.get('calculations.currentDisplay');
      let   currentCalculation  = this.get('calculations.currentCalculation');
      const isDisplayingZero    = currentDisplay === "0" || /^0.0*$/.test(currentDisplay);
      const isNegativeNumber    = currentDisplay.indexOf("-") === 0
      const isLastCharacterNumber = !operators.includes(currentCalculation.slice(-1))
      const calcWithoutLastNumber = currentCalculation.split(" ").slice(0, -1).join(" ")
      if(isDisplayingZero){
        return;
      }else if(isNegativeNumber){
        currentDisplay = currentDisplay.slice(1);
      }else{
        currentDisplay = `-${currentDisplay}`;
      }
      if(isLastCharacterNumber){
        currentCalculation = calcWithoutLastNumber;
      }
      if(currentCalculation.length){
        currentCalculation = `${currentCalculation} (${currentDisplay})`;
      }else{
        currentCalculation = `(${currentDisplay})`;
      }
      this.set('calculations.currentDisplay', currentDisplay);
      this.set('calculations.currentCalculation', currentCalculation);
    },
    handleOperationPress(operator){
      const justPressedOperation    = this.get('calculations.justPressedOperation');
      const currentDisplay          = this.get('calculations.currentDisplay');
      let   currentCalculation      = this.get('calculations.currentCalculation');
      let   result                  = "";
      const isLastCharacterOperator = operators.includes(currentCalculation.slice(-1))
      if(justPressedOperation && !isLastCharacterOperator){
        currentCalculation = currentDisplay;
      }
      if(isLastCharacterOperator){
        currentCalculation = currentCalculation.replace(/.$/, operator);
      }else{
        try{
          result = String(mathjs.eval(currentCalculation));
        }catch(error){
          // do nothing
        }
        currentCalculation = `(${currentCalculation}) ${operator}`;
      }
      this.set('calculations.currentDisplay', result);
      this.set('calculations.currentCalculation', currentCalculation);
      this.set('calculations.justPressedOperation', true)
    },
    handleSqrtPress(){
      this.send("handleOperationPress", "^");
      this.send("handleNumPress", "0");
      this.send("handleNumPress", ".");
      this.send("handleNumPress", "5");
      const currentCalculation  = this.get('calculations.currentCalculation');
      let   result              = "";
      try{
        result = String(mathjs.eval(currentCalculation));
      }catch(error){
        return;
      }
      this.set('calculations.currentDisplay', result);
    },
    clearDisplay(){
      this.set('calculations.currentDisplay', '0');
      this.set('calculations.currentCalculation', '0');
    },
    calculate(){
      let currentCalculation  = this.get('calculations.currentCalculation');
      let pastCalculations    = this.get('calculations.pastCalculations');
      let result              = "";
      try{
        result = String(mathjs.eval(currentCalculation));
      }catch(error){
        return;
      }
      pastCalculations.unshift(`${currentCalculation} = ${result}`);
      pastCalculations = pastCalculations.filter((calculation, index) => {return index < 10});
      this.set('calculations.currentDisplay', result);
      this.set('calculations.currentCalculation', result);
      this.set('calculations.pastCalculations', pastCalculations);
      this.set('calculations.justPressedOperation', true)
    },
  }
});
