import * as express from "express";

let app = express();
app.use(express.static(__dirname + '/public'));
app.get('/api', (req, res, next)=>{
    res.json({
        "pesan": "Halo Dunia! Pesan ini dikirimkan oleh Server API."
    })
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log("Melayani pada port %d di mode %s.", 3000, app.settings.env);
});

module.exports = app;