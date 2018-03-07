import Controller from '@ember/controller';
import { storageFor } from 'ember-local-storage';

const operators = ["*", "+", "-", "/", "^"];

export default Controller.extend({
  calculations: storageFor('calculations'),

  actions: {
    handleNumPress(num) {
      let   currentDisplay        = this.get('calculations.currentDisplay');
      let   currentCalculation    = this.get('calculations.currentCalculation');
      const isLeadingZero         = num === "0" && ["0", ""].includes(currentDisplay);
      const isSecondDecimalPoint  = num === "." && currentDisplay.includes(".");
      const isLeadingDecimalPoint = num === "." && currentDisplay === "";
      if(isLeadingZero || isSecondDecimalPoint) {
        return;
      }else if(isLeadingDecimalPoint){
        currentDisplay += "0";
      }
      currentDisplay += num;
      if(!operators.includes(currentCalculation.slice(-1))){
        currentCalculation = currentCalculation.split(" ").slice(0, -1).join(" ");
      }
      if(currentCalculation.length){
        currentCalculation = `${currentCalculation} ${currentDisplay}`;
      }else{
        currentCalculation = currentDisplay;
      }
      this.set('calculations.currentDisplay', currentDisplay);
      this.set('calculations.currentCalculation', currentCalculation);
    },
    handleSignPress(){
      let   currentDisplay      = this.get('calculations.currentDisplay');
      let   currentCalculation  = this.get('calculations.currentCalculation');
      const isDisplayEmpty      = currentDisplay === "";
      const isDisplayZero       = /^0.0*$/.test(currentDisplay);
      if(isDisplayEmpty || isDisplayZero){
        return;
      }else if(currentDisplay.indexOf("-") === 0){
        currentDisplay = currentDisplay.slice(1);
      }else{
        currentDisplay = `-${currentDisplay}`;
      }
      if(!operators.includes(currentCalculation.slice(-1))){
        currentCalculation = currentCalculation.split(" ").slice(0, -1).join(" ");
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
      let currentCalculation = this.get('calculations.currentCalculation');
      if(operators.includes(currentCalculation.slice(-1))){
        currentCalculation = currentCalculation.replace(/.$/, operator);
      }else{
        currentCalculation = `(${currentCalculation}) ${operator}`;
      }
      this.set('calculations.currentDisplay', '');
      this.set('calculations.currentCalculation', currentCalculation);
    },
    handleSqrtPress(){
      this.send("handleOperationPress", "^");
      this.send("handleNumPress", ".");
      this.send("handleNumPress", "5");
    },
    clearDisplay(){
      this.set('calculations.currentDisplay', '');
      this.set('calculations.currentCalculation', '');
    },
    calculate(){

    },
  }
});
