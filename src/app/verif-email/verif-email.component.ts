import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule,
    NgIf
  ],
  templateUrl: './verif-email.component.html',
  styleUrl: './verif-email.component.css'
})
export class VerifEmailComponent implements OnInit {
  code: string = "";
  user: User = new User();
  err = "";
  constructor(private route: ActivatedRoute, private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }
  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Login successful');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            localStorage.setItem("isLoggedIn" , "true")
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      },
      error: (err: any) => {
        if (err.status = 400) {
          this.err = err.error.message;
        }
        console.log(err.errorCode);
      }
    });
  }
}
