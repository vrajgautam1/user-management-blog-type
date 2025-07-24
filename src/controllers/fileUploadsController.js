module.exports.uploadFile = (req, res)=>{
    try {
        if(!req.files){
            return res.status(400).json({error: "no file uploaded"})
        }
        console.log("file upload successful")
        return res.status(200).json({success: "file upload successful"})
    } catch (error) {
        console.log(error.message);
        return res.status(400).json()
    }
}