
 const fetchData = async (apiFunction, setState) => {
    try {
        const response = await apiFunction();
        console.log(response);
        setState(response);
    } catch (error) {
        console.log("failed fetch : ", error);
    }
}

const fetchDataById = async ( apiFunction, setState, id) => {
    try {
        const response = await apiFunction(id);
        console.log(response);
        setState(response);
    } catch (error) {
        console.log("failed fetch Data: ". error);
    }
}

exports fetchData;
exports fetchDataById;
