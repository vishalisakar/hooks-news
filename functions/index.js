const functions = require('firebase-functions');
// import { LINKS_PER_PAGE } from './../src/utils/index';

const LINKS_PER_PAGE = 5
// const { LINKS_PER_PAGE } = require('../src/utils')

const admin = require('firebase-admin')
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://hooks-news-app-7ecdd.firebaseio.com"
})

const db = admin.firestore
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/
//
exports.linksPagination = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
response.set('Access-Control-Allow-Origin', "*")
let linkRef = db.CollectionReference('link')
const offset = Number(request.query.offset)
linkRef
  .orderBy('create', 'desc')
  .limit(LINKS_PER_PAGE)
  .offset(offset)
  .get()
  .then(snapshot => {
      const links = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
      })
      response.json(link)
  })
});
