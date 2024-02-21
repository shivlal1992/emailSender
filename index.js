const express=require('express');
const app= express();
const port = process.env.PORT || 3000;

//CREATE the middileware for the parsing request bodies 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//define to the server that the static files are stored inside the public

app.use(express.static('public'));

//defining the route for home page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/send-email.html');
})

//configure nodemailer
const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'azadshiv1992@gmail.com',
        password:'comm muep szfo obeo'

    }

});

//create the route for 
app.post('/send-email',(req,res)=>{
    const {to,subject,text} =req.body;

    const mailOptions={
        to,
        subject,
        message
    };
    transporter.sendMail(mailOptions,(error,infor)=>{
        if(error){
            console.error(error);
            res.status(500).send('error in sending mail');
        }
        else{
            console.log('email Send:'+ infor.response);
            res.send('email send Successfully');
        }
    });
});


//start the server with specific port
app.listen(port,()=>{
    console.log(`Server is running on port  ${port}`)
});
