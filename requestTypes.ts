export interface RoleBody {
    name: string,
    permissions?: any[]
}

export interface UserBody {
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string, 
    roleId?: string
}

export interface LoginBody {
    email: string,
    password: string,
}