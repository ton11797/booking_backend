import baseLogic from './baseLogic'
import { ObjectId } from 'mongodb'
export default class {
    async getlist(){
        let ob = new baseLogic("contact")
        return await ob.Get({})
    }
    async create(body){
        let ob = new baseLogic("contact")
        let {contactId,firstName,lastName,mobileNo,email,facebook,imageUrl} = body
        return await ob.Add({contactId,firstName,lastName,mobileNo,email,facebook,imageUrl})
    }
    async remove(body){
        let ob = new baseLogic("contact")
        return await ob.Delete({_id:new ObjectId(body._id)})
    }
    async edit(body){
        let ob = new baseLogic("contact")
        let {contactId,firstName,lastName,mobileNo,email,facebook,imageUrl} = body
        return await ob.Edit({data:{contactId,firstName,lastName,mobileNo,email,facebook,imageUrl},condition:{_id:new ObjectId(body._id)}})
    }
}