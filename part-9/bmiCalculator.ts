
export default function bmiCalculator(heightArg: number, weightArg: number): string {
    const BMI: number = (weightArg / heightArg / heightArg) * 10000;

    let messageText: string = '';

    if(BMI < 18.5) {
        messageText = "Underweight";
    } else if (BMI > 18.5 && BMI < 24.9) {
        messageText = "Normal(healthy weight)";
    } else if (BMI > 25 && BMI < 29.9) {
        messageText = "Overweight";
    }
    return messageText;
}