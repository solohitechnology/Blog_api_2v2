const Category = '../models/Category';

//CREAT NEW CATHEGORY
export const creatNewCart = async (req, res, next) => {
    try {
        const cat = new Category(req.body);
        await cat.save();
        return res.status(200).json(cat)

    } catch (err) {
        return res.status(500).json('somthing went wrong' + err)
    }
};
//READ CATHEGORY
export const getAllCat = async (req, res, next) => {
    try { 
        const getCat = await Category.findById(req.params.id);
        res.status(200).json(getCat)
    } catch (err) {
        return res.status(500).json(err);
    }
};



