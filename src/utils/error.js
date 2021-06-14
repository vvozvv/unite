import Message from '@/utils/messages'
// import store from '@/store'
export default function getError(response, from = '') {
  if (response.status === 400) {
    // return Message.invalidPassword
    return from == 'register' ? Message.invalidRegister : Message.invalidPassword
  } else if (response.status === 429) {
    return Message.tooManyRequests
  } else if (response.status === 500) {
    return Message.invalidServer
  } else {
    return Message.requestErrror
  }
}
