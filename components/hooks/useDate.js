const useDate = (time) => {
        const now = new Date();
      const targetTime = new Date(time);
      const timeDifferenceMs = now - targetTime;
    
      const seconds = timeDifferenceMs / 1000;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const days = hours / 24;
      const months = days / 30;
      const years = days / 365;
    
      if (years >= 1) {
        return `${Math.round(years)} year${Math.round(years) > 1 ? "s" : ""} ago`;
      } else if (months >= 1) {
        return `${Math.round(months)} month${Math.round(months) > 1 ? "s" : ""} ago`;
      } else if (days >= 1) {
        return `${Math.round(days)} day${Math.round(days) > 1 ? "s" : ""} ago`;
      } else if (hours >= 1) {
        return `${Math.round(hours)} hour${Math.round(hours) > 1 ? "s" : ""} ago`;
      } else if (minutes >= 1) {
        return `${Math.round(minutes)} minute${Math.round(minutes) > 1 ? "s" : ""} ago`;
      } else {
        return `${Math.round(seconds)} second${Math.round(seconds) !== 1 ? "s" : ""} ago`;
      }
}

export default useDate
