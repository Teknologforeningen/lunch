const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    message: String,
    language: String
});

const Announcements = mongoose.model('Announcements', announcementSchema);
module.exports = Announcements;