require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"HealthCare - Thọ Ngô" <ngotho.3620@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: 'Thông tin đặt lịch khám bệnh', // Subject line
        html: getBodyEmail(dataSend), // html body
    });
};

let getBodyEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên HealthCARE.</p>
        <p>Chi tiết lịch hẹn của bạn:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Bạn vui lòng click vào đường link bên dưới để xác nhận và hoàn tất quá trình đặt lịch khám!</p>

        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div><br>
        <div>Xin chân thành cảm ơn vì đã tin tưởng HealthCARE!</div>
        `;
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on the HealthCare system</p>
        <p>Your appointment details</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>Please clock on the link below to confirm and complete the procedure to book your appointment!</p>

        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div><br>

        <div>Thank you very much for trusting HealthCARE!</div>
        `;
    }
    return result;
};

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"HealthCare - Thọ Ngô" <ngotho.3620@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: 'Thông tin đặt lịch khám bệnh', // Subject line
        html: getBodyEmailRemedy(dataSend), // html body
        attachments: [
            {
                filename: `${new Date().getTime()}-remedy-${dataSend.patientName}.png`,
                content: dataSend.imgBase64.split('base64,')[1],
                encoding: 'base64',
            },
        ],
    });
};

let getBodyEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã hoàn tất quá trình khám bệnh qua HealthCARE.</p>

        <p>Thông tin đơn thuốc/hóa đơn của bạn đã được gửi trong file đính kèm.</p><br>

        <div>Xin chân thành cảm ơn vì đã tin tưởng HealthCARE!</div>
        `;
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you completed your medical examination through HealthCARE</p>

        <p>Your prescription/invoice information has been sent in the attachment.</p><br>

        <div>Thank you very much for trusting HealthCARE!</div>
        `;
    }
    return result;
};

module.exports = {
    sendSimpleEmail,
    sendAttachment,
};
