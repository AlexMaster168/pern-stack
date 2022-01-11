const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id', deviceController.deleteOne)
router.put('/:id', deviceController.updateOne)

module.exports = router
