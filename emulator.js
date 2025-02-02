import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  connectAuthEmulator 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  connectFirestoreEmulator 
} from "firebase/firestore";

// Firebase Config (Placeholder for Emulator)
const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "localhost",
  projectId: "demo-project",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Connect to Firebase Emulators in Dev Mode
if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

// Authentication Functions
const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Sign-in error:", error);
  }
};

const logOut = () => signOut(auth);

// Firestore Functions
const addMessage = async (text, user) => {
  await addDoc(collection(db, "messages"), {
    text,
    user,
    timestamp: new Date(),
  });
};

const getMessages = async () => {
  const querySnapshot = await getDocs(collection(db, "messages"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { auth, signIn, logOut, addMessage, getMessages };
