import { BaseEntity } from '../../../core/types/base.types';

/**
 * User Entity
 */
export interface User extends BaseEntity {
    username: string;
    password: string;
    vaiTro: string;
    hoTen: string;
    avatarUrl?: string;
    soDienThoai?: string;
    email?: string;
    diaChi?: string;
    

}


export enum VaiTro {
    ADMIN = "ADMIN",
    USER = "USER",   
    
}
/**
 * Create User DTO
 */
export interface CreateUserDto extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
}

/**
 * Update User DTO
 */
export interface UpdateUserDto extends Partial<CreateUserDto> {
}
