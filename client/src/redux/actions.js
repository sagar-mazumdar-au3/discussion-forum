const Axios = require('axios');
let axios = Axios.create({baseURL: 'http://localhost:8080/'});

export  function signup(user) {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/auth/register', user);
            return dispatch({type:'SUCCESS-SIGNUP',payload:{
                email:response.data.email
            }});
        } catch (error) {
            return dispatch({type:'ERROR',payload:{
                message:error.response.data.error
            }});
        }

    }
}

export  function login(user) {
    return async (dispatch) => {
        try {

            const response = await axios.post('/api/auth/login', user);

            localStorage.setItem('jwtToken',response.data.token);
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('email',response.data.email);

            return dispatch({type:'SUCCESS-SIGNIN',payload:{
                name:response.data.name,
                email:response.data.email,
                token:response.data.token
            }});

        } catch (error) {
            return dispatch({type:'ERROR',payload:{
                message:error.response.data.error
            }});
        }

    }
}

export  function createTopic(topic) {
    return async (dispatch) => {
        try {
            await axios.post('/api/topics', topic , {
                headers: {
                    'Authorization': `jwt-token ${localStorage.getItem('jwtToken')}`,
                }
            });
            const response = await axios.get('/api/topics');
            return dispatch({type:'TOPICS', payload:{
                topics:response.data
            }});
        } catch (error) {
            return dispatch({type:'ERROR'});
        }

    }
}

export  function getAlltopics() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/topics');
            return dispatch({type:'TOPICS', payload:{
                topics:response.data
            }});
        } catch (error) {
            return dispatch({type:'ERROR'});
        }

    }
}

export function getUserFromlocalStorage(){
    return async (dispatch) => {
        try {
             const token = localStorage.getItem('jwtToken');
             const name = localStorage.getItem('name');
             const email = localStorage.getItem('email');

             if(!name || !email || !token) throw new Error("User Not Found");
             
             return dispatch({type:'SUCCESS-SIGNIN',payload:{
                name,
                email,
                token
             }});
        } catch (error) {
             return dispatch({type:'ERROR'});
        }
    }
}

export function setTopicDocIndex(index){
    return {type:'TOPIC-DOC-INDEX', payload: {index}}
}

export  function getTopicComments(topicID) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/comments/${topicID}`);

            return dispatch({type:'COMMENTS', payload:{
                comments:response.data
            }});
        } catch (error) {
            
            return dispatch({type:'ERROR'});
        }

    }
}

export  function createComment(comment) {
    return async (dispatch) => {
        try {
            await axios.post('/api/comments', comment , {
                headers: {
                    'Authorization': `jwt-token ${localStorage.getItem('jwtToken')}`,
                }
            });
            const response = await axios.get(`/api/comments/${comment.topicID}`);
            return dispatch({type:'COMMENTS', payload:{
                comments:response.data
            }});
        } catch (error) {
            return dispatch({type:'ERROR'});
        }

    }
}

export function logOut(){
    return {type:'LOGOUT'}
}