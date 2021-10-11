const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const validator = require("validator")
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://clay-admin:Moshpit1@cluster0.usdlt.mongodb.net/iServiceDB", {useNewUrlParser:true})

app.use(bodyParser.urlencoded({extended:true}))

const iServiceSchema = new mongoose.Schema(
  {
    country:{type: String,
      required:true},
    fName:{type: String,
      trim:true,
      required:true},
    lName:{type: String,
      trim:true,
      required:true},
    email:{type: String,
      trim:true,
      lowercase:true,
    validate(value){
      if (!validator.isEmail(value)){
        throw new Error(FileSystem.out.printIn("Please input correct email"))
      }
     },
      required:true},
    password:{type: String,
      min:8,
      required:true}, 
    address:{type: String,
      required:true},
    city:{type: String,
      required:true},
    state:{type: String,
      required:true},
    zip:{type: Number,
      min:4},
    phoneNumber:{type: Number,
      min:10}
  }
)

const Customers = mongoose.model("Customer", iServiceSchema);

app.get('/', (req, res)=> {
  res.sendFile(__dirname + "/index.html");
})

app.post('/', function (req,res){
    let newCustomer = new Customers({
      country:req.body.country,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,  
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phoneNumber: req.body.phoneNumber
    });
    newCustomer.save();
    res.redirect('/');

  
})

app.listen(8000, function(){
  console.log("server is running on 8000")
});
  
/*

 const data = {
    members:[{
        email_address: email ,
        status : "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
    }],

Customers.find((err,customers)=>{
  if(err)
  {
    console.log(err)
  }
  else
  {
    console.log(customers)
  }

})

const customers = new Customers(
  {
    _id:1,
    fName:'Rachael',
    lName:'Symes',
    email:'rachaelsymes@gmail.com',
    address:'31 Spain Road',
    city:'Stiges',
    state:'Spain',
    zip:'2190',
    phoneNumber:'0423919412'
  }
)

customers.save((err)=>{
  if (err)
  {console.log(err)}
  else
  {console.log("Inserted successfully!")}
})



/*
    /*

    

    /*
    jsonData = JSON.stringify(data)

    const list_id = "eb66876f0c"
    const url = "https://us5.api.mailchimp.com/3.0/lists/eb66876f0c"  
    const options ={
        method:"POST",
        auth:"azi:c44d85c8a9e1334e1de0f1f2ff7b2790-us5"
    }

    const request = https.request(url, options, (response)=>{

      response.on("data", (data)=>{
        console.log(JSON.parse(data))
      })
    })

    request.write(jsonData)
    request.end()
    console.log(firstName, lastName, email)
})

*/



