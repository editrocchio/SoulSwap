const Inscription = require('../models/inscription-models')

createInscription = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an inscription',
        })
    }

    const inscription = new Inscription(body)

    if (!inscription) {
        return res.status(400).json({ success: false, error: err })
    }

    inscription
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: inscription._id,
                message: 'Inscription created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Inscription not created!',
            })
        })
}

updateInscription = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Inscription.findOne({ _id: req.params.id }, (err, inscription) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Inscription not found!',
            })
        }
        inscription.firstName = body.firstName
        inscription.middleName = body.middleName
        inscription.lastName = body.lastName
        inscription.birthDate = body.birthDate
        inscription.deathDate = body.deathDate
        inscription.obituary = body.obituary
        inscription.image = body.image
        inscription
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: inscription._id,
                    message: 'Inscription updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Inscription not updated!',
                })
            })
    })
}

deleteInscription = async (req, res) => {
    await Inscription.findOneAndDelete({ _id: req.params.id }, (err, inscription) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!inscription) {
            return res
                .status(404)
                .json({ success: false, error: `Inscription not found` })
        }

        return res.status(200).json({ success: true, data: inscription })
    }).catch(err => console.log(err))
}

getInscriptionById = async (req, res) => {
    await Inscription.findOne({ _id: req.params.id }, (err, inscription) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!inscription) {
            return res
                .status(404)
                .json({ success: false, error: `Inscription not found` })
        }
        return res.status(200).json({ success: true, data: inscription })
    }).catch(err => console.log(err))
}

getInscriptions = async (req, res) => {
    await Inscription.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Inscription not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    createInscription,
    updateInscription,
    deleteInscription,
    getInscriptions,
    getInscriptionById,
}