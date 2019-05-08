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

router.post("/api/login", async (req, res) => {
    try {
        let ob = new security()
        let result = message["200"]
        result.result = await ob.login(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
router.get("/api/checkLogin", async (req, res) => {
    try {
        let ob = new security()
        let result = message["200"]
        result.result = await ob.checkLogin(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
router.get("/api/logout", async (req, res) => {
    try {
        let ob = new security()
        let result = message["200"]
        result.result = await ob.logout(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
router.post("/api/register", async (req, res) => {
    try {
        let ob = new security()
        let result = message["200"]
        result.result = await ob.register(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})

router.post("/api/createRoom", async (req, res) => {
    try {
        let ob = new room()
        let result = message["200"]
        result.result = await ob.createRoom(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})

router.post("/api/removeRoom", async (req, res) => {
    try {
        let ob = new room()
        let result = message["200"]
        result.result = await ob.removeRoom(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})

router.post("/api/Booking", async (req, res) => {
    try {
        let ob = new room()
        let result = message["200"]
        result.result = await ob.bookingRoomU(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})

router.post("/api/cancelBooking", async (req, res) => {
    try {
        let ob = new room()
        let result = message["200"]
        result.result = await ob.cancelBooking(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
router.post("/api/getBooking", async (req, res) => {
    try {
        let ob = new room()
        let result = message["200"]
        result.result = await ob.getBooking(req)
        res.send(result)
    } catch (error) {
        console.log(error)
        let result = message["500"]
        result.result = error
        res.send(result)
    }
})
export { router }