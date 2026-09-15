export interface User {
    userId: number;
    username: string;
    passwordHash: string;
    bio: string;
}

export interface UserRepository {
    findByUsername(username: string): Promise<User | undefined>;
    create(user: Omit<User, 'userId'>): Promise<User>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');