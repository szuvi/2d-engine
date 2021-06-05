/* eslint-disable no-underscore-dangle */
import { Observable } from 'rxjs';

class Board {
  constructor(fields) {
    this.fields = fields;
    this.size = { rows: this.fields.length, columns: this.fields[0].length };
    this.subscriber = null;
  }

  getState() {
    return this.fields;
  }

  getBoardUpdates$() {
    return new Observable((subscriber) => {
      this.subscriber = subscriber;
    });
  }

  updateAtBatch(arrayOfActions) {
    arrayOfActions.forEach((action) => this.triggerAction(action));
    this.pushUpdate();
  }

  triggerAction({ type, payload }) {
    switch (type) {
      case 'place': {
        this._place(payload);
        break;
      }
      case 'destroy': {
        this._destroy(payload);
        break;
      }
      default:
        throw new Error('Incorrect trigger action type');
    }
  }

  _place(object, [x, y]) {
    this.triggerBoundError([x, y]);
    this.fields[x][y] = object;
  }

  _destroy([x, y]) {
    this.triggerBoundError([x, y]);
    this.fields[x][y] = null;
  }

  placeAtPos(object, [x, y]) {
    this._place(object, [x, y]);
    this.pushUpdate();
  }

  destroyAtPos([x, y]) {
    this._destroy([x, y]);
    this.pushUpdate();
  }

  triggerBoundError(pos) {
    if (!this.isInBounds(pos)) {
      throw new Error(`Position ${pos} is out of bounds!`);
    }
  }

  isInBounds([x, y]) {
    return x < this.size.rows && x >= 0 && y < this.size.columns && y >= 0;
  }

  pushUpdate() {
    if (this.subscriber != null) {
      this.subscriber.next(this.fields);
    }
  }

  getFieldAtPos([x, y]) {
    if (!this.isInBounds([x, y])) {
      return null;
    }
    return this.fields[x][y];
  }

  wipe() {
    this.fields = Board.generateEmpty();
    this.pushUpdate();
  }

  forEachField(callback) {
    this.fields.forEach((row) => row.forEach((field) => callback(field)));
  }

  // getFieldNeighbours([x, y]) {
  //   return Object.values(positionModifiers)
  //     .map((modifier) => this.getCellAtPos(modifier([x, y])))
  //     .filter((cell) => cell != null);
  // }
}

export default Board;
