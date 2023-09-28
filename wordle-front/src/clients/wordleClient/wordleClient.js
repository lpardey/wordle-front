import axios from 'axios'
import {
  CreateUserRequest,
  CreateUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  TakeAGuessRequest,
  TakeAGuessResponse
} from './schemas'

class WordleClient {
  constructor() {
    this.client = axios.create({ baseURL: 'http://localhost:8000', withCredentials: false })
  }

  async createUser(username, email, password) {
    const request = new CreateUserRequest(username, email, password);
    try {
      await this.client.post("/account/create", request);
    } catch (error) {
      const parsed_response = new CreateUserResponse(error.response.data);
      return parsed_response;
    }
  }

  async loginUser(username, password) {
    const request = new LoginUserRequest(username, password);
    try {
      await this.client.post("/account/login", request)
    } catch (error) {
      const parsed_response = new LoginUserResponse(error.response.data)
      return parsed_response
    }
  }

  async takeAGuess(guess, playerId, gameId) {
    const request = new TakeAGuessRequest(guess)
    try {
      const raw_response = await this.client.post(`/game/${playerId}/${gameId}/guess`, request)
      return new TakeAGuessResponse(raw_response.data)
    } catch (error) {
      const message = error.response.data.detail
      const parsed_response = new TakeAGuessResponse({ status: "ERROR", message: message })
      return parsed_response
    }
  }
}


export default WordleClient