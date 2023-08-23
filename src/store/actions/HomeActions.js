import axios from "axios"
export const CHANGE_VIEW = 'CHANGE_VIEW'
export const SET_USER_GROUPS = 'SET_USER_GROUPS'
export const SET_USER = 'SET_USER'
export const SET_CONFIG = 'SET_CONFIG'
export const SET_PG_GLOBAL_GROUPS = 'SET_PG_GLOBAL_GROUPS'

export const getConfig = () => {
    return dispatch => {
        return axios.get(`${process.env.PUBLIC_URL}/config.json`)
            .then(res => {
                dispatch(setConfig(res.data));
            }).catch(err => {
                //console.log(err);
            })
    }
}

export const setConfig = (data) => {
    return {
        type: SET_CONFIG,
        data
    }
}

export const changeView = (view) => {
    return {
        type: CHANGE_VIEW,
        view
    }
}

export const setUserGroups = (UserGroups) => {
    return {
        type: SET_USER_GROUPS,
        UserGroups
    }
}

export const setPGGlobalGroups = (globalGroup) => {
    return {
        type: SET_PG_GLOBAL_GROUPS,
        globalGroup
    }
}

export const setUser = ({ user, userName }) => {
    return {
        type: SET_USER,
        user,
        userName
    }
}