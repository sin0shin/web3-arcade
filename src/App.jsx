import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import GuessNumber from './components/GuessNumber';
import RockPaperScissors from './components/RockPaperScissors';
import TicTacToe from './components/TicTacToe';
import './App.css';

function App() {
  const { isConnected } = useAccount();
  const [activeGame, setActiveGame] = useState(null);
  const [language, setLanguage] = useState('en');

  const t = {
    en: {
      title: 'Web3 Arcade Platform',
      network: 'Ethereum Testnet (Sepolia)',
      heading: 'Choose Your Favorite Game',
      subtitle: 'Connecting a wallet is required to start games.',
      game1Title: '🎮 Guess the Number',
      game1Desc: 'Test your luck and guess the secret number.',
      game1Btn: 'Start Game 1',
      game2Title: '✂️ Rock, Paper, Scissors',
      game2Desc: 'Classic and engaging; beat the AI.',
      game2Btn: 'Start Game 2',
      game3Title: '🎲 Tic-Tac-Toe',
      game3Desc: 'Challenge your strategic skills.',
      game3Btn: 'Start Game 3',
      footer: 'Developed on Sepolia Network - Testing Crypto Payments',
      walletAlert: 'Please connect your wallet first (Connect Wallet).'
    },
    fa: {
      title: 'پلتفرم آرکید وب۳',
      network: 'شبکه تستی اتریوم (Sepolia)',
      heading: 'بازی مورد علاقه خود را انتخاب کنید',
      subtitle: 'برای شروع بازی‌ها، اتصال کیف پول الزامی است.',
      game1Title: '🎮 بازی حدس عدد',
      game1Desc: 'شانس خود را امتحان کن و عدد مخفی را حدس بزن.',
      game1Btn: 'شروع بازی ۱',
      game2Title: '✂️ سنگ، کاغذ، قیچی',
      game2Desc: 'کلاسیک و جذاب؛ هوش مصنوعی را شکست بده.',
      game2Btn: 'شروع بازی ۲',
      game3Title: '🎲 بازی دوز (Tic-Tac-Toe)',
      game3Desc: 'مهارت‌های استراتژیک خود را به چالش بکش.',
      game3Btn: 'شروع بازی ۳',
      footer: 'توسعه‌یافته روی شبکه Sepolia - تست پرداخت‌های کریپتو',
      walletAlert: 'لطفاً ابتدا کیف پول خود را متصل کنید (Connect Wallet).'
    },
    es: {
      title: 'Plataforma Web3 Arcade',
      network: 'Red de Pruebas Ethereum (Sepolia)',
      heading: 'Elige tu juego favorito',
      subtitle: 'Se requiere conectar una billetera para iniciar juegos.',
      game1Title: '🎮 Adivina el Número',
      game1Desc: 'Pon a prueba tu suerte y adivina el número secreto.',
      game1Btn: 'Iniciar Juego 1',
      game2Title: '✂️ Piedra, Papel o Tijera',
      game2Desc: 'Clásico y atractivo; vence a la IA.',
      game2Btn: 'Iniciar Juego 2',
      game3Title: '🎲 Tic-Tac-Toe (Gato)',
      game3Desc: 'Desafía tus habilidades estratégicas.',
      game3Btn: 'Iniciar Juego 3',
      footer: 'Desarrollado en la red Sepolia - Probando pagos cripto',
      walletAlert: 'Por favor, conecta tu billetera primero (Connect Wallet).'
    },
    fr: {
      title: 'Plateforme Web3 Arcade',
      network: 'Réseau de Test Ethereum (Sepolia)',
      heading: 'Choisissez votre jeu préféré',
      subtitle: 'La connexion d\'un portefeuille est requise pour lancer les jeux.',
      game1Title: '🎮 Devinez le Nombre',
      game1Desc: 'Tentez votre chance et devinez le nombre secret.',
      game1Btn: 'Lancer le jeu 1',
      game2Title: '✂️ Pierre, Feuille, Ciseaux',
      game2Desc: 'Classique et captivant ; battez l\'IA.',
      game2Btn: 'Lancer le jeu 2',
      game3Title: '🎲 Morpion (Tic-Tac-Toe)',
      game3Desc: 'Défiez vos compétences stratégiques.',
      game3Btn: 'Lancer le jeu 3',
      footer: 'Développé sur le réseau Sepolia - Test des paiements crypto',
      walletAlert: 'Veuillez d\'abord connecter votre portefeuille (Connect Wallet).'
    }
  };

  const selectedText = t[language] || t.en;

  const handleSelectGame = (gameId) => {
    if (!isConnected) {
      alert(selectedText.walletAlert);
      return;
    }
    setActiveGame(gameId);
  };

  // هدایت به بازی حدس عدد
  if (activeGame === 1) {
    return <GuessNumber onBack={() => setActiveGame(null)} language={language} />;
  }

  // هدایت به بازی سنگ، کاغذ، قیچی
  if (activeGame === 2) {
    return <RockPaperScissors onBack={() => setActiveGame(null)} language={language} />;
  }

  // هدایت به بازی دوز
  if (activeGame === 3) {
    return <TicTacToe onBack={() => setActiveGame(null)} language={language} />;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.langContainer}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.langSelect}
          >
            <option value="en">English (EN)</option>
            <option value="fa">فارسی (FA)</option>
            <option value="es">Español (ES)</option>
            <option value="fr">Français (FR)</option>
          </select>
        </div>

        <div>
          <h1 style={styles.title}>{selectedText.title}</h1>
          <p style={styles.network}>{selectedText.network}</p>
        </div>
        
        <ConnectButton showBalance={false} />
      </header>

      <main style={styles.main}>
        <h2>{selectedText.heading}</h2>
        <p style={styles.subtitle}>{selectedText.subtitle}</p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>{selectedText.game1Title}</h3>
            <p>{selectedText.game1Desc}</p>
            <button style={styles.button} onClick={() => handleSelectGame(1)}>{selectedText.game1Btn}</button>
          </div>

          <div style={styles.card}>
            <h3>{selectedText.game2Title}</h3>
            <p>{selectedText.game2Desc}</p>
            <button style={styles.button} onClick={() => handleSelectGame(2)}>{selectedText.game2Btn}</button>
          </div>

          <div style={styles.card}>
            <h3>{selectedText.game3Title}</h3>
            <p>{selectedText.game3Desc}</p>
            <button style={styles.button} onClick={() => handleSelectGame(3)}>{selectedText.game3Btn}</button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>{selectedText.footer}</p>
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
    maxWidth: '850px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    marginBottom: '30px',
  },
  langContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  langSelect: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: '#f8fafc',
    fontWeight: 'bold'
  },
  title: {
    margin: 0,
    fontSize: '24px'
  },
  network: {
    margin: 0,
    fontSize: '12px',
    color: '#64748b'
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
