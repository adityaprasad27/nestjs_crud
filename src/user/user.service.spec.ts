import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service.js';
import { USER_REPOSITORY } from './user-repository/user-repository.interface.js';
import { createMockUserRepository } from './user-repository/user-repository.mock.js';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = createMockUserRepository();

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {provide: USER_REPOSITORY, useValue: mockUserRepository}
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('gives undefined user if username not found', async () => {
    mockUserRepository.findByUsername.mockResolvedValue(undefined);

    await expect(service.getBio('username_doesnt_exist')).resolves.toBeUndefined();
  });
  
});
