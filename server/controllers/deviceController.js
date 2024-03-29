const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

function Info(info, device) {
    if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
            DeviceInfo.create({
                title: i.title,
                description: i.description,
                deviceId: device.id
            })
        )
    }
}

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, rating, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, rating, typeId, img: fileName});
            Info(info, device)
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page} = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
            }
            return res.json(devices)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.findOne(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                },
            )
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateOne(req, res, next) {
        try {
            const {id} = req.params;
            const {name, price, rating, brandId, typeId, info} = req.body;
            let device = await Device.findOne({
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            });

            if (!device) throw new ApiError('Device not found', 404);
            if (name) device.name = name;
            if (price) device.price = price;
            if (rating) device.rating = rating;
            if (brandId) device.brandId = brandId;
            if (typeId) device.typeId = typeId;
            if (req.files && req.files.img) {
                const {img} = req.files;
                let fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                device.img = fileName;
            }

            await device.save();
            if (Info) {
                await device.info.destroy();
                Info(info, device);
            }
            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.destroy(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                }
            )
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController()
