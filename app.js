//yaha pe sab connections honge
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs");
const mongoose=require("mongoose");
// const assert = require("assert");
const router = express.Router();
alert = require('alert');
const app=express();
let objtot = {};
const multer = require('multer');
const fs = require('fs');
const path = require('path');
app.use('/uploads',express.static(__dirname+"/uploads"));

// mongoose:package of mongodb,ODM
// object document mapper:allows js (speaks lang of objects) to communicate with mongodb database 
// that speaks the language of documents, collections and dbs
const cookieParser=require("cookie-parser");
const sessions=require("express-session");
const { Db } = require("mongodb");

// To set up the session, you need to set a couple of Express-session options
const twohrs=1000*60*60*2;
app.use(sessions({
    secret:"thisismysecretkey",
    saveUninitialized:true,
    cookie:{maxAge : twohrs},
    resave:false
}));
// secret - a random unique string key used to authenticate a session. It is stored in an environment variable and can’t be exposed to the public.
// resave - takes a Boolean value. It enables the session to be stored back to the session store, even if the session was never modified during the request.
// saveUninitialized - this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
// cookie: { maxAge: oneDay } - this sets the cookie expiry time. The browser will delete the cookie after the set duration elapses. 

// function ignoreFavicon(req, res, next) {
//     console.log("HMMM");
//     if (req.originalUrl.includes('favicon.ico')) {
//         res.status(204).end()
//     }
//     next();
// }
// app.use(ignoreFavicon);

mongoose.connect("mongodb+srv://Shernoble:mongo567@cluster0.0lwcnwm.mongodb.net/HomeAway-v1", {useNewUrlParser: true,});
// create schema for Hostprofile and guest profile
app.use(express.static('public'));
// middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Define Cookie-parser usage so that the server can access the necessary option to save, read and access a cookie.
app.use(cookieParser());

// hata do badme
const myusername="user1";
const mypassword="mypassword";
var session;




sgn = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});
adn = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});


const listingSchema=new mongoose.Schema({
    
    ListingID:{
        type:String,
        default:null
    },
    img_url1:String,
    img_url2:String,
    img_url3:String,
    img_url4:String,
    img_url5:String,
    Title:String,
    Address:{
        Line1:String,
        Line2:String,
        District:String,
        State:String,
        Pincode:Number
    },
    Host:[{
        HostID:String,
        HostUserName:String,
        HostTotalListingsCount:Number

    }],
    Desc1:String,
    Desc2:String,
    MaxGuests:Number,
    CostPerN:Number,
    Bedrooms:Number,
    Bathrooms:Number,
    PropertyType:String,
    RoomType:String,
    Facilities:[]
});

//collection Guests will follow guestSchema
const Guest=mongoose.model("Guest",sgn);
const g1=new Guest({
    UserID:"101",
    UserName:"test1",
    Email:"trst1@test.com",
    Password:"Tester123#"
});
const g2=new Guest({
    UserName:"test1",
    Email:"trst6@test.com",
    Password:"Tester123#"
});


const guestList=[g2];

const House=mongoose.model("Listing",listingSchema);
const houseListings=[];

const Host=mongoose.model("Host",sgn);
const h1= new Host({
    UserID:null,
    UserName:"Host1",
    Email:"Host@email.com",
    Password:"Hoster123#"
});
const Admin=mongoose.model("Admin",adn);

const HostList=[h1];
// const VerifyG=mongoose.model("verify_guest",sgn);
// const VerifyH=mongoose.model("verify_Host",sgn);
// const VerifyL=mongoose.model("verify_listing",listingSchema);

// ico error solve krne
app.get('/favico.ico' , function(req , res){/*code*/});

app.get("/",function(req,res){
    // res.render("admin-homepage",{All_listings:houseListings});
    // res.render("reservation");
    // below line gets all the session data:tap into it and check if session.userid is set
    // session=req.session;
    // if(session.userid){
    //     res.render("guest-homepage");
    // }
    // else res.render("k-login-guest");
    res.render('first');
});

