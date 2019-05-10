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
        if(req.params.method ==="editRoom")return await this.editRoom(req)
        
    }
    async editRoom(req){
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let {_id,data} = req.body
        let ob = new baseLogic("room")
        console.log({condition:{_id:new ObjectId(_id)},data})
        return await ob.Edit({condition:{_id:new ObjectId(_id)},data})      
        
    }
    async createRoom(req){
        let {roomName,equipments,description,support}=  req.body
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let ob = new baseLogic("room")
        if((await ob.Get({roomName})).length ===0){
            await ob.Add({roomName,support,equipments,description,createBy:user.username})
            return "success"
        }else{
            throw "Room name exist"
        }
    }
    async removeRoom(req){
        let {roomName,_id}=  req.body
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let ob = new baseLogic("room")
        if(roomName !== undefined){
            await ob.Delete({roomName})
        }else{
            await ob.Delete({_id:new ObjectId(_id)})
        }
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
        let {roomName,start,end,username,equipment,subject,description} = para
        let status = "waiting"
        let checkout = false
        // if(start<1000000000000)start=start*1000
        // if(end<1000000000000)end=end*1000
        let time = new Date().getTime()
        // if(start < time)throw "booking in past"
        if(end <= start)throw "booking time incorrect"
        let obR = new baseLogic("room")
        if((await obR.Get({roomName})).length === 0 )throw "room not exist"
        console.log(time)
        let ob = new baseLogic("booking")
        let room = await ob.Get({roomName})
        if(room.length !== 0 ){
            for(let i=0;i< room.length;i++){
                if(room[i].end <= start ){
                }else if(room[i].start >= end){
                }else{
                    throw room[i]
                }
            }
            await ob.Add({roomName,start,end,username,equipment,subject,status,checkout,description})
            return "success"            
        }else{
            await ob.Add({roomName,start,end,username,equipment,subject,status,checkout,description})
            return "success"
        }
    }
    async cancelBooking(req){
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        let {_id}= req.body
        let ob = new baseLogic("booking")
        if(user.role ==="admin"){
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