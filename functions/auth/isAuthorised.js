// opts:{ hasRole: Array<'admin' | 'manager' | 'user'>, allowSameUser?: boolean}
const isAuthorized = (opts) => {
  return (req, res, next) => {
    const {role, email, uid} = res.locals;
    const {id} = req.params;
    if (email === process.env.ADMIN_EMAIL) return next();
    if (opts.allowSameUser && id && uid === id) return next();

    if (!role) return res.status(403).send();

    if (opts.hasRole.includes(role)) return next();

    return res.status(403).send();
  };
};
module.exports = isAuthorized;
