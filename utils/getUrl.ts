import { storage } from "@/appwrite";
import { Image } from "@/typing";

const getUrl=async(image:Image)=>{
    const url=storage.getFilePreview(image.buckerId,image.fileId);
    return url;
}
export default getUrl;