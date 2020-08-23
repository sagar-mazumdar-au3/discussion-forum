import {
    createStore
} from 'redux';
import {
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    // Auth
    isLoggedIn: false,
    token:"",
    // User
    name: "",
    email: "",
    // App
    topics:[],
    topic:{},
    comments:[]
}

const reducer = (state = initialState, action) => {
    let copyOfState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "SUCCESS-SIGNUP": {
            copyOfState.email = action.payload.email;
            return copyOfState;
        }
        case 'SUCCESS-SIGNIN': {
            copyOfState.isLoggedIn = true;
            copyOfState.name = action.payload.name;
            copyOfState.email = action.payload.email;
            copyOfState.token = action.payload.token;
            return copyOfState;
        }
        case 'TOPICS': {
            copyOfState.topics = action.payload.topics;
            return copyOfState;
        }
        case 'LOGOUT': {
            copyOfState.isLoggedIn = false;
            copyOfState.token = "";      
            // User
            copyOfState.name =  "";
            copyOfState.email = "";
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            return copyOfState;
        }
        case 'TOPIC-DOC-INDEX': {
            copyOfState.topic = copyOfState.topics[action.payload.index];
            return copyOfState;
        }
        case 'COMMENTS': {
            copyOfState.comments = action.payload.comments;
            return copyOfState;
        }
        default:
            return state;
    }

}

const store = createStore(reducer, applyMiddleware(thunk));
export default store;