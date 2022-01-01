interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number 
}

const calculateExercises = (arr: Array<number>, exerciseTarget: number): Result => {
    const hoursAverage = (arr.reduce((a: number, b: number) => a + b)) / arr.length;
    
    const obj: Result = {
        periodLength: arr.length,
        trainingDays: (arr.filter(val => val > 0)).length,
        success: hoursAverage > exerciseTarget ? true : false,
        rating: exerciseTarget,
        ratingDescription: "Somestring",
        target: exerciseTarget,
        average: hoursAverage
    }
    return obj;
}

export default calculateExercises;

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));