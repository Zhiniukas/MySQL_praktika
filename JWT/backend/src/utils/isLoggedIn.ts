export const isLoggedIn = (req, res, next) => {
    const accessToken = req.headers.authorization;
    const isAuthorized = accessToken; // TODO: JWT validation
  console.log(isAuthorized);
    if (!isAuthorized) {
     return   res.status(401).send({error:"Unauthorized"}).end();
 //     return next("Unauthorized"); // pateikus argumenta iseina is expresso Router (beveik tas pats kaip app)
    }
  
    return next();
  };