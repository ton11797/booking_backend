import baseLogic from './baseLogic'
import { default as bcrypt } from 'bcrypt'
export default class {
    
    async entry(req){
        if(req.params.method ==="login")return await this.login(req)
        if(req.params.method ==="logout")return await this.logout(req)
        if(req.params.method ==="checkLogin")return await this.checkLogin(req)
        if(req.params.method ==="isLogin")return await this.isLogin(req)
        if(req.params.method ==="register")return await this.register(req)
        if(req.params.method ==="removeUser")return await this.removeUser(req)
        if(req.params.method ==="editUser")return await this.editUser(req)
        if(req.params.method ==="getUser")return await this.getUser(req)
        
    }
    async login(req){
        let ob = new baseLogic("users")
        let {username,password} = req.body
        let result = await ob.Get({username})
        let resultPass = bcrypt.compareSync(password, result[0].password)
        if (resultPass){
            let obS = new baseLogic("session")
            await obS.Delete({username})
            await obS.Add({sessionID:req.sessionID,username,role:result[0].role})
            return "success"
        }else{
            throw "login fail"
        }
    }
    async logout(req){
        if(await this.isLogin(req) === false) throw "not login"
        let ob = new baseLogic("session")
        let result = await ob.Delete({sessionID:req.sessionID})
        return "success"
    }
    async checkLogin(req){
        let ob = new baseLogic("session")
        let result = await ob.Get({sessionID:req.sessionID})
        if(result.length === 0 )return null
        return result[0]
    }
    async isLogin(req){
        let auth = await this.checkLogin(req)
        if(auth === null)return false
        return true
    }

    async register(req){
        let ob = new baseLogic("users")
        let {username,password,firstName,lastName} = req.body
        let result = await ob.Get({username})
        if(result.length === 0){
            const saltRounds = 10;
            const myPlaintextPassword = password;
            bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) =>{
                if(err)throw err
                password = hash
                await ob.Add({username,password,firstName,lastName,role:"user",status:true})
            });
            return "success"
        }else{
            throw "Username exist"
        }
    }

    async removeUser(req){
        let user = this.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let {username}=req.body
        let ob = new baseLogic("users")
        return await ob.Delete({username})
    }

    async editUser(req){
        let user = this.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let {username,data}=req.body
        let ob = new baseLogic("users")
        return await ob.Edit({condition:{username},data})
    }

    async getUser(req){
        let user = this.checkLogin(req)
        if(user === null)throw "not login"
        if(user.role !=="admin")throw "Permission denied"
        let ob = new baseLogic("users")
        return await ob.Get({})
    }
}