import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/model/message.model';
import { Profile } from 'src/app/model/profile.model';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messages: Message = new Message();
  user: Profile = new Profile();
  form: FormGroup = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    message: new FormControl("")
  })

  constructor(private service: CakesService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.service.getUser().subscribe({
      next: (user: Profile) => {
        this.user = user;
        this.messages.name = this.user.firstName + " " + this.user.lastName;
        this.messages.email = this.user.email;
        this.messages.message = this.messages.message;
        this.form.patchValue(this.messages)
        
        
      },
      error: (err: any) => { console.log(err) }
    })
  }

  onSubmit(): void {
    this.messages = new Message(this.form.value);
    this.service.sendMessage(this.messages).subscribe({
      next: (result: Message) => {
        
        this.router.navigate(['/home']);
        
      },
      error: (err) => console.log(err)
    })
    
  }
}
