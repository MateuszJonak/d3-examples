export const data = [
  {
    name: 'Nettopalkka',
    monthlySaving: 200,
    partSalaryNet: 100,
    monthlyAccumulatedSaving: 50,
    currentSavings: 10,
    pensionNet: 20,
  },
  {
    name: 'Eläkeajan toimeentulo',
    monthlySaving: 40,
    partSalaryNet: 30,
    monthlyAccumulatedSaving: 100,
    currentSavings: 200,
    pensionNet: 50,
  },
];

export const keys = Object.keys(data[0]).filter((key) => key !== 'name');

export const translation = {
  monthlySaving: 'Kuukausittainen säästö',
  partSalaryNet: 'Nettopalkasta käytettävissä oleva osa',
  monthlyAccumulatedSaving: 'Kuukausittain kerrytetystä säästöstä',
  currentSavings: 'Nykyisistä säästöistä',
  pensionNet: 'Nettoeläke',
};
