import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/model/profile.model';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  users: Profile[] = [];
  user: Profile = new Profile();
  newUser: Profile = new Profile();
  form: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("",  [Validators.required]),
    email: new FormControl("",  [Validators.required, Validators.email])
  })
  edit = false;

  get firstName(){
    return this.form.get("firstName");
  }

  get lastName(){
    return this.form.get("lastName");
  }

  get email(){
    return this.form.get("email");
  }
  
  constructor(private service: CakesService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.service.getUser().subscribe({
      next: (user: Profile) => {
        this.user = user;
        this.form.patchValue(this.user);
        console.log(user);
        
      },
      error: (err: any) => { console.log(err) }
    })
  }

  onEditClicked(){
    this.edit = true;
    this.form.patchValue(this.newUser);
  }

  onCancelClicked(){
    this.edit = false;
    this.form.patchValue(this.user);
  }

  onOkClicked(): void {
    let newUser: Profile = new Profile(this.form.value);
    newUser._id = this.user._id;
    this.service.updateUser(newUser).subscribe({
      next: (result: Profile) => {
        newUser = result;
        this.edit = false;
      },
      error: (err) => console.log(err)
    })
  }

  
}
