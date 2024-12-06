import React from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const SignInForm = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Signed In: ", result.user);
    } catch (error) {
      console.error("Error during sign-in: ", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        <p style={styles.subtitle}>Access your account quickly and securely</p>

        <button style={styles.googleButton} onClick={handleGoogleSignIn}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google Icon"
            style={styles.icon}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    textAlign: 'center',
    width: '300px',
  },
  title: {
    margin: '10px 0',
    fontSize: '24px',
    color: '#333',
  },
  subtitle: {
    margin: '10px 0',
    fontSize: '14px',
    color: '#777',
  },
  googleButton: {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#4285F4',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    marginRight: '10px',
    height: '24px',
  },
};

export default SignInForm;
