const express = require('express')
const bodyParser = require('body-parser');

const port = 3000

var app = express()
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send({"test":"S"})
})

app.post('/', async (req, res) => {
    try {
        var replacer = function (data, ref) {
            var reg = /{REF_([^}]+)}/g,
                match;
            while (match = reg.exec(data)) {
                data = data.replace(match[0], ref["REF_" + match[1]])
                reg.lastIndex = 0;
            }
            return data;
        }

        var transformedPayload = await replacer(JSON.stringify(req.body.payload), req.body.referenceData);
        res.send(JSON.parse(transformedPayload))

    } catch (error) {
        console.log(error)
        res.send({
            "status": "failure"
        })
    }
})

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`)
    })
}

module.exports = app;