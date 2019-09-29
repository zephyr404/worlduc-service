const db = require('../db/index');
const random = require('../utils/random');

var QcloudSms = require("qcloudsms_js");
// 短信应用 SDK AppID
var appid = 1400069861;  // SDK AppID 以1400开头
// 短信应用 SDK AppKey
var appkey = "dffacc5349efd62f78c592976fd3b4b9";
// 短信模板 ID，需要在短信控制台中申请
var templateId = {
	usual: 268856,
	changepwd: 268853,
};  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
// 签名
var smsSign = ["及时行乐", "拉祜野阔", "湖南思洋"];  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
// 实例化 QcloudSms
var qcloudsms = QcloudSms(appid, appkey);
// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
	if (err) {
		console.log("err: ", err);
		ctx.body = {
			status: 'err',
			data: err,
		}
	} else {
		console.log("request data: ", res);
		console.log("response data: ", resData);
		ctx.body = {
			status: 'ok',
			data: res,
		};
	}
}

class SmsController {
	// 用户登录
	async getSms(ctx, next) {
		// 获取请求提交的数据
		let phone = ctx.query.phone || '';
		let type = ctx.query.type || '';
		let _temp = '';

		console.log(phone, type);

		if (phone == undefined || phone == '' || type == undefined || type == '') {
			ctx.body = {
				status: 'error',
				data: 'Not allow empty'
			};
		} else {
			switch (type) {
				case 1:
					_temp = templateId.usual;
					break;
				case 2:
					_temp = templateId.changepwd;
					break;
				default:
					break;
			}

			// 随机生成唯一id
			let smsId = random.randomString(10);
			// 随机验证码
			let params = random.randomNumber(4);
			// 当前时间戳
			let timestamp = Date.parse(new Date()) / 1000;

			let sql = `INSERT INTO sms(id,phone,code,type,time) VALUES("${smsId}","${phone}","${params}","${type}","${timestamp}");`;

			await db.query(sql).then(res => {
				if (res && res.length > 0) {
					console.log(res);
				} else {
					ctx.body = 'Tips[Insert faild]';
				}
			}).catch(e => {
				ctx.body = 'Tips[Insert faild]';
			})

			let ssender = qcloudsms.SmsSingleSender();
			ssender.sendWithParam("86", phone, _temp, params, smsSign[0], "", "", callback);
		}
	}
}

module.exports = new SmsController();