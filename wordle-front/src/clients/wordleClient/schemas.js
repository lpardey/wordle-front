class CreateUserRequest {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class CreateUserResponse {
    constructor({ player_id }) {
        this.playerId = player_id;
    }
}

class FailedCreateUserResponse {
    constructor({ detail }) {
        this.error = detail
    }
}

class GetUserRequest {
    constructor(username) {
        this.username = username;
    }
}

class GetUserResponse {
    constructor({ id, username }) {
        this.gameId = id;
        this.username = username;
    }
}

class FailedGetUserResponse {
    constructor({ detail }) {
        this.error = detail
    }
}

class LoginUserRequest {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class LoginUserResponse {
    constructor({ access_token, token_type }) {
        this.accessToken = access_token;
        this.tokenType = token_type;
    }
}

class FailedLoginUserResponse {
    constructor({ detail }) {
        this.error = detail;
    }
}


class CreateGameRequest {
    constructor(player_id) {
        this.playerId = player_id;
    }
}

class CreateGameResponse {
    constructor({ game_id }) {
        this.gameId = game_id;
    }
}

class TakeAGuessRequest {
    constructor(guess) {
        this.guess = guess;
    }
}

class TakeAGuessResponse {
    constructor({ status, message, guess_result, guess_letters_status }) {
        this.status = status;
        this.message = message;
        this.guess_result = guess_result;
        this.letters_status = guess_letters_status;
    }

    isOver() {
        return this.guess_result === "GUESSED" || this.status === "ERROR";
    }
}

export {
    CreateUserRequest,
    CreateUserResponse,
    LoginUserRequest,
    LoginUserResponse,
    TakeAGuessRequest,
    TakeAGuessResponse,
    CreateGameRequest,
    CreateGameResponse,
    GetUserRequest,
    GetUserResponse,
    FailedCreateUserResponse,
    FailedGetUserResponse,
    FailedLoginUserResponse,
}
