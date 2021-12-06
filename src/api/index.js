import axios from "axios";
export const uploadImg = async (selectedFile) => {
    try {
        const { data } = await axios.get('http://localhost:3000/dev/getpsUrl', { headers: { key: selectedFile.name, type: selectedFile.type } })
        await axios.put(data, selectedFile, { headers: { "Content-Type": selectedFile.type } })
    } catch (error) {
        console.log(error);
    }
}