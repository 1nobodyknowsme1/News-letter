const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const client = require("@mailchimp/mailchimp_marketing");
const { url } = require("inspector");

// it is first version
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on 3000 port");
})

client.setConfig({ apiKey: "77f5d4acbdfafb70cceba31d1546a990-us17", server: "us17", });







app.post("/", function (req, res) {
    const subscribingUser = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email
        
    }
    const run = async (e) => {
        const response = await client.lists.addListMember("7c3df8c6cd",{
            
            
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        
        }
    
       
        )
        res.sendFile(__dirname+"/success.html");
   
    };
    
    run().catch(e => res.sendFile(__dirname+"/failure.html"));
    

    
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

var Url = "https://us17.api.mailchimp.com/3.0/";
console.log(Url)

   