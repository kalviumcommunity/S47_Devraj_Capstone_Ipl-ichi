const otplib = require('otplib');
const nodemailer = require('nodemailer');

async function sendOtp(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'team.iplichi@gmail.com',
            pass: 'eozu uvmu ajgt mdqc'
        }
    });

    const secret = "devraj@2006";

    // Generate OTP using otplib
    const otp = otplib.authenticator.generate(secret);

    const mailOptions = {
        from: 'team.iplichi@gmail.com',
        to: email,
        subject: 'Order confirmed',
        text: `Dear user, 
        Your order is confirmed and will be with you in 30 minutes. Your OTP is ${otp}. 
        
        {Please do not share this otp with anyone.}`
    };

    console.log(mailOptions);

    const otpsent = await transporter.sendMail(mailOptions);
    console.log(otpsent);
}

module.exports = sendOtp;