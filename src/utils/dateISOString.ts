const dateISOString = (date: string | Date) => {
    let toDateObj = new Date(date);
    const completeDateISOString = toDateObj.toISOString();
    const lastIndexOfDash = completeDateISOString.lastIndexOf("-");
    const day =
        toDateObj.getDate() > 10
            ? toDateObj.getDate()
            : "0" + toDateObj.getDate();

    return `${completeDateISOString.substring(0, lastIndexOfDash)}-${day}`;
};

export default dateISOString;
