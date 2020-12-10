// controllers.js is for my
// route handler functions

const models = require('./models');

const home = (req, res) => {
    // res.json({
    //     totalNumber: models.totalNumber(),
    //     totalAmount: models.totalAmount()
    // });
    res.render('home', {
        locals: {
            totalNumber: models.totalNumber(),
            totalAmount: models.totalAmount()
        }, partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }
    })
}

const orderList = (req, res) => {
    // provide list of kinds of orders

    // then, for each kind, add the total amount spent
    // hmmmm....I need an object that looks like this:
    /* 
    {
        'espresso': 96.16,
        'black coffee': ...
    }
    I could write a model function for this, but...
    we know how to do this :)
    */
   const orderTypes = models.orderTypes();
   const pricePerType = {};
   for (let t of orderTypes) {
       // t will be 'espresso' or 'black coffee' or ...
       // as the for loop works through the types
       pricePerType[t] = models.totalAmountForType(t)
       // we add t as a new property, and assign it
       // the result of getting the total for that type
   }

//    res.json({
//     // orderTypes is an array of strings: ['espresso', 'latte'...]
//     orderTypes: orderTypes, // we've already called the function
//                             // just use the var
//     pricePerType,
// });
    res.render('list', {
        locals: {
            // orderTypes is an array of strings: ['espresso', 'latte'...]
            orderTypes: orderTypes, // we've already called the function
                                    // just use the var
            pricePerType,
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }
    })

    // Options: I can create the HTML strings here
    // or I can do this in the template...
    // Let's do this in the template.
    // 1. show the list of orderTypes
    // 2. look up the total $$ spent on that type

    // I want: <li>espresso</li>
}

// A controller is just a (req, res) => {}
const orderDetails = (req, res) => {
    // This controller should send back...
    // all the order objects for a 
    // particular kind. (I think lol)

    // and how do I even get to this route?
    //res.send('does this fn work at all?');

    // after creating the href in the list view
    // I'm going to send back the 
    // results of models.ordersByType()
    const orderType = req.params.orderType;
    // res.json({
    //     orderType,
    //     // orders is an array of objects...
    //     // but I only need the cost...
    //     orders: models.ordersByType(orderType) // need an argument!
    //                   .map(o => o.cost) // pluck out the .cost
    // });
    // Now to create the template
    // It'll be similar to my list.html
    // We want:
    /*
    <h3>espresso</h3>
    <ul>
        <li>$2.44</li>
        <li>$1.46</li>
        ...
    </ul>
    */
   // haha I need to res.render()
   res.render('details', {
       locals: {
            orderType,
            // orders is an array of objects...
            // but I only need the cost...
            orders: models.ordersByType(orderType) // need an argument!
                        .map(o => o.cost) // pluck out the .cost
        },
        partials: {
            header: '/partials/header',
            footer: '/partials/footer',
        }
   })

};


module.exports = {
    home,
    orderList,
    orderDetails
};