import React, { useState } from 'react';
import { useAccount } from 'wagmi';

function GuessNumber({ onBack, language }) {
  const { isConnected } = useAccount();
  const [targetNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  // دیکشنری متن‌های بازی حدس عدد
  const t = {
    en: {
      title: '🎮 Guess the Number Game',
      desc: 'Guess a number between 1 and 10.',
      placeholder: 'Enter your number',
      check: 'Check Guess',
      back: 'Back to Dashboard',
      success: '🎉 Congratulations! You guessed the right number.',
      tooSmall: '📉 Your number is too small. Try again!',
      tooLarge: '📈 Your number is too large. Try again!',
      walletAlert: 'Please connect your wallet first.',
      invalidInput: '⚠️ Please enter a valid number between 1 and 10.'
    },
    fa: {
      title: '🎮 بازی حدس عدد',
      desc: 'یک عدد بین ۱ تا ۱۰ حدس بزنید.',
      placeholder: 'عدد خود را وارد کنید',
      check: 'بررسی حدس',
      back: 'بازگشت به داشبورد',
      success: '🎉 تبریک! عدد درست را حدس زدید.',
      tooSmall: '📉 عدد شما کوچک‌تر است. بیشتر تلاش کن!',
      tooLarge: '📈 عدد شما بزرگ‌تر است. کمتر تلاش کن!',
      walletAlert: 'لطفاً ابتدا کیف پول خود را متصل کنید.',
      invalidInput: '⚠️ لطفاً یک عدد معتبر بین ۱ تا ۱۰ وارد کنید.'
    },
    es: {
      title: '🎮 Juego de Adivina el Número',
      desc: 'Adivina un número entre 1 y 10.',
      placeholder: 'Introduce tu número',
      check: 'Comprobar Adivinanza',
      back: 'Volver al Panel',
      success: '🎉 ¡Felicidades! Adivinaste el número correcto.',
      tooSmall: '📉 Tu número es demasiado pequeño. ¡Inténtalo de nuevo!',
      tooLarge: '📈 Tu número es demasiado grande. ¡Inténtalo de nuevo!',
      walletAlert: 'Por favor, conecta tu billetera primero.',
      invalidInput: '⚠️ Por favor, introduce un número válido entre 1 y 10.'
    },
    fr: {
      title: '🎮 Jeu Devinez le Nombre',
      desc: 'Devinez un nombre entre 1 et 10.',
      placeholder: 'Entrez votre nombre',
      check: 'Vérifier',
      back: 'Retour au Tableau de Bord',
      success: '🎉 Félicitations ! Vous avez deviné le bon nombre.',
      tooSmall: '📉 Votre nombre est trop petit. Réessayez !',
      tooLarge: '📈 Votre nombre est trop grand. Réessayez !',
      walletAlert: 'Veuillez d\'abord connecter votre portefeuille.',
      invalidInput: '⚠️ Veuillez entrer un nombre valide entre 1 et 10.'
    }
  };

  const selectedLang = t[language] || t.en;

  const handleCheckGuess = () => {
    if (!isConnected) {
      alert(selectedLang.walletAlert);
      return;
    }

    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 10) {
      setMessage(selectedLang.invalidInput);
      return;
    }

    if (numGuess === targetNumber) {
      setMessage(selectedLang.success);
    } else if (numGuess < targetNumber) {
      setMessage(selectedLang.tooSmall);
    } else {
      setMessage(selectedLang.tooLarge);
    }
  };

  return (
    <div style={styles.gameContainer}>
      <h2>{selectedLang.title}</h2>
      <p>{selectedLang.desc}</p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder={selectedLang.placeholder}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleCheckGuess}>{selectedLang.check}</button>

      {message && <p style={styles.message}>{message}</p>}

      <button style={styles.backButton} onClick={onBack}>{selectedLang.back}</button>
    </div>
  );
}

const styles = {
  gameContainer: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center',
    fontFamily: 'Tahoma, Arial, sans-serif',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '80%',
    marginBottom: '15px',
    textAlign: 'center',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '85%',
    marginBottom: '15px',
  },
  backButton: {
    padding: '10px 15px',
    backgroundColor: '#64748b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  message: {
    marginTop: '15px',
    fontWeight: 'bold',
    color: '#1e293b',
  }
};

export default GuessNumber;
