import { Injectable } from "@nestjs/common";
import { User, UserRepository } from "./user-repository.interface.js";

@Injectable()
export class InMemoryUserRepository implements UserRepository{
    private readonly users: User[] = [
        {
            userId: 1,
            username: "john",
            passwordHash: "$2b$10$8bzYEhGJwelJ2nTq6ZqsK.XDo30Srn3fbAruunkJFjC3ZXNlGme5u",
            bio: "kys"
        },
        {
            userId: 2,
            username: "ap",
            passwordHash: "$2b$10$5C8Jo6NuOHIBQBBXwExcYewmoZYZDmymS8oY/eS3bCh60qAvvWiiC",
            bio: "ab ham kya kare",
        }
    ]

    async findByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async create(user: Omit<User, "userId">): Promise<User> {
        const userId = this.users.length + 1;
        const full_user = {...user, userId: userId};
        this.users.push(full_user);
        return full_user
    }
}