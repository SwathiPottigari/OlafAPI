require('dotenv').config();

module.exports = function sendMsg(customerInfo) {
    console.log("Called Twilio");
    const twilio = require('twilio');
    return new Promise ((resolve,reject)=>{
        var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
        var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
        var msgStr = `Hello ${customerInfo.Customer.firstName},here is your task list from Battleist\n`;
        console.log("I M... ", accountSid);
    
        var client = new twilio(accountSid, authToken);
    
            var notifyMsg = client.messages.create({
                body: msgStr,
                to: CustomerInfo.Customer.phone,
                from: process.env.TWILIO_PHONENUMBER
            })
            resolve(notifyMsg)
    })
}
