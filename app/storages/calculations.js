import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

// Uncomment if you would like to set initialState
Storage.reopenClass({
  initialState() {
    return(
      {
        currentDisplay:       "0",
        currentCalculation:   "0",
        pastCalculations:     [],
        justPressedOperation: false
      }
    );
  }
});

export default Storage;
