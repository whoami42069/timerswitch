import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Player, TicTacToeState } from '../types';

const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<TicTacToeState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  });

  const checkWinner = (board: Player[]): Player | 'draw' | null => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    
    const winner = checkWinner(newBoard);
    
    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
    });
  };

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 rounded-xl"
      style={{
        background: 'rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(2px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)',
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-cyber-purple cyber-glow">
        Tic Tac Toe
      </h2>

      <div className="grid grid-cols-3 gap-2 mb-4 max-w-[300px] mx-auto">
        {gameState.board.map((cell, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCellClick(index)}
            className="w-20 h-20 glass-morphism border-2 border-cyber-cyan rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            disabled={!!gameState.winner || !!cell}
          >
            {cell && (
              <motion.img
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={`/images/${cell === 'X' ? '3' : '9'}.png`}
                alt={cell}
                className="w-12 h-12 object-contain"
              />
            )}
          </motion.button>
        ))}
      </div>

      <div className="text-center">
        {gameState.winner === 'draw' ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-yellow-400 mb-4 cyber-glow"
          >
            It's a draw!
          </motion.p>
        ) : gameState.winner ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4"
          >
            <p className="text-xl text-cyber-pink cyber-glow">
              Winner: {gameState.winner}
            </p>
            <img
              src={`/images/${gameState.winner === 'X' ? '3' : '9'}.png`}
              alt={gameState.winner}
              className="w-16 h-16 mx-auto mt-2"
            />
          </motion.div>
        ) : (
          <p className="text-lg text-cyber-cyan mb-4">
            Current Player: {gameState.currentPlayer}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="px-6 py-2 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg text-white font-bold hover:from-cyber-pink hover:to-cyber-purple transition-all duration-300"
        >
          New Game
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TicTacToe;