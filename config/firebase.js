const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config(); // Mengatur environment variables dari file .env

// const serviceAccount = require('./serviceAccountKey.json');

const serviceAccount = {
  type: "service_account",
  project_id: "dincuytech",
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: "firebase-adminsdk-jahox@dincuytech.iam.gserviceaccount.com",
  client_id: "115886293658291098967",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jahox%40dincuytech.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = { db }