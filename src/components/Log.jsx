export default function Log({turns}) {

    return <ol id="log">
        {
            turns.map((turn) => {
                const {square, player} = turn;
                const {row, cell} = square;
                return <li key={`${row}:${cell}`}>Player {player} played on row {row} column {cell}</li>
            })
        }

    </ol>
}