import React, { useState } from 'react';
import { useAccount } from 'wagmi';

function RockPaperScissors({ onBack, language }) {
  const { isConnected } = useAccount();
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  // دیکشنری متن‌های بازی
  const t = {
    en: {
      title: '✂️ Rock, Paper, Scissors',
      desc: 'Choose your weapon and beat the AI!',
      rock: 'Rock',
      paper: 'Paper',
      scissors: 'Scissors',
      yourChoice: 'Your choice',
      aiChoice: 'AI choice',
      win: '🎉 You Won!',
      lose: '😢 You Lost!',
      draw: '🤝 It\'s a Draw!',
      back: 'Back to Dashboard',
      walletAlert: 'Please connect your wallet first.'
    },
    fa: {
      title: '✂️ سنگ، کاغذ، قیچی',
      desc: 'سلاح خود را انتخاب کن و هوش مصنوعی را شکست بده!',
      rock: 'سنگ',
      paper: 'کاغذ',
      scissors: 'قیچی',
      yourChoice: 'انتخاب شما',
      aiChoice: 'انتخاب هوش مصنوعی',
      win: '🎉 شما بردید!',
      lose: '😢 شما باختید!',
      draw: '🤝 مساوی شدید!',
      back: 'بازگشت به داشبورد',
      walletAlert: 'لطفاً ابتدا کیف پول خود را متصل کنید.'
    },
    es: {
      title: '✂️ Piedra, Papel o Tijera',
      desc: '¡Elige tu arma y vence a la IA!',
      rock: 'Piedra',
      paper: 'Papel',
      scissors: 'Tijera',
      yourChoice: 'Tu elección',
      aiChoice: 'Elección de la IA',
      win: '🎉 ¡Ganaste!',
      lose: '😢 ¡Perdiste!',
      draw: '🤝 ¡Empate!',
      back: 'Volver al Panel',
      walletAlert: 'Por favor, conecta tu billetera primero.'
    },
    fr: {
      title: '✂️ Pierre, Feuille, Ciseaux',
      desc: 'Choisissez votre arme et battez l\'IA !',
      rock: 'Pierre',
      paper: 'Feuille',
      scissors: 'Ciseaux',
      yourChoice: 'Votre choix',
      aiChoice: 'Choix de l\'IA',
      win: '🎉 Vous avez gagné !',
      lose: '😢 Vous avez perdu !',
      draw: '🤝 Égalité !',
      back: 'Retour au Tableau de Bord',
      walletAlert: 'Veuillez d\'abord connecter votre portefeuille.'
    }
  };

  const selectedLang = t[language] || t.en;

  const handlePlay = (choice) => {
    if (!isConnected) {
      alert(selectedLang.walletAlert);
      return;
    }

    const choices = ['rock', 'paper', 'scissors'];
    const aiRanChoice = choices[Math.floor(Math.random() * 3)];

    setUserChoice(choice);
    setComputerChoice(aiRanChoice);

    // محاسبه نتیجه بازی
    if (choice === aiRanChoice) {
      setResult(selectedLang.draw);
    } else if (
      (choice === 'rock' && aiRanChoice === 'scissors') ||
      (choice === 'paper' && aiRanChoice === 'rock') ||
      (choice === 'scissors' && aiRanChoice === 'paper')
    ) {
      setResult(selectedLang.win);
    } else {
      setResult(selectedLang.lose);
    }
  };

  // نگاشت نام گزینه‌ها به ترجمه
  const translateChoice = (choiceKey) => {
    if (choiceKey === 'rock') return selectedLang.rock;
    if (choiceKey === 'paper') return selectedLang.paper;
    if (choiceKey === 'scissors') return selectedLang.scissors;
    return '';
  };

  return (
    <div style={styles.gameContainer}>
      <h2>{selectedLang.title}</h2>
      <p>{selectedLang.desc}</p>

      <div style={styles.choices}>
        <button style={styles.choiceBtn} onClick={() => handlePlay('rock')}>🪨 {selectedLang.rock}</button>
        <button style={styles.choiceBtn} onClick={() => handlePlay('paper')}>📄 {selectedLang.paper}</button>
        <button style={styles.choiceBtn} onClick={() => handlePlay('scissors')}>✂️ {selectedLang.scissors}</button>
      </div>

      {userChoice && (
        <div style={styles.resultBox}>
          <p><strong>{selectedLang.yourChoice}:</strong> {translateChoice(userChoice)}</p>
          <p><strong>{selectedLang.aiChoice}:</strong> {translateChoice(computerChoice)}</p>
          <h3 style={styles.resultText}>{result}</h3>
        </div>
      )}

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
    maxWidth: '450px',
    margin: '20px auto',
    textAlign: 'center',
    fontFamily: 'Tahoma, Arial, sans-serif',
  },
  choices: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '25px 0',
  },
  choiceBtn: {
    padding: '15px',
    fontSize: '16px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: '25px',
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  resultText: {
    color: '#0f172a',
    marginTop: '10px',
  },
  backButton: {
    padding: '10px 15px',
    backgroundColor: '#64748b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '25px',
  }
};

export default RockPaperScissors;
