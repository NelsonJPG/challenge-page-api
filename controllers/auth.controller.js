
import * as AuthRepo from '../repositories/auth.repo';
import {authSchema} from '../services/validations'

class AuthController {

    async login(req, res, next){
        try {
            console.log('Service requested ::: POST /auth');
    
            let schema =  await authSchema.validate(req.body); 
            let auth = await AuthRepo.authenticate(schema);
            if(auth && auth.error){
                return res.status(auth.status).json({
                    message: auth.message, code: auth.status, error: auth.error 
                });
            }
            return res.status(200).json({message: "user has been logged in", status:"OK", code: 200 ,user: auth});

        } catch (error) {
            let custom_error = new Error(error.message);
            custom_error.status = 422;
            custom_error.errors = error.errors;
            return next(custom_error);
        }
    }
    

}

export default new AuthController;