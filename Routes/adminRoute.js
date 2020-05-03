const express = require("express");
const router = express.Router();

const {
    createNewAdmin,
    checkIfUserDoesNotExistBefore,
    changeOrderStatus,
    changeOrderlocation,
    getAllParcel
} = require("../Controllers/adminController");

const {
    schema
} = require("../Authorization/validation");

const { verifyAdminToken, verifySuperAdminToken } = require("../Authorization/verifyToken");

router.post(
    "/auth/admin/signup", verifySuperAdminToken,
    async (req, res, next) => {
        try {
            await schema.user.validateAsync(req.body)
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(/[\"]/gi, "")
            })
        }
        next();
    },
    async (req, res) => {
        const { email } = req.body;
        try {
            await checkIfUserDoesNotExistBefore(email);
            const result = await createNewAdmin(req.body);
            delete result.data.response.email
            delete result.data.response.password
            delete result.data.response.is_admin
            delete result.data.response.is_super_admin
            delete result.data.response.created_at
            delete result.data.response.updated_at
            return res.status(201).json(result);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
);

router.put("/parcel/status/change/:id", verifyAdminToken,
    async (req, res, next) => {
        try {
            const { id } = req.params
            await schema.idparam.id.validateAsync(id)
            await schema.status.validateAsync(req.body)
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(/[\"]/gi, "")
            })
        }
        next();
    },
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await changeOrderStatus(id, req.body);
            return res.status(200).json(result)
        } catch (e) {
            return res.status(e.code).json(e)
        }
    }
);

router.put("/parcel/location/change/:id", verifyAdminToken,
    async (req, res, next) => {
        const { id } = req.params
        try {
            await schema.idparam.id.validateAsync(id)
        } catch (error) {
            return res.status(400).json({
                error: error.details[0].message.replace(/[\"]/gi, "")
            })
        }
        next();
    },
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await changeOrderlocation(id, req.body);
            return res.status(200).json(result)
        } catch (e) {
            return res.status(e.code).json(e)
        }
    }
);

router.get("/parcels/all", verifyAdminToken,
    async (req, res) => {
        try {
            const result = await getAllParcel();
            return res.status(200).json(result)
        } catch (e) {
            return res.status(e.code).json(e)
        }
    }
);

module.exports = router;