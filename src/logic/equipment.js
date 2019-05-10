import baseLogic from './baseLogic'
import security from './security'
import { ObjectId } from 'mongodb'
export default class {
    async entry(req){
        if(req.params.method ==="getEquipment")return await this.getEquipment(req)
        if(req.params.method ==="createEquipment")return await this.createEquipment(req)
        if(req.params.method ==="removeEquipment")return await this.removeEquipment(req)
        if(req.params.method ==="editEquipment")return await this.editEquipment(req)
    }
    async editEquipment(req){
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let {_id,data} = req.body
        let ob = new baseLogic("equipment")
        return await ob.Edit({condition:{_id:new ObjectId(_id)},data})      
        
    }
    async createEquipment(req){
        let {equipmentName,description}=  req.body
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let ob = new baseLogic("equipment")
        if((await ob.Get({equipmentName})).length ===0){
            await ob.Add({equipmentName,description,createBy:user.username})
            return "success"
        }else{
            throw "Equipment name exist"
        }
    }
    async removeEquipment(req){
        let {equipmentName,_id}=  req.body
        let auth = new security()
        let user = await auth.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let ob = new baseLogic("equipment")
        if(equipmentName !== undefined){
            await ob.Delete({equipmentName})
        }else{
            await ob.Delete({_id:new ObjectId(_id)})
        }
        return "success"
    }
    async getEquipment(req){
        let ob = new baseLogic("equipment")
        return await ob.Get({})
    }
}