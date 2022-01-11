const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {
    async create(req, res) {
        const {name} = req.body
        const type = await Rating.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Rating.findAll()
        return res.json(types)
    }

}

module.exports = new RatingController()
