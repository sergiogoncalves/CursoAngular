import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'form-reactive-challenge';

  projectStatus: ['Stable', 'Critical', 'Finished'];

  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null,
                  [ Validators.required, CustomValidators.invalidProjectName ],
                                CustomValidators.asyncInvalidProjectName),
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      statusProject: new FormControl('critical', [ Validators.required ])
    });
  }



  onSubmit() {
    console.log(this.signupForm.value);
  }
}
