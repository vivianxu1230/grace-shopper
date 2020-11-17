import Axios from 'axios'

const GET_USERS = 'GET_USERS'
const GET_ONE_USER = 'GET_ONE_USER'

export const getUsers = users => ({
  type: GET_USERS,
  users
})

export const getUser = user => ({
  type: GET_ONE_USER,
  user
})

export const getUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/adminusers')
      dispatch(getUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchSingleUser = id => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/adminusers/${id}`)
      dispatch(getUser(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case GET_ONE_USER:
      return action.user
    default:
      return state
  }
}
