export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0'); // Get day (1-31) and pad with '0' if single-digit
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-11) and add 1 for (1-12), then pad with '0'
  const year = date.getFullYear(); // Get the full year (e.g., 2023)

  return `${day}/${month}/${year}`;
};

// Declare endDate as a week later from startDate
export const aWeekLaterDate = new Date().setDate(new Date().getDate() + 5);
