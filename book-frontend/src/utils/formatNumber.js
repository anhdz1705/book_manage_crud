export const formatNumber = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  return new Intl.NumberFormat("vi-VN").format(numericValue);
};

export const formatVnd = (value) => `${formatNumber(value)} VND`;
