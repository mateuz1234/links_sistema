const express = require('express')

const { Link } = require('../models')

const router = express.Router()


router.get('/', async (req, res) => {
    const {accountId} = req

    const links = await Link.findAll({where: {accountId}})//buscando todos
    if(!links) return res.jsonNotFound()

    return res.jsonOK(links)
})

router.get('/:id', async (req, res) => {
    const {accountId} = req
    const {id} = req.params

    const link = await Link.findOne({where: {id, accountId}})//verificando se link existe
    if(!link) return res.jsonNotFound()

    return res.jsonOK(link)
})

router.post('/', async (req, res) => {
    const {accountId, body} = req
    const {label, url, isSocial} = body

    const image = 'https://google.com/image.jpg'

    const link = await Link.create({label, url, isSocial, image, accountId})

    return res.jsonOK(link)
})

router.put('/:id', async (req, res) => {
    const {accountId, body} = req
    const {id} = req.params

    const campos = ['label', 'url', 'isSocial']

    const link = await Link.findOne({where: {id, accountId}})//verificando se link existe
    if(!link) return res.jsonNotFound()

    campos.map((campoName) => {
        const newValue = body[campoName]
        if(newValue !== undefined) link[campoName] = newValue
    })

    await link.save()
    return res.jsonOK(link)
})

router.delete('/:id', async (req, res) => {
    const {accountId} = req
    const {id} = req.params

    const link = await Link.findOne({where: {id, accountId}})//verificando se link existe
    if(!link) return res.jsonNotFound()

    await link.destroy()
    return res.jsonOK()
})

module.exports = router