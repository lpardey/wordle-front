
class CreateGameResponse {
    constructor({ game_id, creation_date }) {
        this.gameId = game_id;
        this.creationDate = creation_date
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

class LastGameResponse {
    constructor({ game_id, game_word, finished_date }) {
        this.gameId = game_id
        this.gameWord = game_word
        this.finishedDate = finished_date
    }
}

export {
    CreateGameResponse,
    TakeAGuessRequest,
    TakeAGuessResponse,
    OngoingGameResponse,
    LastGameResponse,
}