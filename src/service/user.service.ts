import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from "src/dto/user.dto";
import axios from "axios";
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOneBy({ username });
    }

    async remove(username: string): Promise<void> {
        await this.userRepository.delete(username);
    }

    async signIn(user: UserDto): Promise<User | null> {
        try {
            const response = await axios.get(process.env.SM_ENDPOINT, {
                headers: {
                    'Authorization': btoa(`Basic ${user.username}:${user.password}`),
                    'Host': process.env.SM_HOST,
                }
            });
            if(response.status == 200){
                const data : User = response.data;
                return data;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}