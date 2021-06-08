import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

class CollisionDetector {
  constructor() {
    this.positionDetector = null;
    this.detectorsInputObservable$ = new Observable((subscriber) => {
      this.positionDetector = subscriber;
    });
    this.inputConnection$ = null;
  }

  connectSource$(positionRetrievingCb) {
    return this.detectorsInputObservable$.pipe(
      map((position) => {
        const objectAtPos =
          position == null ? null : positionRetrievingCb(position);
        return { id: uuidv4(), position, objectAtPos };
      }),
      filter(({ objectAtPos }) => objectAtPos != null),
      startWith({ id: uuidv4(), change: false }),
    );
  }
}

export default CollisionDetector;

// connectSource$(positionRetrievingCb, observer) {

//   this.inputConnection$ = this.detectorsInputObservable.subscribe(
//     (position) => {
//       const objectAtPos = positionRetrievingCb(position);
//       if (objectAtPos !== null) {
//         observer.next({ position, objectAtPos });
//       }
//     },
//   );
// }

// disconnect() {
//   this.inputConnection$.unsubscribe();
// }
// const CollisionDetecor = (function CollisionDetecorIIFE() {
//   let positionDetector; // is supplied with position changes by next method

//   const detectorsInputObservable = new Observable((subscriber) => {
//     positionDetector = subscriber;
//   });

//   let inputConnection$;
//   const connectSource = (retriever, recivingObserver) => {
//     // connect here function to retrieve object from board
//     inputConnection$ = detectorsInputObservable.subscribe((position) => {
//       const objectAtPos = retriever(position);
//       if (objectAtPos !== null) {
//         recivingObserver.next({ position, objectAtPos });
//       }
//     });
//   };

//   const disconnect = () => inputConnection$.unsubscribe();

//   return {
//     connectSource,
//     positionDetector,
//     disconnect,
//   };
// })();

// at pos change in ship => retrieve obj at pos based on provided function

// connect to ship, each time there is a pos/vector/state change trigger collision detector (detector.next(pos, vector))
// detector ...
