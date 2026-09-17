import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema()
export class UserDocument {
    @Prop({required: true, unique: true, index: true})
    username: string;

    @Prop({required: true})
    passwordHash: string

    @Prop({default: ''})
    bio: string
}

export type UserDocumentType = HydratedDocument<UserDocument>
export const UserSchema = SchemaFactory.createForClass(UserDocument);