
import * as UserRepo from '../repositories/user.repo';
import {userSchema} from '../services/validations'

class UsersController {

    async create(req, res, next){
        try {
            console.log('Service requested ::: POST /users');
            let schema =  await userSchema.validate(req.body);
            let user = await UserRepo.save(schema);
            if(!user){
                return res.status(400).json({
                    message: "error",
                    status: "Bad Request",
                    code: 400
                })
            }
            
            return res.status(201).json({message: "user has been created", status:"OK", code: 201 , user});

        } catch (error) {
            let custom_error = new Error(error.message);
            custom_error.status = 422;
            custom_error.errors = error.errors;
            return next(custom_error);
        }
    }

}

export default new UsersController;