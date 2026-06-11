import React, { useState } from 'react';
import { useAccount } from 'wagmi';

function PaymentGateway({ onBack, language, onPaymentSuccess }) {
  const { isConnected } = useAccount();
  const [status, setStatus] = useState('');

  const t = {
    en: {
      title: '💳 Crypto Payment Gateway',
      desc: 'Pay a small fee in Test SepoliaETH to unlock the game.',
      payBtn: 'Pay & Start Game',
      back: 'Back to Dashboard',
      processing: 'Processing transaction on Sepolia...',
      success: '🎉 Payment successful! Redirecting to game...',
      walletAlert: 'Please connect your wallet first.'
    },
    fa: {
      title: '💳 درگاه پرداخت کریپتو',
      desc: 'مبلغ کمی توکن تستی SepoliaETH برای باز شدن بازی پرداخت کنید.',
      payBtn: 'پرداخت و شروع بازی',
      back: 'بازگشت به داشبورد',
      processing: 'در حال پردازش تراکنش روی شبکه Sepolia...',
      success: '🎉 پرداخت موفقیت‌آمیز! در حال انتقال به بازی...',
      walletAlert: 'لطفاً ابتدا کیف پول خود را متصل کنید.'
    },
    es: {
      title: '💳 Pasarela de Pagos Cripto',
      desc: 'Paga una pequeña tarifa en Test SepoliaETH para desbloquear el juego.',
      payBtn: 'Pagar e Iniciar Juego',
      back: 'Volver al Panel',
      processing: 'Procesando transacción en Sepolia...',
      success: '🎉 ¡Pago exitoso! Redirigiendo al juego...',
      walletAlert: 'Por favor, conecta tu billetera primero.'
    },
    fr: {
      title: '💳 Passerelle de Paiement Crypto',
      desc: 'Payez de légers frais en Test SepoliaETH pour débloquer le jeu.',
      payBtn: 'Payer et Lancer le Jeu',
      back: 'Retour au Tableau de Bord',
      processing: 'Traitement de la transaction sur Sepolia...',
      success: '🎉 Paiement réussi ! Redirection vers le jeu...',
      walletAlert: 'Veuillez d\'abord connecter votre portefeuille.'
    }
  };

  const selectedLang = t[language] || t.en;

  const handlePayment = () => {
    if (!isConnected) {
      alert(selectedLang.walletAlert);
      return;
    }

    setStatus(selectedLang.processing);

    // شبیه‌سازی تراکنش وب۳ (یک تاخیر ۲ ثانیه‌ای)
    setTimeout(() => {
      setStatus(selectedLang.success);
      // انتقال به صفحه بازی پس از تایید تراکنش
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h2>{selectedLang.title}</h2>
      <p>{selectedLang.desc}</p>

      <div style={styles.box}>
        <p>💵 Fee: <strong>0.001 test SepoliaETH</strong></p>
        <button style={styles.payButton} onClick={handlePayment}>
          {selectedLang.payBtn}
        </button>
        {status && <p style={styles.statusText}>{status}</p>}
      </div>

      <button style={styles.backButton} onClick={onBack}>{selectedLang.back}</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center',
    fontFamily: 'Tahoma, Arial, sans-serif',
  },
  box: {
    margin: '30px 0',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  payButton: {
    padding: '15px 25px',
    backgroundColor: '#8b5cf6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '15px',
  },
  statusText: {
    marginTop: '15px',
    color: '#0284c7',
    fontWeight: 'bold',
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

export default PaymentGateway;
