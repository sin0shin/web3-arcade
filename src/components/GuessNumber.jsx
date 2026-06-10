import React, { useState } from 'react';
import { useAccount } from 'wagmi';

function GuessNumber({ onBack }) {
  const { isConnected } = useAccount();
  const [targetNumber] = useState(Math.floor(Math.random() * 10) + 1); // عدد تصادفی بین ۱ تا ۱۰
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckGuess = () => {
    if (!isConnected) {
      alert("لطفاً ابتدا کیف پول خود را متصل کنید.");
      return;
    }

    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 10) {
      setMessage('⚠️ لطفاً یک عدد بین ۱ تا ۱۰ وارد کنید.');
      return;
    }

    if (numGuess === targetNumber) {
      setMessage('🎉 تبریک! عدد درست را حدس زدید.');
    } else if (numGuess < targetNumber) {
      setMessage('📉 عدد شما کوچک‌تر است. بیشتر تلاش کن!');
    } else {
      setMessage('📈 عدد شما بزرگ‌تر است. کمتر تلاش کن!');
    }
  };

  return (
    <div style={styles.gameContainer}>
      <h2>🎮 بازی حدس عدد</h2>
      <p>یک عدد بین ۱ تا ۱۰ حدس بزنید.</p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="عدد خود را وارد کنید"
        style={styles.input}
      />

      <button style={styles.button} onClick={handleCheckGuess}>بررسی حدس</button>

      {message && <p style={styles.message}>{message}</p>}

      <button style={styles.backButton} onClick={onBack}>بازگشت به داشبورد</button>
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
