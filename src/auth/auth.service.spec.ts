import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { createMockUserService } from '../user/user.service.mock.js';
import { createMockTokenService } from './token/token-service.mock.js';
import { createMockPasswordHasher } from './password-hash/password-hasher.mock.js';
import { UserService } from '../user/user.service.js';
import { TOKEN_SERVICE } from './token/token-service.interface.js';
import { PASSWORD_HASHER } from './password-hash/password-hasher.interface.js';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = createMockUserService();
  const mockTokenService = createMockTokenService();
  const mockPasswordHasher = createMockPasswordHasher();

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: UserService, useValue: mockUserService},
        {provide: TOKEN_SERVICE, useValue: mockTokenService},
        {provide: PASSWORD_HASHER, useValue: mockPasswordHasher}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
