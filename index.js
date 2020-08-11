const express = require('express')
const bodyParser = require('body-parser');

const port = 3000

var app = express()
app.use(bodyParser.json());

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
        res.send({
            "status": "failure"
        })
    }
})


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})