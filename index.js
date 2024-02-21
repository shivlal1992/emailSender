const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//create the middleware for the parsing requested bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//define to the server that the static files are stored inside the public folder.

app.use(express.static('public'));

//defining the route for home page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/send-email.html');
});


//configure nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'azadshiv1992@gmail.com',
        pass: 'commmuepszfoobeo',
    }
});

//create the route for the form
app.post('/send-email',(req,res)=>{
    const {to, subject,text}=req.body;

    const mailOptions = {
        from:'azadshiv1992@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions,(error,infor)=>{
        if(error){
            console.log(error);
            res.status(500).send('Error in sending mail');
        }
        else{
            console.log('Email Send: '+infor.response);
            res.send('Email send successfully!');
        }
    });

});


//start ther server
app.listen (port,()=>{
    console.log(`server is running on the port ${port}`);
});