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
        this.detail = detail
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
        this.detail = detail
    }
}

class LoginUserRequest {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class LoginUserResponse {
    constructor({ player_id, session_id, token, session_expiration_date }) {
        this.playerId = player_id;
        this.sessionId = session_id;
        this.token = token;
        this.sessionExpirationDate = session_expiration_date;
    }
}

class FailedLoginUserResponse {
    constructor({ detail }) {
        this.detail = detail;
    }
}


class CreateGameRequest {
    constructor(player_id) {
        this.playerId = player_id;
    }
}

class CreateGameResponse {
    constructor({ game_id, game_expiration_date }) {
        this.gameId = game_id;
        this.gameExpirationDate = game_expiration_date;
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
