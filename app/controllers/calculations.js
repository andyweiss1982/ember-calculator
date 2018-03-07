import Controller from '@ember/controller';
import { storageFor } from 'ember-local-storage';

export default Controller.extend({
  calculations: storageFor('calculations'),

  actions: {
    handleNumPress(num) {
      let   currentDisplay        = this.get('calculations.currentDisplay');
      const isLeadingZero         = num === "0" && ["0", ""].includes(currentDisplay);
      const isSecondDecimalPoint  = num === "." && currentDisplay.includes(".");
      const isLeadingDecimalPoint = num === "." && currentDisplay === "";
      if(isLeadingZero || isSecondDecimalPoint) {
        return;
      }else if(isLeadingDecimalPoint){
        currentDisplay += "0";
      }
      currentDisplay += num;
      this.set('calculations.currentDisplay', currentDisplay);
    },
    clearDisplay(){
      this.set('calculations.currentDisplay', '');
    }
  }
});
