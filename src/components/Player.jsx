import {useState} from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleInputChange(event) {
        setPlayerName(event.target.value);
    }
    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    let editableName =  (isEditing ? <input type="text" value={playerName} onChange={handleInputChange} required/> : <span className='player-name'>{playerName}</span>);

    return (
        <li className={isActive ? 'active' : undefined}>
                      <span className='player'>
                        {editableName}
                        <span className='player-symbol'>{symbol}</span>
                        </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}