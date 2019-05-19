<style>
.widget-user-header{
    background-position: center center;
    background-size: cover;
    height: 250px;

}
</style>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background-image:url('./img/1002864.png')">
                        <h3 class="widget-user-username">{{this.form.name}}</h3>
                        <h5 class="widget-user-desc">{{this.form.type}}</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="profile-user-img img-fluid img-circle" 
                         :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4">
                            <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div> <!--end column-->
        </div><!-- /end row -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                        <div class="card-header p-2">
                            <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link " href="#activity" data-toggle="tab">Activity</a></li>
                            <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                            </ul>
                        </div><!-- /.card-header -->
                        <div class="card-body">
                            <div class="tab-content">
                            <div class="tab-pane" id="activity">
                                
                            </div>
                            <!-- /.tab-pane -->

                            <div class="tab-pane active show" id="settings">
                                <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="inputName" class="col-sm-2 control-label">Name</label>

                                    <div class="col-sm-10">
                                    <input type="email" v-model="form.name" class="form-control" id="inputName" placeholder="Name" :class="{ 'is-invalid': form.errors.has('name') }">
                                    <has-error :form="form" field="name"></has-error>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                                    <div class="col-sm-10">
                                    <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email" :class="{ 'is-invalid': form.errors.has('email') }">
                                    <has-error :form="form" field="email"></has-error>
                                    
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="bio" class="col-sm-2 control-label">Bio</label>

                                    <div class="col-sm-10">
                                    <textarea class="form-control" v-model="form.bio" id="bio" placeholder="Bio"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="photo" class="col-sm-5 control-label">Photo</label>

                                    <div class="col-sm-10">
                                        <input ref="myFileInput" type="file" @change="updateProfile" name="photo" class="form-input">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-sm-5 control-label">Password (leave empty if not changing)</label>

                                    <div class="col-sm-10">
                                    <input type="password" class="form-control" v-model="form.password" id="password" placeholder="Password" :class="{ 'is-invalid': form.errors.has('password') }">
                    <has-error :form="form" field="password"></has-error>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-10">
                                    <button @click.prevent="updateInfo" type="submit" class="btn btn-success"> <i class="fas fa-user-edit">Update</i></button>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <!-- /.tab-pane -->
                            </div>
                            <!-- /.tab-content -->
                        </div><!-- /.card-body -->

                </div>
            </div>
        </div><!-- /end row -->
    </div><!-- /end container -->
    
</template>


<script>
    export default {
        data(){
            return{
                form : new Form({
                    id : '',
                    name : '',
                    email :'',
                    password :'',
                    type :'',
                    bio :'',
                    photo : '',
                })
            }
            
        },
        mounted() {
            console.log('Component mounted.')
        },

        methods:{

            getProfilePhoto(){
                let photo = this.form.photo;
                
                if(photo == null){
                    return ('img/profile/') + this.form.photo;

                }
                if(photo.includes('data:image')){
                    return this.form.photo;

                }else{
                    return ('img/profile/') + this.form.photo;
                }

            },
            updateInfo(){
                this.$Progress.start()
                let password = this.form.password;
                if(password == ""){
                    this.form.password = undefined; 
                }
                this.form.put("api/profile")
                .then(()=>{
                    swal.fire(
                        'Updated!',
                        'Your Profile has been Updated.',
                        'success'
                    )
                    this.$Progress.finish()

                })
                .catch(() => {
                    this.$Progress.fail()
                });

            },

            updateProfile(e){
                
                
                let file =  e.target.files[0];
                console.log(file);
                let reader = new FileReader();
                if(file['size'] < 2111775){
                    reader.onloadend = (file) => {
                    // console.log('RESULT', reader.result)
                    this.form.photo = reader.result;
                }
                    reader.readAsDataURL(file);
                }else{
                    swal.fire({
                        type: 'error',
                        title: 'Oppsss!',
                        text: 'You are uploading a large file',

                    })
                    this.$refs.myFileInput.value = '';
                    

                }

            }

        },
        
        created(){
            axios.get("api/profile")
            .then(({ data }) =>(this.form.fill(data))); //promise function get and fill
        }
    }
</script>
