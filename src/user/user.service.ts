import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(userData: { username: string; password: string }) {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }
}
