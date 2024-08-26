import React from 'react';
import Cell from './Cell';

function Board({ board, isMyBoard, onAttack }) {
    return (
        <div className="d-grid grid-template-columns-auto gap-2">
            {board.map((row, rowIndex) => (
            <div key={rowIndex} className="d-flex">
                {row.map((cell, colIndex) => (
                <Cell
                    key={colIndex}
                    value={cell}
                    isMyBoard={isMyBoard}
                    onClick={() => !isMyBoard && onAttack(rowIndex, colIndex)}
                />
                ))}
            </div>
            ))}
        </div>
    );
}

export default Board;
