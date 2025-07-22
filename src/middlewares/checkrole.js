function checkrole(requiredrole){
    return function(req, res, next){
        if(!req.user || requiredrole !== req.user.role ){
            return res.status(400).json({access_denied: `${req.user.role} cant access ${requiredrole} content`})
        }
        next()
    }
}

module.exports = checkrole