interface bmiValues {
  height: number,
  weight: number
}

const parseArgumentsBmi = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height/100)**2;
  let result : string;

  if (bmi < 18.5)
    result = 'Underweight';
  else if (bmi >= 18.5 && bmi < 25)
    result = 'Normal range';
  else if (bmi >= 25 && bmi < 30)
    result = 'Overweight';
  else
    result = 'Obese';

  return result;
}

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
