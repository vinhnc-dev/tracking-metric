export function convertDistance(value: number, fromUnit: string, toUnit: string): number {
  const conversionRates = {
      meter: {
          meter: 1,
          centimeter: 100,
          inch: 39.3701,
          feet: 3.28084,
          yard: 1.09361
      },
      centimeter: {
          meter: 0.01,
          centimeter: 1,
          inch: 0.393701,
          feet: 0.0328084,
          yard: 0.0109361
      },
      inch: {
          meter: 0.0254,
          centimeter: 2.54,
          inch: 1,
          feet: 0.0833333,
          yard: 0.0277778
      },
      feet: {
          meter: 0.3048,
          centimeter: 30.48,
          inch: 12,
          feet: 1,
          yard: 0.333333
      },
      yard: {
          meter: 0.9144,
          centimeter: 91.44,
          inch: 36,
          feet: 3,
          yard: 1
      }
  };

  const valueInMeters = value * conversionRates[fromUnit]['meter'];
  const convertedValue = valueInMeters / conversionRates[toUnit]['meter']; 
  return convertedValue;
}

export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) {
      return value;
  }

  switch (fromUnit) {
      case 'C':
          if (toUnit === 'F') return (value * 9/5) + 32;
          if (toUnit === 'K') return value + 273.15;
          break;
      case 'F':
          if (toUnit === 'C') return (value - 32) * 5/9;
          if (toUnit === 'K') return (value - 32) * 5/9 + 273.15;
          break;
      case 'K':
          if (toUnit === 'C') return value - 273.15;
          if (toUnit === 'F') return (value - 273.15) * 9/5 + 32;
          break;
      default:
          throw new Error('Invalid temperature unit.');
  }
}