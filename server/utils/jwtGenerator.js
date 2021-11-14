const jwt = require('jsonwebtoken');
const { TOKEN } = require('../config');

function jwtGenerator(uid) {
	const payload = {
		user: {
			id: uid
		}
	}

	return jwt.sign(payload, TOKEN, { expiresIn: '1hr' })
}

module.exports = jwtGenerator;