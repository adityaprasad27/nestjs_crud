import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service.js';
import { USER_REPOSITORY, UserRepository } from './user-repository/user-repository.interface.js';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: {findByUsername: ReturnType<typeof vi.fn>; create: ReturnType<typeof vi.fn>};

  beforeEach(async () => {
    mockUserRepository = {findByUsername: vi.fn(), create: vi.fn()}
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
