class CreateUserRequest {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class CreateUserResponse {
    constructor({ detail }) {
        this.detail = detail;
    }
}

class LoginUserRequest {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class LoginUserResponse {
    constructor({ detail }) {
        this.detail = detail;
    }
}

class TakeAGuessRequest {
    constructor(guess) {
        this.guess = guess;
    }
}

class TakeAGuessResponse {
    constructor({ guess_result, status, message, guess_letters_status }) {
        this.guess_result = guess_result;
        this.status = status;
        this.message = message;
        this.letters_status = guess_letters_status;
    }

    isOver() {
        return this.guess_result === "GUESSED" || this.status === "ERROR";
    }
}

export { CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse, TakeAGuessRequest, TakeAGuessResponse }
