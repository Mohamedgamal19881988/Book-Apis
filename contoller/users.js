const userModel = require('../schemas/users')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')

exports.register = async function (req, res) {
    try {
        let newUser = new userModel(req.body)
    
        const hashedPassword = await bcrypt.hash (req.body.password,10)
        newUser.password = hashedPassword
        let user = await newUser.save()
        return res.json({ message: "user registerd sucssfly", user: { name: user.name, email: user.email } })
        
    } catch (error) {
        return res.status(400).send({message:error})
        
    }

}

exports.login = async function (req, res) {
    try {

        let user = await userModel.findOne({email:req.body.email})
        if (!user){
            return res.status(401).send({ message: "Authntication failed .. invaled email or password" })

        }
        if (! await user.comparePassword (req.body.password) ){
            return res.status(402).send({ message: "Authntication failed .. invaled email or password" })
        }
        const token  = jwt.sign ({name:user.name , email:user.email ,_id:user.id,  role : user.role } , "hana")
        return res.json({ message: "user logedin sucssfly", user: { name: user.name, email: user.email , token:token , role : user.role} })


    } catch (err) {
        return res.status(400).send({ message: err })
    }
}

exports. allUser = async function (req,res) {
    try {

        const Role = req.user.role  
  
        if(Role === "admin"  || "Admin" ){
            const Users = await userModel.find()
        return res.json({ message: "Done", data: Users })

        }else{
            return res.json ({"message":"Access denied, Only Admin can view all users info"})

        }
         
        
    
        
        
        
    } catch (error) {
        return res.status (400).send ({message:error})
        
    }
    
}

exports.updateUser = async function (req,res) {
    try {
      
        const Role = req.user.role
        if ( Role === "admin" || "Admin" ){
            const updateBook = await userModel.findByIdAndUpdate( { _id: req.params.id  } ,req.body)
            return res.json({ "message": "User Updated Successfully", data: updateBook })
            
        } else {
            return res.json ({"message":"Access denied, Only Admin can update user info"})

        }
        
    } catch (error) {
        return res.status (400).send ({message:error})
        
    }
    
}

exports.deleteUser = async function (req,res) {
    try {
        const Role = req.user.role
        if ( Role === "admin" || "Admin" ){
            const deleteBook = await userModel.findByIdAndDelete( { _id: req.params.id  } )
            return res.json({ "message": "User Deleted Successfully", data: deleteBook })
            
        } else {
            return res.json ({"message":"Access denied, Only Admin can delete user"})

        }
       
       

        
    } catch (error) {
        return res.status (400).send ({message:error})
        
    }
    
}