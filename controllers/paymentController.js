const Razorpay = require('razorpay') 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env

const nodemailer=require('nodemailer');
const shopUser = require('../models/shopUser');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailserver.com',
    port: 2525,
    auth: {
        user: 'lucky639kumar@gmail.com',
        pass: 'Spa{1020}rsh'
    }
});



const razorpayInstance = new Razorpay({
    key_id: "key_id",
    key_secret: "key_secret"
});

const renderProductPage = async(req,res)=>{

    try {
        
        res.render('product');

    } catch (error) {
        console.log(error.message);
    }

}

const createOrder = async(req,res)=>{
    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    console.log(req.body)
                    console.log(order)

                    let user;
                    shopUser.findById(req.body.userId).then(user=>{
                        user=user
                    }).catch(err=>{
                        console.log(err)
                    })
                        
                    const text={
                        name:req.body.name,
                        productname:req.body.productname,
                        mobileNo:req.body.mobile_number,
                        orderId: order.id
                    }
                    const jsondata=JSON.stringify(text,null,2);
                    const mailOptions={
                        from:'lucky639kumar@gmail.com',
                        to:'',
                        subject:'Order Email',
                        text:jsondata

                    }
                    transporter.verify(function (error, success) {
                        if(error) {
                            console.log(error);
                        } else {
                            console.log('Server validation done and ready for messages.')
                        }
                    });
                    transporter.sendMail(mailOptions,function(error,info){
                        if(error){
                            console.log("Error occured : ",error.message)
                        }else{
                            console.log('Email sent successful')
                            console.log('Message ID: ',info.messageId)
                        }
                    })
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:"key_id",
                        product_name:req.body.productname,
                        contact:"8567345632",
                        name: "Sandeep Sharma",
                        email: "sandeep@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    renderProductPage,
    createOrder
}