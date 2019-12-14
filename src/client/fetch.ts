import axios from 'axios';
type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

export default class Fetch {
  get token() {
    //@ts-ignore
    return sessionStorage.getItem('auth') ? JSON.parse(sessionStorage.getItem('auth')).token : '';
  }
  get identity() {
    //@ts-ignore
    return sessionStorage.getItem('auth') ? JSON.parse(sessionStorage.getItem('auth')).role.identity : ''
  }
  private baseUrl: string = '';
  fetch(type: Method, url: string, data?: any) {
    this.baseUrl = process.env.NODE_ENV === 'development' ? 'https://sibyl.bahamute.tech' : 'https://sibyl.bahamute.tech';
    return axios({
      method: type,
      url: this.baseUrl + url,
      data: data,
      headers: { "Content-Type": "application/json;charset=utf-8" }
    })
  }
}