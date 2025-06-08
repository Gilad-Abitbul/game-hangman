
type HangmanWordProps = {
  guessedLetters: string[];
  word: string;
  gameOver: boolean;
}


export function HangmanWord({ guessedLetters, word, gameOver }: HangmanWordProps) {
  return <div style={{
    display: 'flex',
    gap: '0.25em',
    fontSize: '6rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  }}>
    {word.split("").map((char, index) => {
      const correct: boolean = guessedLetters.includes(char);
      return (
        <span key={index} style={{
          borderBottom: '0.1em solid black'
        }}>
          <span style={{
            visibility: (correct || gameOver) ? "visible" : "hidden",
            color: !correct ? 'red' : 'black',
          }}>
            {(correct || gameOver) ? char : '#'}
          </span>
        </span>
      )
    })}
  </div>
}