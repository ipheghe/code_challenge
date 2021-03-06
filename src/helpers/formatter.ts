// helper function to convert currency
const formatter = (amount: number, currency: string) => {
    return amount?.toLocaleString(`en-${currency?.slice?.(0, 2)}`, {
      style: "currency",
      currency,
    });
  };

export default formatter;