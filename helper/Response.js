
class response {
	badValues(res) {
		return res.status(400).json({ message: "Bad Values" });
	}
	errorInternal(error, res) {
		console.error('error occured on ' + (new Date()).toISOString());
		console.error(error);
		return res.status(500).json({ message: "Oops! Error Occured", error: error });
	}
	success(res, data, message) {
		if (!message) {
			return res.json({ message: "Operation Successful", data: data })
		} else {
			return res.json({ message: message, data: data });
		}
	}
	message(res, status, message) {
		return res.status(status).json({ message: message });
	}
	notAuthorized(res, message) {
		if (!message) {
			return res.status(405).json({ message: "You're not authorized" })
		} else {
			return res.status(405).json({ message: message });
		}
	}
	notFound(res, message) {
		return res.status(404).json({ message: message });
	}
	signout(res) {
		return res.status(401).json({ message: "Please Log in again" });
	}
	render(res, location){
		console.log(location);
		return res.render(location);
	}
}

response = new response();
module.exports = response;