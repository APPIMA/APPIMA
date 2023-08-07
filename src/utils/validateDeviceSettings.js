const validateDeviceSettings = ({name, host, port}) => {
	const validHostRegex = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/gi;
	
	let result = [];
	if (!validHostRegex.test(host)) {
		result = [...result, 'Ingrese un host válido']
	}

	const portNumber = parseInt(port, 10);
	if (Number.isNaN(portNumber) || portNumber > 65535 || portNumber < 0) {
		result = [...result, 'Ingrese un puerto válido']
	}

	const cleanName = name.trim();
	if (cleanName.length === 0) {
		result = [...result, 'Ingrese un nombre válido']
	}

	return result;
}

export default validateDeviceSettings;