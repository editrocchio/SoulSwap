const express = require('express')

const InscriptionCtrl = require('../controller/inscription-controller.js')

const router = express.Router()

router.post('/inscription', InscriptionCtrl.createInscription)
router.put('/inscription/:id', InscriptionCtrl.updateInscription)
router.delete('/inscription/:id', InscriptionCtrl.deleteInscription)
router.get('/inscription/:id', InscriptionCtrl.getInscriptionById)
router.get('/inscriptions', InscriptionCtrl.getInscriptions)

module.exports = router