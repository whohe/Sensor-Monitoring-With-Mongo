import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
	loginForm: FormGroup;
	error='';
	constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
		this.loginForm = this.formBuilder.group({
			username: ['customer', Validators.required],
			password: ['secret', Validators.required],
		});
	}
  onSubmit() {
  	let username = this.loginForm.controls['username'].value;
  	let password = this.loginForm.controls['password'].value;
		if (this.loginForm.valid) {
			this.authService.login(username,password);
			if (this.authService.isLoggedIn()){
				this.router.navigate(['/dashboard']);
			}else{
				this.error="Nombre de usuario o contraseña incorrecta."
			}
		}
  }
}
