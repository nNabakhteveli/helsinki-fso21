import express from 'express';
import bmiCalculator from './bmiCalculator';


const app = express();

app.get('/bmi', (req, res) => {
    if(Object.keys(req.query).length === 2) {
        if(req.query.height !== undefined && req.query.weight !== undefined) {
            res.json({
                height: +req.query.height,
                weight: +req.query.weight,
                bmi: bmiCalculator(+req.query.height, +req.query.weight)
            });
        }
    } else {
        res.json({
            error: "malformatted parameters"
        });
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})