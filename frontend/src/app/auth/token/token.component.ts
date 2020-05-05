import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { UserProfile } from 'src/app/_dtos/user/UserProfile';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  loading: Boolean = true
  profile: UserProfile
  token: string
  redirect = "/"

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.authService.setToken(this.token)
    });
  }

  ngOnInit(): void {
    this.userService.fetchProfile().subscribe(
      (profile: UserProfile) => {
        this.profile = profile
        this.loading = false
      }, (err) => {
        this.router.navigateByUrl("/auth/login")
      })
  }

  continue() {
    this.router.navigateByUrl(this.redirect)
  }
}
