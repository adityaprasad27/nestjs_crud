import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { createMockAuthService } from './auth.service.mock.js';
import { AuthService } from './auth.service.js';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService =  createMockAuthService();

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{provide: AuthService, useValue: mockAuthService}]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
