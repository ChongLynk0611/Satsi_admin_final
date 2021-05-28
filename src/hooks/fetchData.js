
const fetchData = async (apiFunction, setState) => {
    try {
        const response = await apiFunction();
        console.log(response);
        setState(response);
    } catch (error) {
        console.log("failed fetch : ", error);
    }
}

export default fetchData;
