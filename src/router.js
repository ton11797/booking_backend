import express from 'express'
import {message} from './result'
import {room,security} from './logic'
import test from './logic/room'
let router = express.Router()

router.post("/api/test", async (req, res) => {
    try {
        let ob = new test()
        let result = message["200"]
        result.result = await ob.bookingRoom(req.body)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
router.post("/api/auth/:method", async (req, res) => {
    try {
        let ob = new security()
        let result = message["200"]
        result.result = await ob.entry(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
router.post("/api/room/:method", async (req, res) => {
    try {
        let ob = new room()
        let result = message["200"]
        result.result = await ob.entry(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
export { router }