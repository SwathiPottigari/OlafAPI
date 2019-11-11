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
            orderStr = orderStr + order[i].dish +" : "+order[i].orderedQuantity
        }
        console.log("orderStr",orderStr)

        var msgStr = `Thank you for placing your order with Olaf ${customerInfo[0].Customer.firstName},here is your order detail \n ${orderStr} \n ${customerInfo[3].TotalCost}. Pick up your order from ${customerInfo[1].Chef.address} `;
        console.log( "message is ", msgStr)
        var client = new twilio(accountSid, authToken);
    
            var notifyMsg = client.messages.create({
                body: msgStr,
                to: customerInfo[0].Customer.contact,
                from: process.env.TWILIO_PHONENUMBER
            })
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
            orderStr = orderStr + order[i].dish +" : "+order[i].orderedQuantity
        }
        console.log("orderstr",orderStr)
        var msgStr = `Hi Chef ${customerInfo[1].Chef.firstName},a customer has placed an order for \n ${orderStr} \n for total value of ${customerInfo[3].TotalCost}.  ${customerInfo[0].Customer.firstName} will arrive soon to pick up their order.\n If necessary, contact   ${customerInfo[0].Customer.firstName} at  ${customerInfo[0].Customer.contact}  `;
        console.log( "message is ", msgStr)
        var client = new twilio(accountSid, authToken);
    
            var notifyMsg = client.messages.create({
                body: msgStr,
                to: customerInfo[0].Customer.contact,
                from: process.env.TWILIO_PHONENUMBER
            })
            resolve(notifyMsg)
    })
}
