import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import {
    listReducer,
    mListReducer,
    randomListReducer,
    m99creator,
    modal99Reducer,
} from './ListStore'
import { createStore, combineReducers } from 'redux'

const reducer = combineReducers({
    listReducer,
    mListReducer,
    randomListReducer,
    m99creator,
    modal99Reducer,
})

export const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
