import { useReducer } from "react";
import DigitButtun from "./DigitButtun";
import OperationButtun from "./OperationButtun";
import "./style.css"

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload}){
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperend: payload.digit,
          overwrite: false,
        }
      }
      if (payload === "0" && state.currentOperend === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperend.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperend: `${currentOperend || ""}${payload.digit}`, 
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperend == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperend == null) {
        return {
          ...state, 
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperend,
          currentOperend: null,
        }
      }

      return {
        ...state, 
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperend: null
      }

    case ACTION.CLEAR:
      return {}  
    
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperend: null
        }
      }
    
    case ACTIONS.EVALUATE:
      if ( 
        state.operation == null || 
        state.currentOperend == null || 
        state.previousOperand == null
      ) {
        return state 
      }  

      if (state.currentOperend == null) return state
      if (state.currentOperend.length === 1) {
        return { ...state, currentOperend == null}
      } 
      
      return {
        ...state,
        currentOperend: state.currentOperend.slice(0, -1)
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperend: evaluate(state),
      }
  }
}

function evaluate({currentOperend, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperend)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break    
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperend, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1}})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand"> {formatOperand(previousOperand)} {operation} </div>
        <div className="current-operand"> {formatOperand(currentOperend)} </div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTION.CLEAR})}>AC</button>
      <button onClick={() => dispatch({ type: ACTION.DELETE.DIGIT})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTION.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
