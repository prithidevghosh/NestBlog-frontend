import axios from 'axios'

const url = process.env.REACT_APP_URL

const getToken = () => {
    return `Bearer ${localStorage.getItem("token")}`;
}

export const Login = async (newUserDetail) => {
    const res = await axios.post(`${url}/users/login`, { ...newUserDetail });
    return res;
}

export const SignUp = async (userDetail) => {
    const res = await axios.post(`${url}/users`, {
        ...userDetail
    });
    return res;
}

export const CreateBlog = async (blog) => {
    const token = getToken();
    console.log(blog)
    const res = await axios.post(`${url}/blog-entries`, {
        ...blog,
    }, {
        headers: {
            Authorization: token,
        },
    });
    console.log(res.status)
    return res;
}

export const UpdateBlog = async ({ blogId, ...blog }) => {
    const token = getToken();
    const res = await axios.put(`${url}/blog-entries/${blogId}`,
        {
            ...blog
        }
        , {
            headers: {
                Authorization: token,
            },
        })
    return res;
}

export const GetBlogs = async (currentPage) => {
    const res = await axios.get(`${url}/blog-entries?page=${currentPage}&limit=5`)
    return res;
}

export const DeleteBlog = async (blogId) => {
    const token = getToken();
    const res = await axios.delete(`${url}/blog-entries/${blogId}`, {
        headers: { Authorization: token }
    },
    )
    return res;
}

export const GetQuotes = async () => {
    const res = await axios.get(process.env.REACT_APP_QUOTE)
    return res;
}