import baseLogic from './baseLogic'
import { default as bcrypt } from 'bcrypt'
export default class {
    async login(req){
        let ob = new baseLogic("users")
        let {username,password} = req.body
        let result = await ob.Get({username})
        let resultPass = bcrypt.compareSync(password, result[0].password)
        if (resultPass){
            let obS = new baseLogic("session")
            await obS.Delete({username})
            await obS.Add({sessionID:req.sessionID,username})
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
        let {username,password} = req.body
        let result = await ob.Get({username})
        if(result.length === 0){
            const saltRounds = 10;
            const myPlaintextPassword = password;
            bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) =>{
                if(err)throw err
                password = hash
                await ob.Add({username,password})
            });
            return "success"
        }else{
            throw "Username exist"
        }
    }
}