export const authorization = (...roles) =>{
    return (req, res, next) =>{
       const user= req.user.user
       if(!req.user) return res.status(401).send("Unautorized (req.user undefined)")

        const userRole = user.role.toUpperCase();
        const authorizedRoles = roles.map(role => role.toUpperCase());
        
        if (authorizedRoles.includes('PUBLIC')) return next();
        if (!authorizedRoles.includes(userRole.toUpperCase())) {
            return res.status(401).send({ status: 'error', error: 'Unautorized (incorrect role), ' + userRole });
        }
        next()
    }
}
