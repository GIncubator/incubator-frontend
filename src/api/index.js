import axios from 'axios'
import Config from './../../config'

axios.defaults.baseURL = Config.apiGateway.URL

const getUser = (params = {}) => axios.get(`/user${params.filter || ''}`)
const createUser = params => axios.post('/user', params)
const updateUser = params => axios.put(`/user/${params.id}`, params)
const deleteUser = id => axios.delete(`/user/${id}`)

export {
  getUser,
  createUser,
  updateUser,
  deleteUser
}
