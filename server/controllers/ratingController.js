const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await Rating.create({name})
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Rating.findAll()
            return res.json(types)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new RatingController()
