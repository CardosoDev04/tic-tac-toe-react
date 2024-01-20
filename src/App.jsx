import Player from "./components/Player.jsx";
import Board from "./components/Board.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

const players = {'X': 'Player 1', 'O': 'Player 2'}

function getActivePlayer(turns){
    let player = 'X';
    if(turns.length === 0){
        return 'X';
    }
    if(turns[0].player === 'X'){
        return 'O';
    }
    return player;
}

function determineWinner(board,currentNames){
    let winner = null;
    for(const combination of WINNING_COMBINATIONS){
        const firstSquare = board[combination[0].row][combination[0].column];
        const secondSquare = board[combination[1].row][combination[1].column];
        const thirdSquare = board[combination[2].row][combination[2].column];
        if(firstSquare === secondSquare && secondSquare === thirdSquare && firstSquare){
            winner = currentNames[firstSquare];
        }
    }
    return winner;
}

function determineDraw(gameTurns,winner){
    let isDraw = false;

    if(gameTurns.length === 9 && !winner){
        isDraw = true;
    }
    return isDraw;
}
function determineBoard(gameTurns){
    let board = [...initialBoard.map((row) => [...row])];

    for(const turn of gameTurns){
        const {square, player} = turn;
        const {row, cell} = square;
        board[row][cell] = player;

    }
    return board;
}
function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [currentNames, setCurrentNames] = useState(players);


    let board = determineBoard(gameTurns);
    let winner = determineWinner(board,currentNames);
    let isDraw = determineDraw(gameTurns,winner);
    function handleNameChange(player, newName){
        setCurrentNames((prevNames) => {
            return {...prevNames, [player]: newName};
        });
    }
    function handleSelectSquare(rowIndex, cellIndex){
        setGameTurns((prevTurns) => {
            let active = getActivePlayer(prevTurns);
            return [{square: {row: rowIndex, cell: cellIndex}, player: active}, ...prevTurns];
        });
    }

    function handleRematch(){
        setGameTurns([]);
    }


    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                  <Player initialName={players.X} symbol="X" isActive={getActivePlayer(gameTurns) === 'X'} onChangeName={handleNameChange}/>
                  <Player initialName={players.O} symbol="O" isActive={getActivePlayer(gameTurns) === 'O'} onChangeName={handleNameChange}/>
                </ol>
                {(winner || isDraw) &&
                <GameOver winner={winner} isDraw = {isDraw} onRematch = {handleRematch}/>
                }
                <Board onSelectSquare={handleSelectSquare} board = {board}/>
            </div>
            <Log turns = {gameTurns}/>
        </main>
    );
}

export default App
