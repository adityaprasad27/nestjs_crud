import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';
import { createMockUserService } from '../user/user.service.mock.js';
import { createMockTokenService } from './token/token-service.mock.js';
import { createMockPasswordHasher } from './password-hash/password-hasher.mock.js';
import { UserService } from '../user/user.service.js';
import { TOKEN_SERVICE } from './token/token-service.interface.js';
import { PASSWORD_HASHER } from './password-hash/password-hasher.interface.js';
import { ConflictException } from '@nestjs/common';

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

  it('throws conflict exception and never hashes or creates when username already exists', async () => {
    // arrange 
    mockUserService.findUser.mockResolvedValue({
      userId: "1",
      username: "ap",
      passwordHash: "some-non-existent-hash",
      bio: ''
    });

    // act
    await expect(service.register("ap", "whatever")).rejects.toThrow(ConflictException);

    // check that unwanted things didnt get called
    expect(mockPasswordHasher.hash).not.toHaveBeenCalled();
    expect(mockUserService.createUser).not.toHaveBeenCalled();
  })

  it('should hash password and create user when username free', async () => {
    // arrange
    const username = "test";
    const userId = "1";
    const password = "whatever"
    const passwordHash = "hashed-password";
    const bio = "1"
    const token = "some-token"
    mockUserService.createUser.mockResolvedValue({
      userId,
      username,
      passwordHash,
      bio
    }); // does this work? does the repreiting name thing work out
    mockUserService.findUser.mockResolvedValue(undefined);
    mockPasswordHasher.hash.mockResolvedValue(passwordHash);
    mockTokenService.sign.mockResolvedValue(token);

    await expect(service.register(username, password)).resolves.toEqual({access_token: token});

    expect(mockPasswordHasher.hash).toHaveBeenCalledWith(password);
    expect(mockUserService.createUser).toHaveBeenCalledWith({username, passwordHash, bio: ''});
    expect(mockUserService.findUser).toHaveBeenCalledWith(username);
    expect(mockTokenService.sign).toHaveBeenCalledWith({
      sub: userId, username
    })
  })
});
