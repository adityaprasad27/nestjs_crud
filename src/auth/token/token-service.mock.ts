import type { TokenService } from "./token-service.interface.js";
import type { Mocked } from "vitest";

export function createMockTokenService() : Mocked<TokenService> {
    return {sign: vi.fn(), verify: vi.fn()}
}