import { combineReducers } from 'redux'

const appScreen = (state = {appScreen: {name: "Pregame"}}, action) => {
  switch (action.type) {
    case 'CONFIRM_USER':
      return {
            name: "Pregame",
            error: ""
          }
    case 'START_GAME':
    case 'TIME_UP':
      return {
            name: "Wait",
            isCorrect: false
          }
    case 'CORRECT_ANSWER':
      return {
            name: "Wait",
            isCorrect: true
          }
    case 'NEW_SONG':
        return {
              name: "Guess",
              content: action.content
          }
    case 'GAME_OVER':
      return {
            name: "Start"
          }
    default:
      return state
  }
}

const username = (state = {}, action) => {
  switch (action.type) {
    case 'CONFIRM_USER':
      return action.sender
    case 'GAME_OVER':
      return undefined
    default:
      return state
  }
}

const game = (state = {}, action) => {
  switch (action.type) {
    case 'CONFIRM_USER':
      return action.game
    case 'GAME_OVER':
      return undefined 
    default:
      return state
  }
}

const reducer = combineReducers({
  appScreen,
  username,
  game
})

export default reducer
