import { useCallback, useEffect, useRef, useState } from 'react'
import words from './words.json';
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';

type Word = {
  word: string;
  category: string;
  description: string;
}

function App() {

  const [word, setWord] = useState<Word>(() => {
    return words.words[Math.floor(Math.random() * words.words.length)];
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);


  const incorrectLetters: string[] = guessedLetters.filter(char => !word.word.includes(char));
  const isLoser: boolean = incorrectLetters.length >= 6;
  const isWinner: boolean = word.word.split("").every((char) => guessedLetters.includes(char));
  const gameOver: boolean = isLoser || isWinner;

  useEffect(() => {
    if (gameOver && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [gameOver]);

  const restartGame = () => {
    setGuessedLetters([]);
    setWord(words.words[Math.floor(Math.random() * words.words.length)]);
    dialogRef.current?.close();
  };

  const addGuessedLetter = useCallback(
    (char: string) => {
      const lowChar = char.toLowerCase();
      if (gameOver) return;
      setGuessedLetters(prev => {
        if (prev.includes(lowChar)) {
          return prev;
        }
        return [...prev, lowChar]
      });
    },
    [gameOver]
  );


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key: string = e.key;
      if (!key.match(/^[a-zA-Z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    }
    console.log('useEffect');

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    }
  }, []);


  return (
    <>
      <div style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '0 auto',
        alignItems: 'center',
      }}>
        <div style={{
          fontSize: '2rem',
          textAlign: 'center',
        }}>
        </div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
        }}>Category: {word.category}</h1>
        <HangmanDrawing numberOfguesses={incorrectLetters.length} />
        <HangmanWord guessedLetters={guessedLetters} word={word.word} gameOver={gameOver} />
        <Keyboard
          gameOver={gameOver}
          activeLetters={guessedLetters.filter(char => word.word.includes(char))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
        <dialog
          ref={dialogRef}
          style={{
            padding: '2rem',
            border: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            transition: 'transform 0.3s ease',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: isWinner ? '#2e7d32' : '#c62828' }}>
            {isWinner ? '🎉 You Win!' : '💀 You Lose!'}
          </h2>
          {isLoser && (
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              The word was: <strong style={{ color: '#37474f', fontWeight: 'bold', fontSize: '1.5rem' }}>{word.word}</strong>
            </p>
          )}
          <p>
            <strong style={{ color: '#37474f', fontWeight: 'bold', fontSize: '1.5rem' }}>{word.word}:</strong> {word.description}
          </p>
          <button
            onClick={restartGame}
            style={{
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.2rem',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Play Again
          </button>
        </dialog>
      </div>
    </>
  )
}

export default App
