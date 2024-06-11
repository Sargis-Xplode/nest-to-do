// auth.controller.ts
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

interface AdminLoginDTO {
    success: boolean;
    message: string;
    access_token: string;
}

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    async login(@Body() body: any): Promise<AdminLoginDTO> {
        return this.authService.login(body);
    }
}
