type GameOverModalProps = {
  isWinner: boolean;
  isLoser: boolean;
  word: string;
  onReset: () => void;
}

export function GameOverModal({ isWinner, isLoser, word, onReset }: GameOverModalProps) {
  {
    if (!isWinner && !isLoser) return null;

    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          textAlign: "center",
          maxWidth: "90%",
        }}>
          <h2>{isWinner ? "🎉 ניצחת!" : "😢 הפסדת!"}</h2>
          {isLoser && <p>המילה הייתה: <strong>{word}</strong></p>}
          <button onClick={onReset} style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            שחק שוב
          </button>
        </div>
      </div>
    );
  };

}