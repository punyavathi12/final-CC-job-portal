const { Op } = require("sequelize");
const Admins_model = require('../models/admin_model');

exports.createadmin = async (adminObj) => {
    try {
        await Admins_model.create(adminObj);

        let adminObjArr = await Admins_model.findAll({
            where: { email: adminObj.email }
            // order: [['employee_id', 'DESC']],
            // limit: 1
        });
        return { success: true, code: 200, obj: adminObjArr };

    } catch (error) {
        //console.error(error.message);
        return { success: false, code: 500, msg: error.message };
    }
};

exports.adminLogin = async (admin_email) => {
    try {
        let admin_pswrd = await Admins_model.findAll({
            where: { email: admin_email },
            attributes: ['password'],
        });
        //console.log(admin_pswrd);
        return admin_pswrd;
    } catch (error) {
        console.error(error.message);
        return "error encountered";
    }
};