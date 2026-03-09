
const useMonth = (dateString) => {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  return ` ${day}, ${month} ${year}`;
};

export default useMonth
