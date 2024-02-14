import { Schema,model } from "mongoose";


const tokenSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,required:true},
    token:{type:String,required:true,unique:true}
},
{
    timestamps: true,
})

const RefreshToken=model("Token",tokenSchema)

export default RefreshToken