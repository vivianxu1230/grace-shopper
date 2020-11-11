import Axios from 'axios'

const GET_USERS = 'GET_USERS'

export const getUsers = users => ({
  type: GET_USERS,
  users
})

export const getUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/users')
      dispatch(getUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
