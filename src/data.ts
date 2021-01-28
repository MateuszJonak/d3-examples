export const data = [
  {
    name: 'Net Salary',
    monthlySaving: 200,
    partSalaryNet: 100,
    monthlyAccumulatedSaving: 50,
    currentSavings: 10,
    pensionNet: 20,
  },
  {
    name: 'Retirement income',
    monthlySaving: 40,
    partSalaryNet: 30,
    monthlyAccumulatedSaving: 100,
    currentSavings: 200,
    pensionNet: 50,
  },
];

export const keys = Object.keys(data[0]).filter((key) => key !== 'name');

export const translation = {
  monthlySaving: 'Monthly savings',
  partSalaryNet: 'Available portion of net salary',
  monthlyAccumulatedSaving: 'Monthly accumulated savings',
  currentSavings: 'Current savings',
  pensionNet: 'Net pension',
};
