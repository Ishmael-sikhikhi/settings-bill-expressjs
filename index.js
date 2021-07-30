let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const SettingsBill = require('./settings-bill')

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

let app = express();
const settingsBill = SettingsBill()

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {

    res.render("index", {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        color: settingsBill.totalClassName()
    });
})

app.post('/settings', (req, res) => {
    console.log(req.body)

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    })

    res.redirect('/')
})

app.post('/action', (req, res) => {
    settingsBill.recordAction(req.body.actionType)
    res.redirect('/')
})

app.get('/actions', (req, res) => {
    res.render('actions', { actions: settingsBill.actions() })
})

app.get('/actions/:actionType', (req, res) => {
    const actionType = req.params.actionType
    res.render('actions', { actions: settingsBill.actionsFor(actionType) })
})

const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log('App started at port:', PORT)
})