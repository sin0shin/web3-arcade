import React, { useState } from 'react';
import { useAccount } from 'wagmi';

function TicTacToe({ onBack, language }) {
  const { isConnected } = useAccount();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // کاربر همیشه X است، هوش مصنوعی O
  const [winner, setWinner] = useState(null);

  const t = {
    en: {
      title: '🎲 Tic-Tac-Toe',
      desc: 'Challenge your strategic skills against AI.',
      winner: '🎉 Winner:',
      draw: '🤝 It\'s a Draw!',
      turn: 'Current Turn:',
      user: 'Your Turn (X)',
      ai: 'AI Turn (O)',
      reset: 'Reset Game',
      back: 'Back to Dashboard',
      walletAlert: 'Please connect your wallet first.'
    },
    fa: {
      title: '🎲 بازی دوز (Tic-Tac-Toe)',
      desc: 'مهارت‌های استراتژیک خود را در برابر هوش مصنوعی به چالش بکش.',
      winner: '🎉 برنده:',
      draw: '🤝 مساوی شدید!',
      turn: 'نوبت:',
      user: 'نوبت شما (X)',
      ai: 'نوبت هوش مصنوعی (O)',
      reset: 'شروع مجدد',
      back: 'بازگشت به داشبورد',
      walletAlert: 'لطفاً ابتدا کیف پول خود را متصل کنید.'
    },
    es: {
      title: '🎲 Tic-Tac-Toe (Gato)',
      desc: 'Desafía tus habilidades estratégicas contra la IA.',
      winner: '🎉 Ganador:',
      draw: '🤝 ¡Empate!',
      turn: 'Turno actual:',
      user: 'Tu turno (X)',
      ai: 'Turno de la IA (O)',
      reset: 'Reiniciar juego',
      back: 'Volver al Panel',
      walletAlert: 'Por favor, conecta tu billetera primero.'
    },
    fr: {
      title: '🎲 Morpion (Tic-Tac-Toe)',
      desc: 'Défiez vos compétences stratégiques contre l\'IA.',
      winner: '🎉 Gagnant:',
      draw: '🤝 Égalité !',
      turn: 'Tour actuel:',
      user: 'Votre tour (X)',
      ai: 'Tour de l\'IA (O)',
      reset: 'Réinitialiser',
      back: 'Retour au Tableau de Bord',
      walletAlert: 'Veuillez d\'abord connecter votre portefeuille.'
    }
  };

  const selectedLang = t[language] || t.en;

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // سطری
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // ستونی
      [0, 4, 8], [2, 4, 6]             // قطری
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((square) => square !== null)) return 'DRAW';
    return null;
  };

  const handleClick = (index) => {
    if (!isConnected) {
      alert(selectedLang.walletAlert);
      return;
    }
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = 'X'; // حرکت کاربر
    setBoard(newBoard);

    const gameStatus = checkWinner(newBoard);
    if (gameStatus) {
      setWinner(gameStatus);
      return;
    }

    setIsXNext(false);

    // حرکت هوش مصنوعی (O) بعد از نیم ثانیه تاخیر
    setTimeout(() => {
      const availableIndices = newBoard
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);

      if (availableIndices.length > 0) {
        const aiMove = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        newBoard[aiMove] = 'O';
        setBoard(newBoard);
        setWinner(checkWinner(newBoard));
        setIsXNext(true);
      }
    }, 500);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <div style={styles.gameContainer}>
      <h2>{selectedLang.title}</h2>
      <p>{selectedLang.desc}</p>

      <p style={styles.turnText}>
        {winner 
          ? '' 
          : `${selectedLang.turn} ${isXNext ? selectedLang.user : selectedLang.ai}`}
      </p>

      <div style={styles.board}>
        {board.map((cell, index) => (
          <button 
            key={index} 
            style={styles.cell} 
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <h3 style={styles.statusText}>
          {winner === 'DRAW' 
            ? selectedLang.draw 
            : `${selectedLang.winner} ${winner === 'X' ? 'X' : 'O'}`}
        </h3>
      )}

      <button style={styles.resetBtn} onClick={handleReset}>{selectedLang.reset}</button>
      <br />
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
  turnText: {
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: '15px'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    gridTemplateRows: 'repeat(3, 100px)',
    gap: '5px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cell: {
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    fontSize: '32px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  statusText: {
    fontSize: '20px',
    color: '#0f172a',
    margin: '15px 0'
  },
  resetBtn: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  backButton: {
    padding: '10px 15px',
    backgroundColor: '#64748b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  }
};

export default TicTacToe;
