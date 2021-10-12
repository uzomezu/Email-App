export default (req,res)=>{
    res.status(200).json({
        'name': 'Kevin',
        'favorite' : {
            'drink': 'sprite',
            'food': '2 Cheeseburger',
        },
        'about' : "This is a random statement about nothing and is used simply for test purposes. Enjoy!"
    });
}