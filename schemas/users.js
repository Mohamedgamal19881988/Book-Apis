const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const userSchema = new Schema ( {
    name : String,
    email:String,
    phone : Number,
    password:String,
    role : String,

})



// userSchema.methods.comparePassword = async function(userPassword){
//     console.log(await bcrypt.compare (userPassword ,this.password))
//     return await bcrypt.compare (userPassword ,this.password)
// }

userSchema.methods.comparePassword = async function(userPassword){
    console.log( await bcrypt.compare (userPassword,this.password)
    )
    return await bcrypt.compare (userPassword,this.password)
}

module.exports = mongoose.model('users',userSchema)