import ProductImageUpload from '@/components/admin-view/image-upload'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { useState } from 'react'

const initialFormData ={
  image : null,
  title : '',
  description : '',
  category : '',
  brand : '',
  price : '',
  salePrice : '',
  totalStock : '',
}
function onSubmit (){

}

const AdminProducts = () => { 
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  return (
    <>
    <div className="mb-5 w-full flex justify-end">
      <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add new Product</Button>
    </div>
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
    <Sheet open={openCreateProductsDialog}
    onOpenChange={() =>{
      setOpenCreateProductsDialog(false)
    }}>
      <SheetContent side="right" className=" overflow-auto">
        <SheetHeader>
          <SheetTitle>Add new Product</SheetTitle>
        </SheetHeader>
        <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
        <div className="py-6">
          <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText='Add'
          formControls={addProductFormElements}/>
        </div>
      </SheetContent>

    </Sheet>
    </div>
    </>
  )
}

export default AdminProducts