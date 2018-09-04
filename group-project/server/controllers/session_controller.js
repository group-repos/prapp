module.exports = {
    create: (req, res, next) => {
        if (!req.session.user) {
            req.session.user = {
                name: '',
                email: '',
                user_id: '',
                username: '',
                profile_pic: ''
            }
        }
        console.log(req.session.user);
        next();
    }
}

