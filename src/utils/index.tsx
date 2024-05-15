export const extractChartData = (rawData: any) => {
  if (!rawData.map) {
    return { xAxisLabels: [], data: [] };
  }

  const tempXAxisLabels = rawData?.map((price: any) =>
    new Date(price[0])?.toDateString()
  );

  const tempHistoricalPriceData = rawData?.map((price: any) => ({
    shadowH: parseFloat(price[2]),
    shadowL: parseFloat(price[3]),
    open: parseFloat(price[1]),
    close: parseFloat(price[4]),
  }));

  return {
    xAxisLabels: tempXAxisLabels,
    data: tempHistoricalPriceData,
  };
};
