const categoriesQuery = require("../../queries/categoriesQuery")

const categoryController = {

    async showAllCategories (_, res) {
        const categories = await categoriesQuery.getAllCategories();
        res.render('dashboard/admin/allCategories', { categories })
    },

    async addCategoriesAction (req, res) {
        req.body.created_by = req.session.user.name;
        const categories = await categoriesQuery.getAllCategories();
        const categoryFound = categories.find(cat => cat.name === req.body.name)
        if(categoryFound){
            const message = 'Cette catégorie existe déjà';
            res.render('dashboard/admin/allCategories', { categories, message });
            return;
        };
        await categoriesQuery.createCategory(req.body)
        res.redirect('/dashboard/admin/categories')
    },

    async updateCategoriesPage (_, res) {
        const categories = await categoriesQuery.getAllCategories();
        res.render('dashboard/admin/updateCategories', { categories })
    },

    async updateCategoriesAction (req, res) {
        const categoryId = parseInt(req.body.categoryId);
        const categories = categoriesQuery.getAllCategories();
        const categoryFound = categories.find(cat => cat.name === req.body.name);
        if(categoryFound){
            const message = 'Cette catégorie existe déjà';
            res.render('dashboard/admin/updateCategories', { categories, message });
            return;
        }
        const categoryToUpdate = await categoriesQuery.getCategoryById(categoryId);
        await categoriesQuery.updateCategory(categoryToUpdate, req.body);
        res.redirect('/dashboard/admin/categories')

    },

    async deleteCategory (req, res) {
        const categoryId = parseInt(req.params.categoryId);
        const categoryToDestroy = await categoriesQuery.getCategoryById(categoryId);
        await categoriesQuery.destroyCategory(categoryToDestroy)
        res.redirect('/dashboard/admin/categories')
    },
}

module.exports = categoryController