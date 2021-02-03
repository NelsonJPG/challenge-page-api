import bcrypt  from 'bcrypt';
import UserModel from '../models/user.model';
import CONFIG from '../config';

export const save = async ({name, username, password, active, role = 'editor'}) => {
    const passwordHash = await bcrypt.hash(password, CONFIG.saltRounds);
    const model = UserModel({
        name, username, password: passwordHash, active, role
    });
    return await model.save();
}

export const getAll = async () => await UserModel.find({ active: 1}).sort({createdAt: -1});