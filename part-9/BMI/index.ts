import express from 'express';
import bmiCalculator from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import axios from 'axios';

const app = express();

app.use(express.json());


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

const body = {
    "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
};

axios.post("http://localhost:3003/post-e", body);

app.post("/post-e", (req, res) => {
    if(Object.keys(req.body).length !== 2){
        res.json({
            error: "malformatted parameters"
        });
    } else {
        const arr = req.body.daily_exercises, target = req.body.target;
        res.json(calculateExercises(arr, target));
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})