//Vamos a recibir como parametro los roles que pueden acceder a un servicio
const authorizationMiddleware = (roles) => {
  return (req, res, next) => {
    //Debemos obtener el rol del usuario que esta haciendo el request
    const userRole = req.user.role;

    //Verificar si el rol del usuario que esta haciendo el request tiene permitido acceder al servicio

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Acces denied" });
    }
    next();
  };
};

export default authorizationMiddleware;
