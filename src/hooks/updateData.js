
const updateData = async (apiFunction, setState, data, id) => {
    try {
        const response = await apiFunction(id, data);
        setState(response);
        alert("Cập nhật thành công");
    } catch (error) {
        console.log("failed update :" , error);
    }
}

export default updateData;