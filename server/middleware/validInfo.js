const createError = require('http-errors');
module.exports = function(req, res, next) {
  const { email,
		password,
		first_name,
		last_name } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

	console.log('valid info')


  if (req.path === '/register') {
    // console.log('email.length');
    // console.log(email.length);
    // console.log('email.length');
    if (![email, password, first_name, last_name].every(Boolean)) {
			throw createError(401, 'Missing Credentials');
    } else if (!validEmail(email)) {
			throw createError(401, 'Invalid Email');
    }
  } else if (req.path === '/login') {
		console.log('inside the login else')
    if (![email, password].every(Boolean)) {
			throw createError(401, 'Missing Credentials');
    } else if (!validEmail(email)) {
			throw createError(401, 'Invalid Email');
    }
  }

  next();
};