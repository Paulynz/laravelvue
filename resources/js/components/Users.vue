<template>
    <div class="container">
        <div class="row mt-5" v-if="$gate.isSuperAdminorAdmin()">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newModal">Add New 
                        <i class="fas fa-user-plus fa-fw"></i>
                    </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Type</th>
						<th>Registered At</th>
						<th>Modify</th>
                  	</tr>
                  	<tr v-for="user in users.data" :key="user.id">
                          <td>{{user.id}}</td>
                          <td>{{user.name}}</td>
                          <td>{{user.email}}</td>
                          <td>{{user.type}}</td>
                          <td>{{user.created_at |myDate}}</td>
                          <td>
                              <a href="#" @click="showUser(user)">
                                    <i class="fa fa-eye black"></i>
								</a>
                                /
                              <a href="#" @click="editModal(user)">
                                  <i class="fa fa-edit"></i>
								</a>
                                /
                                <a href="#" @click="deleteUser(user.id)">
                                    <i class="fa fa-trash red"></i>
								</a>
						  </td>
                  	</tr>
					</tbody>
				</table>
              </div>
              <!-- /.card-body -->
            </div>
            <div class="card-footer">
                <pagination :data="users" @pagination-change-page="getshowanother"></pagination>
            </div>
            <!-- /.card -->
          </div>
        </div>
            
        <div v-if="!$gate.isSuperAdminorAdmin()">
            <not-found></not-found>
        </div>

        <!-- Show Modal -->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="showUser" id="showUser" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="showUser">Show User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="widget-user-image text-center">
                        <img class="img-thumbnail img-fluid img-circle" 
                         :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                    <div class="form-group">
                        <input v-model="form.name" type="text" name="name" title="Name" class="form-control" disabled>
                    </div>
                    <div class="form-group">
                        <input v-model="form.email" type="text" name="email" title="Email" class="form-control" disabled>
                    </div>
                    <div class="form-group">
                        <input v-model="form.bio" type="text" name="bio" title="Bio" class="form-control" disabled>
                    </div>
                    
                </div>
            </div>

        </div>
        </div>

        <!-- Create and Edit Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNew" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" v-show="!editmode" id="addNew">Add New User</h5>
                <h5 class="modal-title" v-show="editmode" id="UpdateUser">Update User Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="editmode ? updateUser() : createUser()">
            <div class="modal-body">
                <div class="form-group">
                    <float-label>
                        <input v-model="form.name" type="text" name="name"
                            placeholder="Name"
                            class="form-control mt-1" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                    </float-label>
                </div>
                <div class="form-group">
                    <float-label>
                        <input v-model="form.email" type="text" name="email"
                            placeholder="Email"
                            class="form-control mt-1" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                    </float-label>
                </div>
                <div class="form-group">
                    <float-label >
                        <textarea v-model="form.bio" type="text" name="bio"
                            placeholder="Short bio for the user (Optional)"
                            class="form-control mt-1" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                        <has-error :form="form" field="bio"></has-error>
                    </float-label>
                </div>
                <div class="form-group">
                    <float-label :dispatch="false">
                        <select name="type" placeholder="User Type" v-model="form.type" id="type" class="form-control mt-1" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option disabled selected value="">Select User Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">Standard</option>
                            <option value="Author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </float-label>
                </div>
                <div class="form-group">
                    <float-label>
                        <input placeholder="Password" v-model="form.password" type="password" name="password" id="password"
                            class="form-control mt-1" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </float-label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button v-show="editmode" type="submit" class="btn btn-success"><i class="fas fa-user-edit"></i>Update</button>
                <button v-show="!editmode" type="submit" class="btn btn-primary"><i class="fas fa-user-plus"></i>Create</button>
            </div>
            </form>
            </div>
        </div>
        </div> 
    </div> <!--END DIV 1 ONLY TEMPLATE TAG ALL-->
</template>

<script>
    export default {
        data() {
            return{
                fullWidthImage : false,
                editmode : false,
                users : {},//array store users data
                form : new Form({
                    id : '',
                    name : '',
                    email :'',
                    password :'',
                    type :'',
                    bio :'',
                    photo :'',
                })

            }
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
            
            getshowanother(page = 1){
                axios.get('api/user?page=' + page)
				.then(response => {
					this.users = response.data;
				});
		    },
            updateUser(){
                this.$Progress.start()
                let password = this.form.password;
                if(password == ""){
                    this.form.password = undefined; 
                }
                this.form.put('api/user/'+this.form.id)
                .then(() => {
                    //successful
                    $('#addNew').modal('hide');
                    swal.fire(
                        'Updated!',
                        'Your file has been Updated.',
                        'success'
                    )
                    this.$Progress.finish();
                    Fire.$emit('AfterCreated');  

                })
                .catch(() => {
                    this.$Progress.fail();
                });
            },
            showUser(user){
                $('#showUser').modal('show');
                this.form.fill(user);

            },
            editModal(user){
                this.editmode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },
            newModal(){
                this.editmode = false;
                this.form.reset();
                $('#addNew').modal('show');
            },
            deleteUser(id){
                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it man!'
                    }).then((result) => {

                        //Send AJX request to the server
                          if (result.value) {
                            this.form.delete('api/user/'+id).then(()=>{
                                swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )

                            Fire.$emit('AfterCreated');    

                            }).catch(()=>{
                                swal.fire("Failed", "There was something wrong","warning");
                            });
                          }
                    })

            },
            loadUsers(){
                if(this.$gate.isSuperAdminorAdmin()){
                    axios.get("api/user").then(({ data }) =>(this.users = data)); //promise function data send data to this.users = data
                }
            },
            createUser(){
                this.$Progress.start()
                
                this.form.post('api/user')
                .then(()=>{
                    Fire.$emit('AfterCreated');
                    $('#addNew').modal('hide')
                    toast.fire({
                            type: 'success',
                            title: 'User Created Successfully'
                        })
                    this.$Progress.finish()

                })
                .catch(() =>{


                })
            }

        },
        created() {
            Fire.$on('searching',() =>{
                let query = this.$parent.search;
                axios.get('api/findUser?q=' + query)
                .then((data)=>{
                    this.users = data.data;

                })
                .catch(()=>{

                })
            })
            this.loadUsers();
            // setInterval(() => this.loadUsers(),3000);
            Fire.$on('AfterCreated',() => {
                this.loadUsers();
            });

        }
    }
</script>
