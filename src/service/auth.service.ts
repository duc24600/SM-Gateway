import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private service: UserService,
    ) {}

    signIn(user : UserDto) {
        const payload = this.service.signIn(user); 
        return payload;
    }
}