// sessions test ke liye:delete
app.post("/user",function(req,res){
    if(req.body.un==myusername && req.body.pass==mypassword){
        session=req.session;
        session.userid=req.body.un;
        console.log(req.session);
        res.send(`Hey there, welcome <a href='/logout'>click to logout</a>`)
    }
    else{
        res.send('Invalid username or password');
    }
});
// session test ke liye:delete
app.get('/logout',function(req,res){
    req.session.destroy();
    console.log("logged out successfully");
    res.redirect('/');//login page redirect
});
app.post('/logout1',function(req,res){
    req.session.destroy();
    console.log("logged out successfully");
    res.redirect('/');//login page redirect
});

// admin-homepage
app.get("/admin-listings",function(req,res){
    // after admin logs in render this page
    // if(req.params.choice===null)
    // {
    House.find({})
    .then(function(results){
        if(results.length===0)
        {
            House.insertMany(houseListings)
                .then(function(){
                    console.log("inserted docs");
                })
                .catch(function(err){
                    console.log(err);
                });
        }
        res.render("admin-homepage",{All_listings:results});
    })
    .catch(function(err){
        console.log(err);
    });
    
});

app.get("/admin-guestlist",function(req,res){
    Guest.find({})
    // callback function not a thing anymore
        .then(function(results){
            if(results.length===0){
                Guest.insertMany(guestList)
                    .then(function(){
                        console.log("inserted docs");
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
            res.render("admin-guestlist",{guestList:results});
        })
        .catch(function(err){
            console.log(err);
        });
    // Guest.find(function(err,guests){
       // insertMany no longer accepts a callback: do this way everywhere
    
    
    
});
app.get("/admin-Hostlist",function(req,res){
    Host.find({})
        .then(function(results){
            if(results.length===0){
                Guest.insertMany(guestList)
                    .then(function(){
                        console.log("inserted docs");
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
            res.render("admin-Hostlist",{HostList:results});
        })
        .catch(function(err){
            console.log(err);
        });
});

// GUEST ROUTES
app.get("/guest-results",function(req,res){
    // ADD SEARCH FILTER
    House.find({})
    .then(function(results){
        if(results.length===0)
        {
            House.insertMany(houseListings)
                .then(function(){
                    console.log("inserted docs");
                })
                .catch(function(err){
                    console.log(err);
                });
        }
        res.render("results",{All_listings:results});
    })
    .catch(function(err){
        console.log(err);
    });
});

app.get("/guest-reservation/:ListID",function(req,res){
    const id=req.params.ListID;
    House.find({ListingID:id})
        .then(function(results){
            res.render("reservation",{Listing:results[0]});
        })
        .catch(function(err){
            console.log(err);
        });
});

// search-bar wala search
app.post("/admin-search",function(req,res){
    // YAHA PAR SEARCH HOGA ADMIN PAGE KE LISTINGS KA
    var x=req.body.search_ch;
    listingSchema.index({'Host.HostID':"text",'Address.State':"text",'Address.District':"text",'ListingID':"text",'Address.Pincode':"text",'Title':"text"});
    // console.log(x);
    House.find({$text:{$search:x}})
    // console.log(l1);
        .then(function(results){
            if(results.length!=0){
                res.render("admin-homepage",{All_listings:results});
            }
            else console.log("no results");
        })
        .catch(function(err){
            console.log(err);
        });

});
app.post("/admin-guestlist/search",function(req,res){
    var x=req.body.search_ch;
    // console.log(x);
    sgn.index({'UserID':"text",'UserName':"text",'Email':"text"});
    // console.log(x);
    Guest.find({$text:{$search:x}})
    // console.log(l1);
        .then(function(results){
            if(results.length!=0){
                // console.log(results);
                res.render("admin-guestlist",{guestList:results});
            }
            else console.log("no results");
        })
        .catch(function(err){
            console.log(err);
        });
});
app.post("/admin-Hostlist/search",function(req,res){
    // VARIABLES CHANGE KRNA HAI:Host KE LIYE
    var x=req.body.search_ch;
    // console.log(x);
    sgn.index({'UserID':"text",'UserName':"text",'Email':"text"});
    // console.log(x);
    Guest.find({$text:{$search:x}})
    // console.log(l1);
        .then(function(results){
            if(results.length!=0){
                // console.log(results);
                res.render("admin-Hostlist",{guestList:results});
            }
            else console.log("no results");
        })
        .catch(function(err){
            console.log(err);
        });
});

// app.get("/verification/:type",function(req,res){
//     const verif=req.params.type;
//     if(verif=="guests"){
//         Guest.find({UserID:null})
//             .then(function(results){
//                 VerifyG.insertMany(results)
//                     .then(function(){
//                         res.render("admin-gverify",{list:results,key:"guests"});
//                     })
//                     .catch(function(err){
//                         console.log(err);
//                     });

//             })
//             .catch(function(err){
//                 console.log(err);
//             })
//     }
//     else if(verif=="Hosts"){
//         Host.find({UserID:null})
//         .then(function(results){
            
//             VerifyH.insertMany(results)
//                     .then(function(){
//                         res.render("admin-gverify",{list:results,key:"Hosts"});
//                     })
//                     .catch(function(err){
//                         console.log(err);
//                     });

//         })
//         .catch(function(err){
//             console.log(err);
//         });
//     }
//     else{
//         House.find({ListingID:null})
//         .then(function(results){
            
//             VerifyL.insertMany(results)
//                     .then(function(){
//                         res.render("admin-listingverify",{list:results,key:"listings"});
//                     })
//                     .catch(function(err){
//                         console.log(err);
//                     });
//         })
//         .catch(function(err){
//             console.log(err);
//         });
//     }
// });

// guest homepage all listings
app.post("/",function(req,res){
    const dest=req.body.destination;
    const ci=req.body.checkin;
    const co=req.body.checkout;
    const no_guests=req.body.no_guests
    // res.render("results",{destination: dest,checkin:ci,checkout:co,no_guests:no_guests});
    res.redirect("/guest-results");
});
app.post("/guest/:choice",function(req,res){
    const userName=req.body.un;
    const pass=req.body.pass;
    if(req.params.choice==="login"){
        Guest.find({UserName:userName,Password:pass})
        .then(function(result){
            if(result.length===0){
                // alert("no such username, try again");
                console.log("incorrect login/user doesnt exist");
                // render login/signup page
                res.render("k-login-guest");
            }
            else{
                // create session
                session=req.session;
                session.userid=userName;
                console.log(req.session);
                res.render("guest-homepage");
                // if coming from reservation page
                // redirect to reservation page
            }
            
        })
        .catch(function(err){
            console.log(err);
        });
    }
    else{
        // skip
        // login=false

        res.render("guest-homepage");
        
    }
    
});

app.get("/profile-ga/:user", async function(req,res){
    session=req.session;
    const user=req.params.user;
    console.log("user : ",session.userid);
    if(session.userid){
        if(user=="guests"){
                const guestinfo=[];
                const vais=(await Guest.find({UserName:req.session.userid})).forEach((guest)=>{
                guestinfo.push(guest);
            });
            res.render('profile_guest',{guest});
        }
        else{
            Admin.find({UserName:session.userid})
                .then(function(results){
                    // change
                    res.render("profile_guest",{user:results[0]});
                })
                .catch(function(err){
                    console.log(err);
                    // render error page?
                });
        }
    }
    else{
        console.log("user not logged in");
    }
});

// for guest
app.post("/reset-ga/:user",async function(req,res){
    session=req.session;
    const user=req.params.user;
    console.log("user : ",session.userid);
    if(session.userid){
        if(user=="guests"){
                const guestinfo=[];
                const vais=(await Guest.find({UserName:req.session.userid})).forEach((guest)=>{
                guestinfo.push(guest);
            });
            res.render('profile',{guest});
        }
        else{
            Admin.find({UserName:session.userid})
                .then(function(results){
                    res.render("profile",{user:results[0]});
                })
                .catch(function(err){
                    console.log(err);
                    // render error page?
                });
        }
    }
    else{
        console.log("user not logged in");
    }
});

// on clicking reserve button
app.post("/reserveReq/:listID",function(req,res){
    const id=req.params.listID;
    console.log(id);
    const ci=new Date(req.body.checkin);
    const co=new Date(req.body.checkout);
    const curr=new Date().getTime();
    const ti=ci.getTime();
    const to=co.getTime();
    if(to<ti || ti<curr || to<curr ){
        alert("dates are invalid");
    } 
    else{
        const diffms=Math.abs(co-ci);
        const diffInDays = Math.ceil(diffms / (1000 * 60 * 60 * 24));
        session=req.session;
        if(session.userid){
            House.find({ListingID:id})
            .then(function(results){
                res.render("confirmation2",{Listing:results[0],num_days:diffInDays});
            })
            .catch(function(err){
                // render error page: NOT FOUND ERROR
                console.log(err);
            });
        }
        else{
            // alert("you are required to login first");
            console.log("you should login or signup first");
            res.render("k-login-guest");
        }
    }
});

app.get("/views/:pageName",function(req,res){
    res.render(req.params.pageName);
});

app.get("/:pageName",function(req,res){
    res.render(req.params.pageName);
});

app.post("/guestpage/search",function(req,res){
    var x=req.body.search_ch;
    // sfgdfdy
    // listingSchema.index({'Host.HostID':"text",'Address.State':"text",'Address.District':"text",'ListingID':"text",'Address.Pincode':"text",'Title':"text"});
    // console.log(x);
    House.find({$text:{$search:x}})
    // console.log(l1);
        .then(function(results){
            if(results.length!=0){
                // console.log("there is results");
                res.render("results",{All_listings:results});
            }
            else console.log("no results");
        })
        .catch(function(err){
            console.log(err);
        });

});
app.post("/guestpage/filter",function(req,res){
    const ch=req.body.choice;
    console.log(ch);
    if(ch!="All")
        {House.find({PropertyType:ch})
            .then(function(results){
                res.render("results",{All_listings:results});
            })
            .catch(function(err){
                console.log(err);
            });}
    else{
        House.find({})
            .then(function(results){
                res.render("results",{All_listings:results});
            })
            .catch(function(err){
                console.log(err);
            });
        }
});

// app.post("admin/verify/:user",function(req,res){
//     const u=req.params.user;
//     const acc=req.body.userid;
//     if(u=="guest"){
//         Guest.find({UserName:u})
//         .then(function(results){
//             results[0].UserID=acc;
//             VerifyG.findOneAndDelete({UserName:u})
//             .then(function(doc){
//                 console.log("deleted item : ",doc);
//                 // res.redirect("/admin-guestlist");
                
//             })
//             .catch(function(err){
//                 console.log(err);
//             });

//         })
        
//     }
// });

app.post("/admin/delete/:page",function(req,res){
    const opt=req.params.page;
    if(opt=="guestlist")
    {const del_id=req.body.elementID;
    // console.log(del_id);
    Guest.findOneAndDelete({UserID:del_id})
        .then(function(doc){
            console.log("deleted item : ",doc);
            // res.redirect("/admin-guestlist");

        })
        .catch(function(err){
            console.log(err);
        });
        res.redirect("/admin-guestlist");}
    else if(opt=="listings"){
        const id=req.body.listID;
        House.findOneAndDelete({ListingID:id})
            .then(function(doc){
                console.log("deleted item : ",doc);
                // res.redirect("/admin-listings");
                
            })
            .catch(function(err){
                console.log(err);
            });
            res.redirect("/admin-listings");
    }
    
});
app.post("/confirm-booking",function(req,res){
    res.render("congog");
});

// pass in login session for reservation and confirmation
// tap into attribute data-bs-toggle=""
// set data-bs-toggle="modal" if login="False"

// NEWWWW
app.post("/logina",function(req,res)
{
    Admin.find({Email:req.body.email})
    .then(function(results)
    {        
            if(results.length === 0)
            {
                alert("Incorrect UserEmail");
                res.render("logina")
                
            }
            else if(results[0].password!=req.body.passw)
            {
                alert("Incorrect Password");
                res.render("logina")
            }
            else if(results[0].PhoneNumber!=req.body.phnum)
            {
                alert("Incorrect Phonenumber");
                res.render("logina")
            }
            else if(results[0].UserName!=req.body.name)
            {
                alert("Incorrect Username");
                res.render("logina")
            }
            else if(results[0].password==req.body.passw && results[0].PhoneNumber==req.body.phnum && results[0].UserName==req.body.name)
            {
                House.find({})
                .then(function(results){
                    res.render("admin-homepage",{All_listings:results});
                })
                .catch(function(err){
                    console.log(err);
                });
            }
            
    })
    .catch(function(err){
        console.log(err);
    })

})
app.post("/signup",function(req,res)
{
    Host.find({$or: [ { Email: req.body.email }, { UserName: req.body.name } ]})
    .then(function(results){
        if(results.length!=0){
            alert("Account already exists! please login");
            res.render("signup");
        }
        else if(req.body.password == req.body.confirmpassword){  
            Host.create({
                UserName:req.body.name,
                PhoneNumber:req.body.phnum,
                Email:req.body.email,
                password:req.body.password
            })
            .then(function(){
                res.render("login");
            })
            .catch(function(err){
                console.log(err);
            }) 
            }
            else
            {
               res.render("Signup");
            }
    });
    
    
});
app.post("/login",async(req,res)=>
{
    Host.find({Email:req.body.email})
    .then(async(results)=>
    {        
            if(results.length === 0)
            {
                alert("Incorrect UserEmail / U dont have account");
                res.render("login")
                
            }
            else if(results[0].password==req.body.passw)
            {
               
                objtot.HostUserName=results[0].UserName;
                req.session.Hostid= results[0].UserName;
                
                const houseinfo=[];
                 const hsin=(await House.find({'Host.0.HostUserName': { $eq: req.session.Hostid }})).forEach((house)=>{
                houseinfo.push(house);
    });
    res.render('p12h',{houseinfo});
            }
            else
            {
                alert("Incorrect Password");
                res.render("login")
            }
    })
    .catch(function(err){
        console.log(err);
    })

})
app.post("/signupg",function(req,res)
{
    Guest.find({$or: [ { Email: req.body.email }, { UserName: req.body.name } ]})
    .then(function(results){
        if(results.length!=0){
            alert("Account already exists! please login");
            res.render("signupg");
        }

    else if(req.body.password == req.body.confirmpassword){
        Guest.create({
            UserName:req.body.name,
            PhoneNumber:req.body.phnum,
            Email:req.body.email,
            password:req.body.password
        })
    .then(function(){
        res.render("guest-homepage");
    })
    .catch(function(err){
        console.log(err);
    }) 
    }
    else
    {
       res.render("Signupg");
    }
  });
});
app.post("/loging",function(req,res)
{
    Guest.find({Email:req.body.email})
    .then(function(results)
    {        
            if(results.length === 0)
            {
                alert("Incorrect UserEmail");
                res.render("loging")
                
            }
            else if(results[0].password==req.body.passw)
            {
                res.render("guest-homepage");
            }
            else
            {
                alert("Incorrect Password");
                res.render("loging")
            }
    })
    .catch(function(err){
        console.log(err);
    })

})
app.post("/p2h",function(req,res){
    objtot.PropertyType=req.body.option;
    console.log(objtot);
     res.render("p3h");
 })
app.post("/p3h",function(req,res){
    objtot.RoomType=req.body.btn;
    console.log(objtot);
     res.render("p4h");
})
app.post("/p4h",function(req,res){
    objtot.Address={
        "Line1":req.body.street,
        "Line2":req.body.flat,
        "District":req.body.city,
        "State":req.body.state,
        "Pincode":req.body.code
    }
    
   console.log(objtot);
   res.render("p5h");
})

app.post("/p5h",function(req,res){
    objtot.MaxGuests=req.body.guests;
    objtot.Bedrooms=req.body.bedroom;
    objtot.Bathrooms=req.body.bathroom;
    console.log(objtot);
    res.render("p6h");
 })
 app.post("/p6h",function(req,res){
    objtot.Facilities = req.body.chkboxs;
    console.log(objtot);
    res.render("p7h");
 })
 const uploadDir = path.join(__dirname, 'uploads', 'images-' + Date.now());
 
 
 if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true });
 }
 
 
 const upload = multer({ dest: uploadDir });
 
 app.post('/p7h',  upload.array('images'), (req, res) => {
      
   if (!req.files || req.files.length === 0) {
     return res.status(400).send('No files were uploaded.');
   }
 

   const files = req.files.map(file => ({
     name: file.originalname,
     path: file.path,
   }));
   objtot.img_url1=files[0];
   objtot.img_url2=files[1];
   objtot.img_url3=files[2];
   objtot.img_url4=files[3];
   objtot.img_url5=files[4];
   console.log(objtot);
   res.render('p8h')
 });
 
 app.post("/p8h",function(req,res){
    objtot.Title=req.body.txtar;
    console.log(objtot);
    res.render("p9h");
 })
 app.post("/p9h",function(req,res){
    objtot.Desc1=req.body.txtarr;
    console.log(objtot);
    res.render("p10h");
 })
 app.post("/p10h",function(req,res){
    objtot.CostPerN=req.body.valueinput;
    console.log(objtot);
    res.render("congo");
})


app.post("/congo",async(req,res)=>{
    console.log(objtot);
const path1 = objtot.img_url1.path;
const path2 = objtot.img_url2.path;
const path3 = objtot.img_url3.path;
const path4 = objtot.img_url4.path;
const path5 = objtot.img_url5.path;
const startIndex = path1.indexOf("uploads");
const trimmedPath1 = path1.substring(startIndex); 
const trimmedPath2 = path2.substring(startIndex); 
const trimmedPath3 = path3.substring(startIndex);
const trimmedPath4 = path4.substring(startIndex);
const trimmedPath5 = path5.substring(startIndex);


    House.create({
        
        img_url1:trimmedPath1,
        img_url2:trimmedPath2,
        img_url3:trimmedPath3,
        img_url4:trimmedPath4,
        img_url5:trimmedPath5,
        Title:objtot.Title,
        Address:[objtot.Address],
        Desc1:objtot.Desc1,
        CostPerN:objtot.CostPerN,
        Bedrooms:objtot.Bedrooms,
        Bathrooms:objtot.Bathrooms,
        PropertyType:objtot.PropertyType,
        RoomType:objtot.RoomType,
        Host:{
            HostUserName:objtot.HostUserName
        },
        MaxGuests:objtot.MaxGuests,
        Facilities:[objtot.Facilities]

    })
    res.render('login');
})
app.post('/prof',async(req,res)=>{
    const Hostinfo=[];
    const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
        Hostinfo.push(Hostie)
    });
    res.render('profile',{Hostinfo});
})
app.post('/reset',async(req,res)=>{
    const Hostinfo=[];
    const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
        Hostinfo.push(Hostie)
    });
    res.render('profile',{Hostinfo});
})
app.get('/p12h',async(req,res)=>{
    const houseinfo=[];
    const hsin=(await House.find({'Host.0.HostUserName': { $eq: req.session.Hostid }})).forEach((house)=>{
        houseinfo.push(house);
    });
    res.render('p12h',{houseinfo});
})
app.get('/profile',async(req,res)=>{
    const Hostinfo=[];
    const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
        Hostinfo.push(Hostie)
    });
    res.render('profile',{Hostinfo});
})


app.listen(3000,function(){
    console.log("server has started at port 3000.");
});

