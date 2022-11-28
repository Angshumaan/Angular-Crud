import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

// export const readFormData = functions.firestore
//   .document('getFormValues')
//   .onUpdate((change, context) => {
//     // Get an object representing the current document
//     const newValue = change.after.data();
//     console.log(newValue);

//     // ...or the previous value before this update
//     const previousValue = change.before.data();
//   });

export const myUppercaseFunction = functions.https.onCall((data, context) => {
  return { msg: data.coolMsg.toUpperCase(), date: new Date().getTime() };
});
