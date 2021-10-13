const fs = require('fs');

module.exports = {
    welcome: ()=>{
        const welcomeTemplate = fs.readFileSync('./welcome.html', 'utf8');
        return welcomeTemplate;
    }
}
