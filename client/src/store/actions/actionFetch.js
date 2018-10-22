import * as actionType from './actionType'
import axios from 'axios';

export const fetchStart = () => {
    return {
        type: actionType.fetchStart
    }
}

export const fetchSuccess = (resData) => {
    return {
        type: actionType.fetchSuccess,
        resData: resData
    }
}

export const fetchFailure = (error) => {
    return {
        type: actionType.fetchFailure,
        error: error
    }
}

export const fetch = (keyword) => {
    return dispatch => {
        dispatch(fetchStart());
        const value = {
            keyword: keyword
        }
        axios.post('/api/finditem', value)
        .then(response => {
            dispatch(fetchSuccess(response.data))
        }).catch(error => {
            dispatch(fetchFailure(error));
        })
    }
}
