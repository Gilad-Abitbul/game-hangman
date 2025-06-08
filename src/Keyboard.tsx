import styles from './Keyboard.module.css';

type KeyboardProps = {
  activeLetters: string[],
  inactiveLetters: string[],
  addGuessedLetter: (key: string) => void;
  gameOver: boolean;
}

const KEYS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z'
];

export function Keyboard({ activeLetters, inactiveLetters, addGuessedLetter, gameOver }: KeyboardProps) {
  return <div style={{
    alignSelf: 'stretch',
  }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
      gap: '0.5rem'
    }}>
      {KEYS.map((char) => {
        const isActive: boolean = activeLetters.includes(char);
        const isInactive: boolean = inactiveLetters.includes(char);
        return (
          <button
            key={char}
            onClick={() => addGuessedLetter(char)}
            className={`
            ${styles.btn} 
            ${isActive && styles.active}
            ${isInactive && styles.inactive}
            ${gameOver && styles.gameOver}
            `}
            disabled={isActive || isInactive || gameOver}>
            {char}
          </button>
        )
      })}
    </div>
  </div>
}