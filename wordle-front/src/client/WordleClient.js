import createHTTPClient from './helpers/createHTTPClient';
import {
  CreateUserRequest,
  CreateUserResponse,
  FailedCreateUserResponse,
  GetUserRequest,
  GetUserResponse,
  FailedGetUserResponse,
  LoginUserResponse,
  FailedLoginUserResponse,
} from './helpers/user/schemas';
import {
  TakeAGuessRequest,
  TakeAGuessResponse,
  CreateGameResponse,
  FailedCreateGameResponse,
  OngoingGameResponse,
  FailedOngoingGameResponse,
} from './helpers/game/schemas';

class WordleClient {
  constructor() {
    this.client = createHTTPClient();
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

  async getUser() {
    try {
      const rawResponse = await this.client.get("/account/me");
      return new GetUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedGetUserResponse(error.response.data);
    }
  }

  async getAnyUser(username) {
    const request = new GetUserRequest(username);
    try {
      const rawResponse = await this.client.get(`/account/${username}`, request);
      return new GetUserResponse(rawResponse.data)
    } catch (error) {
      return new FailedGetUserResponse(error.response.data);
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
      return new FailedLoginUserResponse(error.response.data)
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

  async createGame() {
    try {
      const rawResponse = await this.client.post("/game/create")
      return new CreateGameResponse(rawResponse.data)
    } catch (error) {
      return new FailedCreateGameResponse(error.response.data)
    }
  }

  async getOngoingGameStatus() {
    try {
      const rawResponse = await this.client.get("/game/ongoing_game")
      return new OngoingGameResponse(rawResponse.data)
    } catch (error) {
      return new FailedOngoingGameResponse(error.response.data)
    }
  }

  async getGameStatus(userId, gameId) {
    // try {
    //   const rawResponse = await this.client.get(`/status/${gameId}`)
    // }
  }

  async getUserId(username) {

  }

}

export default WordleClient