export class RegisterUserDTO {
    constructor (
        public email: string,
        public password: string,
        public confirmPassword: string,
        public firstName: string,
        public lastName: string,
        public userName: string
        )
        {

        }

}
