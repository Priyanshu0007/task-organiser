import { ID, storage } from "@/appwrite"

const uploadImage=async (file:File)=>{
    if(!file){return}
    const fileUploaded=await storage.createFile(
        "650443ead234056e6f9b",
        ID.unique(),
        file
    );
    return fileUploaded;
}
export default uploadImage;