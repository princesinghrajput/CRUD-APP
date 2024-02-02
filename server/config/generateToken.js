const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    return jwt.sign({id}, "prince", {
        expiresIn: '3d'
    })
}

module.exports=generateToken;