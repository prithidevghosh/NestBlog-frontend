import {
    Login,
    SignUp,
    CreateBlog,
    UpdateBlog,
    GetBlogs,
    DeleteBlog
} from '../api'


//ACTIONS
const CREATE_BLOG = 'CREATE_BLOG';
const GET_BLOGS = 'GET_BLOGS';
const DELETE_BLOG = 'DELETE_BLOG';
const UPDATE_BLOG = 'UPDATE_BLOG';
const LOGIN_BLOG = 'LOGIN_BLOG';
const SIGNUP_BLOG = 'SIGNUP_BLOG';
const SET_BLOG = 'SET_BLOG';
const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

const initialState = {
    blogs: [],
    loading: false,
    errorMessage: '',
    currentPage: 1,
    totalPages: 0,
    loginStatus: false,
}

export const setLoginStatus = (status) => dispatch => {
    dispatch({ type: SET_LOGIN_STATUS, payload: status })
}

const setLoading = loading => dispatch => {
    dispatch({ type: SET_LOADING, payload: loading });
};

export const setCurrentPage = (currentPage) => {
    return (dispatch) => dispatch({ type: SET_CURRENT_PAGE, payload: currentPage })
}


export function setError(errorMessage) {
    return {
        type: SET_ERROR,
        payload: errorMessage,
    };
}

export const setBlog = (blog) => {
    return (dispatch) => {
        dispatch({ type: SET_BLOG, payload: blog });
    }
}

export const login = (newUserDetail) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const res = await Login(newUserDetail)
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("userEmail", res.data.user.email);
            dispatch({ type: LOGIN_BLOG, payload: { loginStatus: true } });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: `ERROR: ${error}` })
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const signUp = (userDetail) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await SignUp(userDetail);
            dispatch({ type: SIGNUP_BLOG });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: `ERROR: ${error}` })
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await CreateBlog(blog)
            dispatch({ type: CREATE_BLOG });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: `ERROR: ${error}` })
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const updateBlog = ({newBlog , ...blogs}) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await UpdateBlog(blogs)
            dispatch({ type: UPDATE_BLOG, payload: newBlog });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: `ERROR: ${error}` })
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const getBlogs = (currentPage) => {

    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const res = await GetBlogs(currentPage);
            dispatch({ type: GET_BLOGS, payload: { blogs: res.data.items, currentPage: res.data.meta.currentPage, totalPages: res.data.meta.totalPages } });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: `ERROR: ${error}` });
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const deleteBlog = (blogId, currentPage, newBlogs) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await DeleteBlog(blogId)
            dispatch(getBlogs())
            dispatch({ type: DELETE_BLOG , payload: newBlogs});
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: `delete ERROR: ${error}` })
        } finally {
            dispatch(setLoading(false));
        }
    }
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BLOG:
            return {
                ...state,
            }
        case GET_BLOGS:
            return {
                ...state, ...action.payload
            }
        case DELETE_BLOG:
            return {
                ...state,blogs: action.payload
            }
        case UPDATE_BLOG:
            return {
                ...state, blogs: action.payload
            }
        case LOGIN_BLOG:
            return {
                ...state, ...action.payload
            }
        case SIGNUP_BLOG:
            return {
                ...state,
            }
        case SET_BLOG:
            return {
                ...state, blog: action.payload
            }
        case SET_ERROR:
            return {
                ...state, errorMessage: action.payload
            }
        case SET_LOADING:
            return {
                ...state, loading: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.payload
            }
        case SET_LOGIN_STATUS:
            return {
                ...state, loginStatus: action.payload
            }
        default:
            return state;
    }
}

export default blogReducer;