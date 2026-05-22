/**
 * firebase.js — Firebase initialization & Firestore helpers
 * Uses environment variables: VITE_FIREBASE_API_KEY, etc.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// ─── Firebase config from .env ────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Prevent duplicate app initialization in HMR / strict mode
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const db  = getFirestore(app);

// Initialize Analytics conditionally (it requires browser environment and measurementId)
let analytics;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

// ─── Submit survey response ───────────────────────────────────────────────────

/**
 * Submits the full user session payload to Firestore `survey_responses`.
 * @param {object} userData  - Full userData object from CampaignContext
 * @returns {Promise<string>} - Firestore document ID on success
 */
// Helper: timeout promise
function withTimeout(promise, ms = 10000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Firestore timeout setelah ${ms / 1000}s. Periksa koneksi internet dan konfigurasi Firebase.`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// Daftar nilai placeholder yang berarti .env belum dikonfigurasi
const PLACEHOLDER_PATTERNS = ['isi_', 'your_', '<', 'FILL'];

function isPlaceholder(value) {
  if (!value) return true;
  return PLACEHOLDER_PATTERNS.some((p) => value.startsWith(p));
}

export async function submitSurveyResponse(userData) {
  // Guard: pastikan env vars bukan placeholder atau kosong
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const apiKey    = import.meta.env.VITE_FIREBASE_API_KEY;

  if (isPlaceholder(projectId) || isPlaceholder(apiKey)) {
    throw new Error(
      `Firebase belum dikonfigurasi. Project ID: "${projectId}", API Key: "${apiKey}". ` +
      'Isi file .env dengan nilai asli dari Firebase Console.'
    );
  }

  const payload = {
    timestamp:           serverTimestamp(),
    profiling:           userData.profiling          ?? {},
    preTest:             userData.preTest             ?? {},
    sandboxInteractions: userData.sandboxInteractions ?? {},
    postTest:            userData.postTest            ?? {},
    feedback:            userData.feedback            || '',
  };

  try {
    // Bungkus dengan timeout 10 detik untuk menghindari infinite hang
    const docRef = await withTimeout(
      addDoc(collection(db, 'survey_responses'), payload),
      10000
    );
    return docRef.id;
  } catch (error) {
    console.error('[firebase.js] addDoc gagal:', error);
    throw error;
  }
}

export { db };
