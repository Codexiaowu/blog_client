import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            userData: {}
        }
    },
    mutations:{
        changeUserData(state,payload){
            state.userData = payload;
        },
        changeAvatar(state,payload){
            state.userData.avatarUrl = payload;
        },
        changeNickname(state,payload){
            state.userData.nickname = payload;
        },
    }
})

export default store;