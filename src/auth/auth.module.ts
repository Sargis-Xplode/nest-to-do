import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { adminsModelSchema, AdminsModel } from "./auth.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [MongooseModule.forFeature([{ name: AdminsModel.name, schema: adminsModelSchema }]), JwtModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
