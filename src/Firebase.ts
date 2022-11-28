const {
  initializeApp,
  applicationDefault,
  cert
} = require("firebase-admin/app")
const {
  getFirestore,
  Timestamp,
  FieldValue
} = require("firebase-admin/firestore")

var serviceAccount = require("../doublejargon-firebase-adminsdk-gr0qn-d370e7e00d.json")

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL:
    "https://doublejargon-default-rtdb.europe-west1.firebasedatabase.app"
})

const db = getFirestore()

export { db }
