const { User, Order, Product, Order_has_product, Tva } = require("../models");
const bcrypt = require('bcrypt');
const validator = require('email-validator');

const profilController = {

    async index (_, res) {
        res.render('dashboard/profil/profil' )
    },

    async updateProfilPage (_, res) {
        res.render('dashboard/profil/updateProfil')
    },

    async updateProfilAction (req, res) {
        const userFound = await User.findOne({
            where: {
                email: req.session.user.email,
            },
            include: 'role'
        });
        let passwordOk = await bcrypt.compare(req.body.checkPassword, userFound.password);
        if(!passwordOk){
            const error = "Mot de passe incorrect"
            res.render('dashboard/profil/updateProfil', { error });
            return;
        }
        if(req.body.modifPassword){
            if(req.body.modifPassword === req.body.confirmPassword) {
                req.body.password = await bcrypt.hash(req.body.modifPassword, 10);
            } else {
                const error = "Les deux mots de passe ne correspondent pas"
                res.render('dashboard/profil/updateProfil', { error });
            }
        }
        const userToUpdate = userFound.get( {plain: true} )
        Object.keys(req.body).forEach(key => !req.body[key] && delete req.body[key]);
        const userUpdated = { ...userToUpdate, ...req.body}
        await userFound.update(userUpdated)
        req.session.user = userFound
        res.redirect('/dashboard/profil')
    },

    async ordersHistory (req, res) {
        const userOrders = await Order.findAll({
            where: { user_id: req.session.user.id},
            raw: true,
        })
        res.render('dashboard/profil/ordersHistory', { orders: userOrders })
    },

    async orderHistoryDetails (req, res, next) {
        const orderId = req.params.orderId;
        if(!isNaN(orderId)){
            const order = await Order.findAll( {
                where: { id: orderId},
                include: [
                    { model: Product, thought: Order_has_product, as: 'products'}   
                ],
                raw: true,
                nest: true
            });
            res.render('dashboard/profil/orderHistoryDetails', { order })
        } else if (isNaN(orderId)){
            next()
        }
    }
};

module.exports = profilController;