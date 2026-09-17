import { PasswordHasher } from "./password-hasher.interface.js";
import { Mocked } from "vitest";

export function createMockPasswordHasher() : Mocked<PasswordHasher> {
    return {hash: vi.fn(), compare: vi.fn()}
}