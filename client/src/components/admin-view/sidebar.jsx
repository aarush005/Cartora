import { adminSidebarMenuItems } from '@/config'
import { ChartNoAxesCombined, LayoutDashboard, PackageCheck, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

function MenuItems({setOpen}){
  const navigate = useNavigate()

  const renderIcon = (icon) => {
    switch (icon) {
        case 'LayoutDashboard':
            return <LayoutDashboard />;
        case 'ShoppingBasket':
            return <ShoppingBasket />;
        case 'PackageCheck':
            return <PackageCheck />;
        default:
            return null;
    }
};

  return <nav className='mt-8 flex-col flex-gap-2' >
    {
      adminSidebarMenuItems.map(menuItem=> <div key={menuItem.id} onClick={()=>{
        navigate(menuItem.path);
        setOpen ? setOpen(false) : null;}
      } className='flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer'>
       {renderIcon(menuItem.icon)}
        <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
}


const AdminSidebar = ({open, setOpen}) => {
  const navigate = useNavigate()
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className='text-2xl font-bold'>Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} /> 
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-white p-6 lg:flex'>
        <div onClick={()=>navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer'>
        <ChartNoAxesCombined size={30}/>
        <h1 className='text-2xl font-bold'>Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default AdminSidebar




