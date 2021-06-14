import { api } from '@/common/api.service'
import ApiService from "@/common/api.service";
import { setToken } from '@/utils/auth'
import getError from '@/utils/error'
import Message from '@/utils/messages'

export async function login(params) {
  let condidate = {
    "identifier": params.username,
    "password": params.password
  }
  try {
    const { data } = await api.post('/auth/local', condidate)
    ApiService.setHeader()
    setToken(data.jwt)
    return data.user
  } catch(error) {
    getError(error.response, Message.invalidPassword)
    return error
  }
}

export async function register(params) {
  let condidate = {
    "username": params.username,
    "email": params.email,
    "password": params.password,
  }
  try {
    const { data } = await api.post('/auth/local/register', condidate)
    return data
  } catch(error) {
    getError(error.response, Message.invalidRegister)
  }
}
