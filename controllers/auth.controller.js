
import sessionModel from '../models/session.model';
import userModel from '../models/user.model';
import * as AuthRepo from '../repositories/auth.repo';
import {authSchema} from '../services/validations'
import jwt from 'jsonwebtoken';

class AuthController {

    async login(req, res, next){
        try {
            console.log('Service requested ::: POST /auth');
    
            let schema =  await authSchema.validate(req.body); 
            let auth = await AuthRepo.authenticate(schema);
            if(auth && auth.error){
                return res.json({
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

    async logout(req, res, next) {

        try {
            console.log('Service request ::: GET /logout');
    
            const authentication = await AuthRepo.checkToken(req);
    
            if (authentication.code === 401 || authentication.code === 400) {
                return res.json({
                    message: authentication.message,
                    code: authentication.status,
                    error: authentication.error
                })
            }

            const { user } = await jwt.decode(req.headers['authorization'], {json:true});
         
            const userRequester = await userModel.findOne({'_id': user});
            if (userRequester) {
                const session = await sessionModel.findOneAndDelete({'user': userRequester.id, 'token': req.headers['authorization']});
                if(session) {
                    return res.json({session: session._doc, code:200, message: "logout successfully" });
                } else {
                    return res.json({session: {}, code: 400, message: "error in session"});
                }
            }
        } catch (error) {
            let custom_error = new Error(error.message);
            custom_error.status = error.status || 500;
            custom_error.errors = error.errors;
            return next(custom_error);
        }
    }
    

}

export default new AuthController;