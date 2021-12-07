import axios from "axios";
export const uploadImg = async (selectedFile) => {
    try {
        const { data } = await axios.get('http://localhost:3000/dev/getpsUrl', { headers: { key: selectedFile.name, type: selectedFile.type } })
        await axios.put(data, selectedFile, { headers: { "Content-Type": selectedFile.type } })
    } catch (error) {
        console.log(error);
    }
}

export const frontImg = async (selectedFile) => {
    try {
        console.log(selectedFile)
        const { data } = await axios.get('http://localhost:3000/dev/front', { headers: { key: selectedFile.name, type: selectedFile.type } })
        console.log(data)
        await axios.put(data, selectedFile, { headers: { "Content-Type": selectedFile.type } })
        const res = await axios.get('http://localhost:3000/dev/similarFace', { headers: { key: selectedFile.name } })
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error);
    }

}

