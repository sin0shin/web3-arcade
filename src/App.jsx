import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import GuessNumber from './components/GuessNumber';
import './App.css';

function App() {
  const { isConnected } = useAccount();
  // نگهداری وضعیت اینکه چه بازی‌ای در حال اجراست (اگر null باشد، داشبورد نمایش داده می‌شود)
  const [activeGame, setActiveGame] = useState(null);

  const handleSelectGame = (gameId) => {
    if (!isConnected) {
      alert("لطفاً ابتدا کیف پول خود را متصل کنید (Connect Wallet).");
      return;
    }
    setActiveGame(gameId);
  };

  // اگر بازی شماره ۱ انتخاب شده باشد، کامپوننت GuessNumber را رندر می‌کنیم
  if (activeGame === 1) {
    return <GuessNumber onBack={() => setActiveGame(null)} />;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>پلتفرم آرکید وب۳</h1>
        <p>شبکه تستی اتریوم (Sepolia)</p>
        <ConnectButton showBalance={false} />
      </header>

      <main style={styles.main}>
        <h2>بازی مورد علاقه خود را انتخاب کنید</h2>
        <p style={styles.subtitle}>برای شروع بازی‌ها، اتصال کیف پول الزامی است.</p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>🎮 بازی حدس عدد</h3>
            <p>شانس خود را امتحان کن و عدد مخفی را حدس بزن.</p>
            <button style={styles.button} onClick={() => handleSelectGame(1)}>شروع بازی ۱</button>
          </div>

          <div style={styles.card}>
            <h3>✂️ سنگ، کاغذ، قیچی</h3>
            <p>کلاسیک و جذاب؛ هوش مصنوعی را شکست بده.</p>
            <button style={styles.button} onClick={() => handleSelectGame(2)}>شروع بازی ۲</button>
          </div>

          <div style={styles.card}>
            <h3>🎲 بازی دوز (Tic-Tac-Toe)</h3>
            <p>مهارت‌های استراتژیک خود را به چالش بکش.</p>
            <button style={styles.button} onClick={() => handleSelectGame(3)}>شروع بازی ۳</button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>توسعه‌یافته روی شبکه Sepolia - تست پرداخت‌های کریپتو</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Tahoma, Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9fbfd',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    marginBottom: '30px',
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: '900px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '50px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
    border: '1px solid #eef2f6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footer: {
    marginTop: 'auto',
    padding: '20px',
    color: '#888',
    fontSize: '14px',
  }
};

export default App;
