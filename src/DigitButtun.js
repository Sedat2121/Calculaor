import { ACTIONS } from "./App"

export default function DigitButtun({ dispatch, digit}) {
    return (
        <button
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })} >
            { digit }
        </button>
    )
}

