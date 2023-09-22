import { LoginService } from "../services/login.service";
import { ChangePassword } from "./changePassword";

export interface changePasswordUser{
    LoginUser: LoginService;
    ChangePassword: ChangePassword;
}