import baseLogic from './baseLogic'
import security from './security'
import { ObjectId } from 'mongodb'
export default class {
    async entry(req){
        if(req.params.method ==="createRoom")return await this.createRoom(req)
        if(req.params.method ==="removeRoom")return await this.removeRoom(req)
        if(req.params.method ==="bookingRoom")return await this.bookingRoomU(req)
        if(req.params.method ==="cancelBooking")return await this.cancelBooking(req)
        if(req.params.method ==="getBooking")return await this.getBooking(req)
        if(req.params.method ==="getRoom")return await this.getRoom(req)
    }
    async createRoom(req){
        let {roomName}=  req.body
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        let ob = new baseLogic("room")
        if((await ob.Get({roomName})).length ===0){
            await ob.Add({roomName,createBy:user.username})
            return "success"
        }else{
            throw "Room name exist"
        }
    }
    async removeRoom(req){
        let {roomName}=  req.body
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        let ob = new baseLogic("room")
        await ob.Delete({roomName})
        return "success"
    }
    async getRoom(req){
        let ob = new baseLogic("room")
        return await ob.Get({})
    }

    async bookingRoomU(req){
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        req.body.username = user.username
        return await this.bookingRoom(req.body)
    }
    async bookingRoom(para){
        let {roomName,start,end,username} = para
        // if(start<1000000000000)start=start*1000
        // if(end<1000000000000)end=end*1000
        let time = new Date().getTime()
        // if(start < time)throw "booking in past"
        if(end <= start)throw "booking time incorrect"
        let obR = new baseLogic("room")
        if((await obR.Get({roomName})).length === 0 )throw "room not exist"
        console.log(time)
        let ob = new baseLogic("booking")
        // let room = await ob.Get({roomName,start:{$gt: time}})
        let room = await ob.Get({})
        if(room.length !== 0 ){
            for(let i=0;i< room.length;i++){
                if(room[i].end <= start ){
                }else if(room[i].start >= end){
                }else{
                    throw room[i]
                }
            }
            await ob.Add({roomName,start,end,username})
            return "success"            
        }else{
            await ob.Add({roomName,start,end,username})
            return "success"
        }
    }
    async cancelBooking(req){
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        let {_id}= req.body
        let ob = new baseLogic("booking")
        if(user.admin ===true){
            let result = await ob.Delete({_id:new ObjectId(_id)})
            if(result.result.n === 0)throw "booking not found"
            return "success"
        }else{
            let result = await ob.Delete({_id:new ObjectId(_id),username:user.username})
            console.log(result)
            if(result.result.n === 0)throw "booking not found or permission denine"
            return "success"
        }
    }
    async getBooking(req){
        let {roomName,time,present}= req.body
        let obR = new baseLogic("booking")
        let query = {}
        if(roomName !== undefined){
            query.roomName=roomName
        }
        if(time !== undefined && present === undefined){
            query["$and"] = [{start: { $lte: time }},{end: { $gte: time }}]
        }else if(time !== undefined && present !== undefined){
            query["$and"] = [{start: {$and:[{ $lte: time },{ $gte: new Date().getTime() }]} },{end: { $gte: time }}]
        }else if(time === undefined && present !== undefined){
            query.start ={ $gte: new Date().getTime() }
        }
        return await obR.Get(query)
    }
    
}