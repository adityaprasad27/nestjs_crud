import { Mocked } from "vitest";
import { AuthService } from "./auth.service.js";

export function createMockAuthService() : Mocked<Pick<AuthService, 'register' | 'signIn'>> {
    return {register: vi.fn(), signIn: vi.fn()}
}