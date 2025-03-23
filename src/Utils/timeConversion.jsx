export const convertDateTime = (date) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	
	const dateObj = new Date(date);
	
	const localDate = new Date(
	  dateObj.getUTCFullYear(),
	  dateObj.getUTCMonth(),
	  dateObj.getUTCDate()
	);
	
	return localDate.toLocaleDateString(undefined, options);
  }