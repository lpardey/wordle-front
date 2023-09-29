import axios from 'axios'
import {
  CreateGameRequest,
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  TakeAGuessRequest,
  TakeAGuessResponse,
  CreateGameResponse,
  GetUserRequest,
  GetUserResponse,
  FailedCreateUserResponse,
  FailedLoginUserResponse,
  FailedGetUserResponse
} from './schemas'

class WordleClient {
  constructor() {
    this.client = axios.create({ baseURL: 'http://localhost:8000', withCredentials: false })
  }

  async createUser(username, email, password) {
    const request = new CreateUserRequest(username, email, password);
    try {
      const rawResponse = await this.client.post("/account/create", request);
      return new CreateUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedCreateUserResponse(error.response.data);
    }
  }

  async getUser(username) {
    const request = new GetUserRequest(username);
    try {
      const rawResponse = await this.client.get("/account/get", request);
      return new GetUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedGetUserResponse(error.response.data);
    }
  }

  async loginUser(username, password) {
    const request = new LoginUserRequest(username, password);
    try {
      const rawResponse = await this.client.post("/account/login", request)
      return new LoginUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedLoginUserResponse(error.response.data)
    }
  }

  async takeAGuess(guess, playerId, gameId) {
    const request = new TakeAGuessRequest(guess)
    try {
      const rawResponse = await this.client.post(`/game/${playerId}/${gameId}/guess`, request)
      return new TakeAGuessResponse(rawResponse.data)
    } catch (error) {
      const message = error.response.data.detail
      return new TakeAGuessResponse({ status: "ERROR", message: message })
    }
  }

  async createGame(playerId) {
    const request = new CreateGameRequest(playerId)
    const rawResponse = await this.client.post(`/game/${playerId}`, request)
    return new CreateGameResponse(rawResponse.data)
  }

  async getGameStatus(playerId, gameId) {

  }

  async getPlayerId(username) {

  }
}


export default WordleClient