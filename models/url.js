const mongoose = require('mongoose')
const slugify = require('slugify')

const urlSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

urlSchema.pre('validate', function (next) {
    if (this.link) {
        const mod = slugify(this.link, { lower: true, strict: true });
        function stripa(text) {
            const a = text.includes('https');
            const b = text.includes('http');
            const c = text.includes('www');
            if (a) {
                text = text.slice(5)
                if (c) {
                    text = text.slice(3)
                }
            } else if (b) {
                text = text.slice(4)
                if (c) {
                    text = text.slice(3)
                }
            } else if (c) {
                text = text.slice(3);
            }
            return text;
        }
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array
        }
        let newUrl = stripa(mod);
        newUrl = shuffle(newUrl.split('')).join('')
        if (newUrl.length > 6) {
            newUrl = newUrl.slice(-6)
        }
        this.slug = newUrl;
    }
    next()
});

module.exports = mongoose.model('Url', urlSchema);