import createHTTPClient from './helpers/createHTTPClient';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserRequest,
  GetUserResponse,
  LoginUserResponse,
} from './helpers/user/schemas';
import {
  TakeAGuessRequest,
  TakeAGuessResponse,
  CreateGameResponse,
  GameStatusResponse,
} from './helpers/game/schemas';
import { FailedResponse } from './helpers/shared/schemas';

class WordleClient {
  constructor() {
    this.client = createHTTPClient();
  }

  // USER ENDPOINTS

  async getUser() {
    try {
      const rawResponse = await this.client.get("/account/me");
      return new GetUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedResponse(error.response.data);
    }
  }

  async getAnyUser(username) {
    const request = new GetUserRequest(username);
    try {
      const rawResponse = await this.client.get(`/account/${username}`, request);
      return new GetUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedResponse(error.response.data);
    }
  }

  async createUser(username, email, password) {
    const request = new CreateUserRequest(username, email, password);
    try {
      const rawResponse = await this.client.post("/account/create", request);
      return new CreateUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedResponse(error.response.data);
    }
  }

  async loginUser(username, password) {
    const request = new FormData();
    request.append("username", username)
    request.append("password", password)
    const headers = { "Content-Type": "multipart/form-data" }
    try {
      const rawResponse = await this.client.post("/account/login", request, headers)
      const loginUserResponse = new LoginUserResponse(rawResponse.data)
      localStorage.setItem("accessToken", loginUserResponse.accessToken)
      this.client = createHTTPClient()
      return loginUserResponse
    } catch (error) {
      return new FailedResponse(error.response.data)
    }
  }

  // GAME ENDPOINTS

  async createGame() {
    try {
      const rawResponse = await this.client.post("/game/create")
      return new CreateGameResponse(rawResponse.data)
    } catch (error) {
      return new FailedResponse(error.response.data)
    }
  }

  async getGameStatus(gameId) {
    try {
      const rawResponse = await this.client.get(`/game/status/${gameId}`)
      return new GameStatusResponse(rawResponse.data)
    } catch (error) {
      return new FailedResponse(error.response.data)
    }
  }

  async getLastGameStatus() {
    try {
      const rawResponse = await this.client.get("/game/status/last_game")
      return new GameStatusResponse(rawResponse.data)
    } catch (error) {
      return new FailedResponse(error.response.data)
    }
  }

  async takeAGuess(guess, gameId) {
    const request = new TakeAGuessRequest(guess)
    try {
      const rawResponse = await this.client.post(`/game/guess/${gameId}`, request)
      return new TakeAGuessResponse(rawResponse.data)
    } catch (error) {
      const message = error.response.data.detail
      return new TakeAGuessResponse({ status: "ERROR", message: message })
    }
  }


}

export default WordleClient