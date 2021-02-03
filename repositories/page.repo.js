import slug from 'slug';
import PageModel from '../models/page.model';

export const save = async ({name, active}) => {
    const model = PageModel({name, slug: slug(name), active});
    return await model.save();
}

export const getAll = async () => await PageModel.find({ active: 1}).sort({createdAt: -1});

export const getBySlug = async slug => await PageModel.findOne({ slug: slug});
