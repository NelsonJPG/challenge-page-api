import slug from 'slug';
import * as PageRepo from '../repositories/page.repo';
import * as AuthRepo from '../repositories/auth.repo';
import {pageSchema} from '../services/validations'

class PagesController {

    async create(req, res, next){
        try {
            console.log('Service requested ::: POST /pages');
            let schema =  await pageSchema.validate(req.body); 

            let authentication = await AuthRepo.checkToken(req);
            if(authentication && authentication.code !== 200){
                return res.status(authentication.status).json({
                    message: authentication.message,
                    code: authentication.status,
                    error: authentication.error
                })
            }
            // validacion unique 

            let pageExist = await PageRepo.getBySlug(slug(req.body.name));
            if(pageExist){
                return res.status(422).json({
                    message: "the page already exist",
                    status: "Rule Entity",
                    code: 422,
                    error: {
                        details: ["this page already exist"]
                    }
                })

            }

            let page = await PageRepo.save(schema);
            if(!page){
                return res.status(400).json({
                    message: "error to create page",
                    status: "Bad Request",
                    code: 400
                })
            }
    
            return res.status(201).json({message: "the page has been created", status:"OK", code: 201 , page});

            
        } catch (error) {
            
            let custom_error = new Error(error.message);
            custom_error.status = 422;
            custom_error.errors = error.errors;
            return next(custom_error);     
        }
    }

    async index(req, res, next){
        
        try {
            let pages = await PageRepo.getAll();
            
            let pagesFormat = pages;

            return res.status(200).json({message: "pages has been found", status:"OK", code: 200, pages: pagesFormat});
        } catch (error) {
            let custom_error = new Error(error.message);
            custom_error.status = 400;
            return next(custom_error);    
        }
    }
    
}

export default new PagesController;