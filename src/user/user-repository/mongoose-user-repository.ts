import { Injectable } from "@nestjs/common";
import { User, UserRepository } from "./user-repository.interface.js";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserDocumentType } from "./user.schema.js";
import { Model } from "mongoose";


@Injectable()
export class MongooseUserRepository implements UserRepository {
    constructor(@InjectModel(UserDocument.name) private model: Model<UserDocumentType>) {}


    async findByUsername(username: string): Promise<User | undefined> {
        const doc = await this.model.findOne({username}).exec();

        return doc ? this.toDomain(doc) : undefined;
    }
    async create(user: Omit<User, "userId">): Promise<User> {
        // TODO techincally this can lead to race conditions, i mean like  mong will return 500 but we should have a conflict exception raise here
        const doc = await this.model.create(user);
        return this.toDomain(doc);
    }
    
    private toDomain(doc: UserDocumentType) : User {
        return {
            userId: doc._id.toString(),
            username: doc.username,
            passwordHash: doc.passwordHash,
            bio: doc.bio
        };
    }
}