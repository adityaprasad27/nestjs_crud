import type { Mocked } from "vitest";
import type { UserRepository } from "./user-repository.interface.js";
import {vi} from "vitest";

export function createMockUserRepository() : Mocked<UserRepository> {
    return {create: vi.fn(), findByUsername: vi.fn()};
}