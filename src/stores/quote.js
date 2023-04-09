import {
    GetQuotes,
} from '../api'


const SET_QUOTE_AUTHOR = 'SET_QUOTE';

const initialState = {
    quote: 'Genius is one percent inspiration and ninety-nine percent perspiration.',
    author: 'Thomas Edison'
}

export const getQuotes = () => {
    return async dispatch => {
        const res = await GetQuotes();
        dispatch({
            type: SET_QUOTE_AUTHOR,
            payload: {
                quote: res.data.content,
                author: res.data.author
            }
        })
    }
}

const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUOTE_AUTHOR: {
            return {
                ...state, ...action.payload
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default quoteReducer;