export class User{
    name: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
    photo: string;
    passwordChangedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;
    isActive: boolean;
}
