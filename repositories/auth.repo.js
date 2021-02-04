import bcrypt  from 'bcrypt';
import jwt  from 'jsonwebtoken';
import UserModel from '../models/user.model';
import SessionModel from '../models/session.model';
import CONFIG from '../config';

export const authenticate = async ({ username, password }) => {
   
    let user = await UserModel.findOne({ username });

    if (user) {
        // User cannot do login due to is inactive
        if (!user.active) {
            console.log(`${user.username} is inactive ::: POST /login`)
            return {
                message: "user is inactive",
                status: "Bad Request",
                code: 402
            }
        }
        
        const matchPassword = await bcrypt.compare(password, user.password);
     
        if (matchPassword) {
            let token = '';
            const dataCyphered = {
                user: user.id,
                password: user.password
            }
            const tokenAlive = await SessionModel.findOne({'user': user._id});
            
            if (tokenAlive) {
                token = tokenAlive.token;
            } else {
                // The token expires 30min
                token = await jwt.sign(dataCyphered, CONFIG.saltJwt, {expiresIn: '1800s'});
                // Create tge session for the user
                await SessionModel.create({
                    token: token,
                    username: user.username,
                    user: user.id
                });
                
                // Don't send the password to the user
            }
            delete user._doc.password;

            const objResponse = {
                ...user._doc,
                token: token
            };

            console.log(`Authentication successfull ${user.username}`);
            return objResponse;

        } else {
            console.log(`invalid credential by ${username} ::: POST /login`);
            let custom_error = new Error("authentication failed");
            custom_error.status = 403;
            custom_error.error = {details: ["wrong user/pass invalid credential"] }
            return custom_error
        }

    } else {
        console.log(`invalid credential by ${username} ::: POST /login`);
        let custom_error = new Error("authentication failed");
        custom_error.status = 403;
        custom_error.error = {details: ["wrong user/pass invalid credential"] }
        custom_error.json = { error: "ola ke haze"}
        return custom_error
    } 
}

export const checkToken = async ({ headers }) => {
    
    // Verify if the token is valid
    try {
        
        let token = headers['authorization'];
        if (!token) {
            console.log(` user not logged in :: CHECK AUTH`);
            let custom_error = new Error("Token not found");
            custom_error.status = 401;
            custom_error.error = {details: ["the user not logged in"] }
            return custom_error
        }
    
        token = token.replace('Bearer ', '');
        
        const response = await jwt.verify(token, CONFIG.saltJwt);
        const tokenVerified = await SessionModel.findOne({'token': token});
       
        if(tokenVerified) {
            return { token: response, code: 200, status: 200, message: "token check sucessfully"} 
        } 
         
    } catch(error) {
        if(error.message === 'jwt expired') {
            console.log(` token expired :: CHECK AUTH`);
            let custom_error = new Error("Token Expired");
            custom_error.status = 403;
            custom_error.error = {details: ["jwt expired"] }
            return custom_error;
        }
    
        let custom_error = new Error("Token not found");
        custom_error.status = 403;
        custom_error.error = {details: ["the user not logged in"] }
        return custom_error
        
    }
      
}
