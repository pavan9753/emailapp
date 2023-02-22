const express=require("express")

const https=require("https")
const bodyParser=require("body-parser")
const app=express() 
// const e = require("express")
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("find"))


app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/signup.html");
})




app.post("/",(req,res)=>
{
    const fname=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
    // res.write("hello");
    const data={
        members:[
          {  email_address:email,
            status:"subscribed",
            merge_fields:
            {
                FNAME:fname,
                PHONE:phone
            }
        }   
        ]
    }

    
    const jsondata=JSON.stringify(data);
    var url="https://us9.api.mailchimp.com/3.0/lists/40116a06d6";
    
    const options={
        method:"POST",
        auth:"pavan1:4ab300aff3a70c8d2ee32980d4e36329-us9"
    }

    
    const request=https.request(url,options,(response)=>
    {
        var st=response.statusCode
    if(st===200) res.sendFile(__dirname+"/success.html");
    else res.sendFile(__dirname+"/fail.html");

        response.on("data",(data)=>
        {
            console.log(JSON.parse(data));
        })
    })
    app.post("/fail",(req,res)=>
    {
    res.redirect("/");
    })
    request.write(jsondata);
    request.end()
   
    // console.log(st);
    // res.status(200).sendFile(__dirname+"/success.html");
        // res. end()
})

app.listen(process.env.PORT || 3001 ,()=>
{
    console.log("server started at port 3001");
})


// 0b6056d55ff220b14599b3df8326d179-us9
//40116a06d6 40116a06d6
// 4ab300aff3a70c8d2ee32980d4e36329-us9