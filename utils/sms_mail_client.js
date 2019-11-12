require('dotenv').config();
const twilio = require('twilio');
module.exports = function sendMsg(customerInfo) {
   sendMessageCustomer(customerInfo);
   sendMessageChef(customerInfo);
}

function sendMessageCustomer(customerInfo){
    return new Promise ((resolve,reject)=>{
        var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
        var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
        let order = customerInfo[2].Orders;
        console.log("order is ", order)
        let orderStr =""
        for ( let i = 0; i < order.length; i++){
            /* console.log("oedrstr",orderStr + order[i].dish +" : "+order[i].orderedQuantity+"\n" ) */
            orderStr = orderStr + order[i].dish +" : "+order[i].orderedQuantity +"\n"
        }
        console.log("orderStr",orderStr)

        var msgStr = `Hello ${customerInfo[0].Customer.firstName}! Thank you for placing your order with Olaf. Here is your order detail\n${orderStr}\n Your total cost is $${customerInfo[3].TotalCost}. Your order will be available for pickup at:\n${customerInfo[1].Chef.address}\nShould the need arise, you can contact Chef ${customerInfo[1].Chef.firstName} at ${customerInfo[1].Chef.contact}`;
        console.log( "message is ", msgStr)
        var client = new twilio(accountSid, authToken);
    
            var notifyMsg = client.messages.create({
                body: msgStr,
                to: customerInfo[0].Customer.contact,
                from: process.env.TWILIO_PHONENUMBER
            }).then(message=>console.log(message.sid)).catch(error=>console.log(error));
            resolve(notifyMsg)
    })
}


function sendMessageChef(customerInfo){
    return new Promise ((resolve,reject)=>{
        var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
        var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
        let order = customerInfo[2].Orders;
        let orderStr =""
        console.log("order is ", order)
        for ( let i = 0; i < order.length; i++){
           /*  console.log("oedrstr",orderStr + order[i].dish +" : "+order[i].orderedQuantity+"\n" ) */
            orderStr = orderStr + order[i].dish +" : "+order[i].orderedQuantity +"\n"
        }
        console.log("orderstr",orderStr)
        var msgStr = `Hello Chef ${customerInfo[1].Chef.firstName}! A customer has placed an order for\n${orderStr}\nat a $${customerInfo[3].TotalCost} total. Your customer will arrive soon to pick up their order.\nShould the need arise, contact ${customerInfo[0].Customer.firstName} at ${customerInfo[0].Customer.contact}`;
        console.log( "message is ", msgStr)
        var client = new twilio(accountSid, authToken);
    
            var notifyMsg = client.messages.create({
                body: msgStr,
                to: customerInfo[1].Chef.contact,
                from: process.env.TWILIO_PHONENUMBER
            }).then(message=>console.log(message.sid)).catch(error=>console.log(error));
            resolve(notifyMsg)
    })
}
