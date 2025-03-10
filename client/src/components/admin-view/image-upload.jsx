import React, { useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'

const ProductImageUpload = ({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl}) => {
    

    const inputRef = useRef(null)

    function handleImageFileChange(event){
        console.log(event.target.files)

        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);

    }

    function handleDragOver(event){
        event.preventDefault()
    }

    function handleDrop () {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if(droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage(){
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = ''
        }
    }
 
  return (
    <div className='w-full max-w-md mx-auto'>
        <Label className="text-lg font-semibold mb-2 block">
            Upload Image
        </Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4 mt-4">
             <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}/>
             {
                !imageFile ? 
                <Label htmlFor="image-upload" className="flex flex-col items-center h-32 cursor-pointer">
                    <UploadCloudIcon className='w-10 h-10 mt-7'/>
                    <span>Drag & Drop Or Click to Upload Image</span>
                </Label> : (
                <div className='flex items-center justify-between '>
                    <div className="flex items-center">
                        <FileIcon className='w-8 text-primary mr-2 h-8'/>
                    </div>
                    <p className='text-sm font-medium'> {imageFile.name}</p>
                    <Button size="icon" className="text-gray-500 hover:text-foreground" onClick={handleRemoveImage}>
                        <XIcon className='w-4 h-4'/> 
                        <span className='sr-only'>Remove File</span>
                    </Button>
                </div>  )
             }
        </div>
    </div>
  )
}

export default  ProductImageUpload 
