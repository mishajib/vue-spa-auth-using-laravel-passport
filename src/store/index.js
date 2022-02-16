import {createStore} from 'vuex'
import axios from 'axios';

export default createStore({
    state: {
        user: null,
    },
    mutations: {
        SET_USER_DATA(state, userData) {
            state.user = userData;
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        },
        CLEAR_USER_DATA(state) {
            state.user = null;
            localStorage.removeItem('user');
            axios.defaults.headers.common['Authorization'] = null;
        }
    },
    actions: {
        register({commit}, data) {
            return axios.post('http://lr-passport.test/api/register', data)
                .then(({data}) => {
                    commit('SET_USER_DATA', data);
                });
        },
        login({commit}, data) {
            return axios.post('http://lr-passport.test/api/login', data)
                .then(({data}) => {
                    commit('SET_USER_DATA', data);
                });
        },
        logout({commit}) {
            return axios.post('http://lr-passport.test/api/logout')
                .then(({data}) => {
                    commit('CLEAR_USER_DATA');
                });
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        }
    },
    modules: {}
})
