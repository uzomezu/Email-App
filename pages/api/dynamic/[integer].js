export default async (req,res) =>{ 
    let num = req.query.integer;

    if (num > 0){
        let O = 'O';
        res.status(200).send({
            message: `Dino says R${O.repeat(num)}AR`
        });
    } else {
        res.status(401).send({
            message: "Error!: Integer cannot be less than 1"
        });
    }
}