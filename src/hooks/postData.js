
const postData = async (apiFunction, setState, data) => {
    try {
        const response = await apiFunction(data);
        setState(response);
        alert("Post thành công");
    } catch (error) {
        console.log("failed post: ", error);
    }
}

export default postData;