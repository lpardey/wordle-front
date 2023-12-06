
class CreateGameResponse {
    constructor({ game_id, creation_date }) {
        this.gameId = game_id;
        this.creationDate = creation_date;
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
}

class Guess {
    constructor({ guess, letters_status }) {
        this.guess = guess;
        this.lettersStatus = letters_status
    }
}

class GameStatusResponse {
    constructor({ id, game_word, guesses_left, status, max_attempts, difficulty, creation_date, guesses, result, finished_date }) {
        this.gameId = id;
        this.gameWord = game_word;
        this.guessesLeft = guesses_left;
        this.status = status;
        this.maxAttempts = max_attempts
        this.difficulty = difficulty;
        this.creationDate = creation_date;
        this.guesses = guesses.map(guessData => new Guess(guessData));;
        this.result = result;
        this.finishedDate = finished_date;
    }

    isOver() {
        return this.status === "FINISHED"
    }
}


export {
    CreateGameResponse,
    TakeAGuessRequest,
    TakeAGuessResponse,
    GameStatusResponse,
}