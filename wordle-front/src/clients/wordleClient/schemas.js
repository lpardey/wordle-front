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
export { CreateUserRequest, CreateUserResponse, LoginUserRequest, LoginUserResponse }
