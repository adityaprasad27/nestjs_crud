import type { Mocked } from "vitest";
import { UserService } from "./user.service.js";

export function createMockUserService(): Mocked<Pick<UserService, 'findUser' | 'getBio' | 'createUser'>> {
    return {findUser: vi.fn(), getBio: vi.fn(), createUser: vi.fn()};
}