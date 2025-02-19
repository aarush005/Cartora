import { LayoutDashboard,  PackageCheck, ShoppingBasket } from "lucide-react"

export const registerFormControls = [
    {
        name: 'userName',
        label: 'User name',
        placeholder : "Enter your user name",
        componentType : 'input',
        type : 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder : "Enter your Email Address",
        componentType : 'input',
        type : 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder : "Enter your Password",
        componentType : 'input',
        type : 'password',
    },
]

export const loginFormControls = [

    {
        name: 'email',
        label: 'Email',
        placeholder : "Enter your Email Address",
        componentType : 'input',
        type : 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder : "Enter your Password",
        componentType : 'input',
        type : 'password',
    },
]

export const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: 'LayoutDashboard'
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: 'ShoppingBasket' 
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: 'PackageCheck'

    },
]