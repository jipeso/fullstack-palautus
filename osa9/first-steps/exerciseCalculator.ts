import { isNotNumber } from './utils/helper';

interface exerciseValues {
  exerciseHours: number[],
  target: number
}

interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


const parseArgumentsExerciseCalculator = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numbers = args.slice(2).map(Number);

  if (numbers.some(isNotNumber)) {
    throw new Error('Provided values were not numbers!');
  }

  const target = numbers[0];
  const exerciseHours = numbers.slice(1);

  return {
    exerciseHours,
    target
  };
};

const resultRating = (average: number, target: number) : {rating: number, ratingText: string} => {
  let rating: number;
  let ratingText: string;

  const diff = average - target;

  if (diff < -1) {
    rating = 1;
    ratingText = 'did not meet the target';
  } else if (diff >= -1 && diff < 1) {
    rating = 2;
    ratingText = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingText = 'good job';
  }

  return { rating, ratingText };
};

const calculateAverage = (exerciseHours: number[]) : number => {
  const total = exerciseHours.reduce((sum, hours) => sum + hours, 0);
  return total / exerciseHours.length;
};

export const calculateExercises = (exerciseHours: number[], target: number) : ExerciseResult => {
  const average = calculateAverage(exerciseHours);
  const { rating, ratingText } = resultRating(average, target);

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(h => h > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingText,
    target: target,
    average: average
  };
};

if (require.main === module) {
  try {
    const { exerciseHours, target } = parseArgumentsExerciseCalculator(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }  
};
