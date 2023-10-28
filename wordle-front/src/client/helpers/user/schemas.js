class CreateUserRequest {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class CreateUserResponse {
    constructor({ user_id, username, disabled, creation_date }) {
        this.userId = user_id;
        this.username = username;
        this.disabled = disabled;
        this.creationDate = creation_date;
    }
}

class FailedCreateUserResponse {
    constructor({ detail }) {
        this.detail = detail
    }
}

// Admin
class GetUserRequest {
    constructor(username) {
        this.username = username;
    }
}

class GetUserResponse {
    constructor({ id, username, password_hash, disabled, creation_date, games, sessions }) {
        this.userId = id;
        this.username = username;
        this.passwordHash = password_hash;
        this.disabled = disabled;
        this.creationDate = creation_date;
        this.games = games;
        this.sessions = sessions;
    }
}

class FailedGetUserResponse {
    constructor({ detail }) {
        this.detail = detail
    }
}

class LoginUserResponse {
    constructor({ session_id, user_id, access_token, token_type, session_creation_date }) {
        this.sessionId = session_id;
        this.userId = user_id;
        this.accessToken = access_token;
        this.tokenType = token_type;
        this.sessionCreationDate = session_creation_date;
    }
}

class FailedLoginUserResponse {
    constructor({ detail }) {
        this.detail = detail;
    }
}

export {
    CreateUserRequest,
    CreateUserResponse,
    FailedCreateUserResponse,
    GetUserRequest,
    GetUserResponse,
    FailedGetUserResponse,
    LoginUserResponse,
    FailedLoginUserResponse,
}