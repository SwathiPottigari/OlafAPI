require('dotenv').config();
const twilio = require('twilio');
module.exports = function sendMsg(customerInfo) {
    console.log("Called Twilio");
   console.log(customerInfo);
    return new Promise ((resolve,reject)=>{
        var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
        var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
        let order = customerInfo[2];
        let orderStr =""
        for ( let i = 0; i < order.length; i++){
            orderStr + order[i].dish +":"
        }
        var msgStr = `Thank you for placing your order with Olaf ${customerInfo[0].Customer.firstName},here is your order detail \n ${customerInfo[2].Orders.dish}: ${customerInfo[2].Orders.qty}`;
        
        
        console.log("I M... ", accountSid);
    
        var client = new twilio(accountSid, authToken);
    
            var notifyMsg = client.messages.create({
                body: msgStr,
                to: customerInfo[0].Customer.contact,
                from: process.env.TWILIO_PHONENUMBER
            })
            resolve(notifyMsg)
    })
}
