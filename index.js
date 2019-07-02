const line = require('@line/bot-sdk');
const {
	getMoment,
	getWeekOfMonth,
	Monday,
	Tuesday,
	Wednesday,
	Saturday,
} = require('./utils/date');

const client = new line.Client({
	channelAccessToken: process.env.ACCESS_TOKEN
});

const info = {
	burnable: {
		message: '明日は燃やすゴミの日です',
		days: [Wednesday, Saturday],
		weeks: [],
	},
	unburnable: {
		message: '明日は燃やさないゴミの日です',
		days: [Tuesday],
		weeks: [2, 4],
	},
	recyclable: {
		message: '明日は資源ゴミの日です',
		days: [Monday],
		weeks: [],
	},
};

const isDateDay = (date, days = []) => {
	return days.includes(date.day());
};

const isWeekDay = (date, weeks = []) => {
	const weekOfMonth = getWeekOfMonth(date);
	return weeks.length > 0 ? weeks.includes(weekOfMonth) : true;
};

const isTrashDay = (date, obj) => {
	return isDateDay(date, obj.days) && isWeekDay(date, obj.weeks);
};

const getMessage = date => {
	let message = undefined;
	Object.keys(info).forEach(key => {
		const obj = info[key];
		if (isTrashDay(date, obj)) message = obj.message;
	});
	return message;
};

exports.handler = async event => {
	const tomorrow = getMoment().add(1, 'days');
	const message = getMessage(tomorrow);

	if (message) {
		const postMessage = {
			type:'text',
	        text: message,
		}
		try {
			const result = await client.pushMessage(process.env.USER_ID, postMessage);
		} catch (error) {
			console.log(error)
		}
		
		return {
			statusCode: 200,
			body: JSON.stringify(postMessage)
		};
	}
	
	return {
		statusCode: 200
	}
};
