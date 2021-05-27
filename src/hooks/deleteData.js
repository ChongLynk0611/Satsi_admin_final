
const deleteData = async (apiFunction, setState, id) => {
    try {
        const response = await apiFunction(id);
        setState(response.data);
        alert("Xóa thành công");
    } catch (error) {
        console.log("failed delete : ", error);
    }
}

export default deleteData;