const getHome = (req, res, next) => {
    let name = 'golaa';
    let date = new Date();
    console.log(name, date);
    next()
}

const authrise = (req, res, next) => {
    const { user } = req.query;
    if (user === 'jone') {
        req.user = {name : user, id: 3}
    } else {
        res.send('Unautharise')
    }
    next()
}




module.exports = { getHome, authrise }