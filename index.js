const express = require('express');
const port = 9000;
const path = require('path');


const db = require('./config/mongoose');

const Contact = require('./models/contacts');

const app = express();


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// create contact list
var contactList = [
{
    name: 'shoumo',
    phone: '1651545247',
},

{
    name: 'lina',
    phone: '651545247',

},
{

name: 'soumyo',
phone: '11545247',

},
{
name: 'joy',
phone: '1545247',
}

]

// app.get('/', function(req, res){
//     // console.log(__dirname);
//     // res.send("<h1> it is running</h1>")
//     return res.render('home', {
//         title:"my contact lists",
//         contact_list : contactList
//     });
// });


// // show the contact list
// app.get('/', async function(req, res){
//     try{
//         Contact.find({},function(req , contacts){
//             return res.render('home', {
//             title:"my contact lists",
//             contact_list : contacts,
    
//         });
        
//     })}
//     catch(err){  
//         console.log('error in fetching contact');
//         return res.status(500).send('Error in creating a contact!');
//         ;
//     };
    
// });

// // show the contact list
app.get('/', function(req, res){


    Contact.find({}, function(err, contact){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contact
        });

    })
  
});

// go to practice page
app.get('/practice', function(_req, res){
 
    return res.render('practice', {
        title:"this is the contact",
        
    });
});

// creating a new contact code for (mongoose version 7)
// app.post('/create-contacts', async function(req, res) {
//     try {
//       const newContact = await Contact.create({
//         name: req.body.name,
//         phone: req.body.phone
//       });
//       console.log('******', newContact);
//       return res.redirect('back');
//     } catch (err) {
//       console.log('Error in creating a contact!', err);
//       return res.status(500).send('Error in creating a contact!');
//     }
//   });

// creating a new contact 
app.post('/create-contacts', function(req, res){
     
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});



// deleting the contact
app.get('/delete-contact/', function(req, res){

    // get the query from the url
    console.log(req.query);
    // get the id from queary in the url

    let id = req.query.id;
    // find the contact in the db using id and delete and back
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting from db');
            return;
        }
        return res.redirect('back');


    });
 
});


app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});
