import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller.js';
import { createMockUserService } from './user.service.mock.js';
import { UserService } from './user.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = createMockUserService();

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{provide: UserService, useValue: mockUserService}]
    })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true})    
    .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
