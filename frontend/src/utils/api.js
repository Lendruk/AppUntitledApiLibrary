import axios from 'axios';
import { showToast } from '../components/Toast';

// API URL
const API_URL = "http://localhost:4000/api/"

// Header generator
const genRequestHeader = () => ({
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}` || '',
		source: 'web',
		'Accept-language': localStorage.getItem("token") || "en",
	},
});

const handleError = async err => {
	try {
		if (err && err.response && err.response.status) {
			if (err.response.status === 401) {
				return err;
			}
			if (err.response.status === 503) {
				return err;
			}
			if (err.response.status === 404) {
				showToast("ERROR", err.response.data.code);
				return err;
			}
			if (err.response.data.code || (err.response.data.error && err.response.data.error.code)) {
				showToast("ERROR", err.response.data.message)
			} else {
				if (err.response && err.response.status === 404) return err;
				showToast("ERROR", err.response.data.code.message);
			}
			return err;
		}
		return err;
	} catch (err) {
		return err;
	}
};

export const post = (url, body, header = genRequestHeader()) =>
	new Promise((resolve, reject) => {
		axios
			.post(API_URL + url, body, header)
			.then(response => {
				resolve(response);
			})
			.catch(async err => {
				reject(await handleError(err));
			});
	});

export const put = (url, body, header = genRequestHeader()) =>
	new Promise((resolve, reject) => {
		axios
			.put(API_URL + url, body, header)
			.then(response => {
				resolve(response);
			})
			.catch(async err => {
				reject(await handleError(err));
			});
	});

export const remove = (url, header = genRequestHeader()) =>
	new Promise((resolve, reject) => {
		axios
			.delete(API_URL + url, header)
			.then(response => {
				resolve(response);
			})
			.catch(async err => {
				reject(await handleError(err));
			});
	});

export const get = (url, header = genRequestHeader()) =>
	new Promise((resolve, reject) => {
		axios
			.get(API_URL + url, header)
			.then(response => {
				resolve(response);
			})
			.catch(async err => {
				reject(await handleError(err));
			});
	});

export const patch = (url, body, header = genRequestHeader()) =>
	new Promise((resolve, reject) => {
		axios
			.patch(API_URL + url, body, header)
			.then(response => {
				resolve(response);
			})
			.catch(async err => {
				reject(await handleError(err));
			});
	});