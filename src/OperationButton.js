import { ACTIONS } from "./App"

export default function OperationButtun({ dispatch, operation}) {
    return (
        <button
        onClick={() => dispatch({ type: CHOOSE_OPERATION, payload: { operation } })} >
            { operation }
        </button>
    )
}