var db = require('./models');
db.user.create({
    name: 'Eliza',
}).then(function() {
    // console.log('created user', user.name);
    // you can now access the newly created task via the variable data
});
