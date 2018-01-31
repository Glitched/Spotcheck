import { combineReducers } from 'redux'

const appScreen = (state = {appScreen: {name: "Pregame"}}, action) => {
  switch (action.type) {
    case 'CONFIRM_USER':
      return [
        ...state,
        { appScreen: {
            name: "Pregame",
            error: ""
          }
        }
      ]
    case 'START_GAME':
    case 'TIME_UP':
      return [
        ...state,
        { appScreen: {
            name: "Wait",
            isCorrect: false
          }
        }
      ]
    case 'CORRECT_ANSWER':
      return [
        ...state,
        { appScreen: {
            name: "Wait",
            isCorrect: true
          }
        }
      ]
    case 'NEW_SONG':
        return [
          ...state,
          { appScreen: {
              name: "Guess",
              content: action.content
            }
          }
        ]
    case 'GAME_OVER':
      return [
        ...state,
        { appScreen: {
            name: "Start"
          }
        }
      ]
    default:
      return state
  }
}

const reducer = combineReducers({
  appScreen
})

export default reducer
