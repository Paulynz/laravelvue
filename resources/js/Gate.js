export default class Gate{

    constructor(user){

        this.user = user;

    }

    isSuperAdmin(){
        return this.user.type === 'SuperAdmin';
    }

    isAdmin(){
        return this.user.type === 'Admin';
    }


    isSuperAdminorAdmin(){
        if(this.user.type === 'SuperAdmin' || this.user.type === 'Admin'){
            return true;
        }
    }
    isUser(){
        return this.user.type === 'User';
    }
    isAdminOrAuthor(){
        if(this.user.type === 'Admin' || this.user.type === 'Author'){
            return true;
        }
    }


    isAuthorOrUser(){
        if(this.user.type === 'User' || this.user.type === 'Author'){
            return true;
        }
    }
}