
class CreateGameResponse {
    constructor({ game_id, creation_date }) {
        this.gameId = game_id;
        this.creationDate = creation_date
    }
}

class FailedCreateGameResponse {
    constructor({ detail }) {
        this.detail = detail
    }
}

class TakeAGuessRequest {
    constructor(guess) {
        this.guess = guess;
    }
}

class TakeAGuessResponse {
    constructor({ status, message, guess_result, letters_status }) {
        this.status = status;
        this.message = message;
        this.guessResult = guess_result;
        this.lettersStatus = letters_status;
    }

    isOver() {
        return this.guessResult === "GUESSED" || this.status === "ERROR";
    }
}

class OngoingGameResponse {
    constructor({ ongoing_game, game_status }) {
        this.ongoingGame = ongoing_game
        this.gameStatus = game_status
    }
}

class FailedOngoingGameResponse {
    constructor({ detail }) {
        this.detail = detail
    }
}

export {
    CreateGameResponse,
    FailedCreateGameResponse,
    TakeAGuessRequest,
    TakeAGuessResponse,
    OngoingGameResponse,
    FailedOngoingGameResponse
}