import handbookService from '../services/handbookService';

let createNewHandbook = async (req, res) => {
    try {
        let info = await handbookService.createNewHandbook(req.body);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errorMessage: 'Error from server...',
        });
    }
};

let getAllHandbook = async (req, res) => {
    try {
        let info = await handbookService.getAllHandbook();
        return res.status(200).json(info);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errorMessage: 'Error from server...',
        });
    }
};

let getDetailHandbookById = async (req, res) => {
    try {
        let info = await handbookService.getDetailHandbookById(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errorMessage: 'Error from server...',
        });
    }
};

module.exports = {
    createNewHandbook,
    getAllHandbook,
    getDetailHandbookById,
};
