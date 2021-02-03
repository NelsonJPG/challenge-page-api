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
        return custom_error
    } 
}

export const checkToken = async ({ headers }) => {
     
    let token = headers['authorization'];
    if (!token) {
        console.log(` user not logged in :: CHECK AUTH`);
        let custom_error = new Error("Token not found");
        custom_error.status = 401;
        custom_error.error = {details: ["the user not logged in"] }
        return custom_error
    }

    token = token.replace('Bearer ', '');
    
    // Verify if the token is valid
    try {

        const response = await jwt.verify(token, CONFIG.saltJwt);
        const tokenVerified = await SessionModel.findOne({'token': token});
        console.log(token, tokenVerified)
        if(tokenVerified) {
            return { token: response, code: 200, status: 200, message: "token check sucessfully"} 
        } 
        
        console.log(` Token expired :: CHECK AUTH`);
        let custom_error = new Error("Token expired");
        custom_error.status = 403;
        custom_error.error = {details: ["the token was expired"] }
        return custom_error;
        

    } catch(error) {

        if(error.message === 'Token expired') {
            // The token is already expired so I remove from UserSession table
            const deletedTokenResponse = await SessionModel.deleteOne({token: headers['authorization']});
            let custom_error = new Error("Token expired");
            custom_error.status = 401;
            custom_error.error = {details: ["the token was expired", deletedTokenResponse] }
            return custom_error;
        
        } 

        let custom_error = new Error(error.message);
        custom_error.status = error.status;
        return custom_error;
        
    }
      
}

export const killSession = async ({ headers }) => {
    
    if (authentication.statusCode === 401 || authentication.statusCode === 400) {
        console.log(`failed token ::: GET /logout`);
        return authentication;
    }

    const { username } = await jwt.decode(headers['authorization'], {json:true});
    const userRequester = await UserModel.findOne({'username': username});

    if (userRequester) {
        const session = await SessionModel.findOneAndDelete({'user': userRequester.id, 'token': req.headers['authorization']});
        if(session) {
            return {session: session._doc, message: "authentication has been kill sucessfully", code: 200, status: "OK"};
        } else {
            return {session: session._doc, message: "authentication failed kill", code: 202, status: "OK"};
        }
    }

}
