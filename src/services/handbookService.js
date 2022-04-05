import db from '../models/index';
require('dotenv').config();

let createNewHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.author ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                });
            } else {
                await db.Handbook.create({
                    name: data.name,
                    author: data.author,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                });
            }
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                });
            } else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: [
                        'name',
                        'author',
                        'descriptionHTML',
                        'descriptionMarkdown',
                        'createdAt',
                        'updatedAt',
                    ],
                });
                resolve({ errCode: 0, errMessage: 'ok', data });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNewHandbook,
    getAllHandbook,
    getDetailHandbookById,
};
