import { Component, HostListener, Inject, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GithubSearchService } from '../../services/github-search.service';
import {MaterialModule} from '../../shared-imports/imports'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css',
  
})
export class SearchComponentComponent {

  searchUsername: any;
  userData: any;
  reposData: any;
  paginatedRepos: any[] = [];
  pageSize = 5;
  currentPage = 0;
  totalRepos = 0;
  searchTerm: string = ''; // Add this line
  mobileDisplay:boolean=false
  loadSearch:boolean = false

  followers:any
  following:any

  allFollowersData: any[] = [];
  allFollowingData:any [] = [];

  @ViewChild('followersDialog') followersDialog!: TemplateRef<any>;
  @ViewChild('followingDialog') followingDialog!: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private githubService: GithubSearchService,private dialog: MatDialog, @Inject(PLATFORM_ID) private platformId: Object) {
    this.logWindowSize();

  }

   // HostListener to listen for window resize events
   @HostListener('window:resize', ['$event'])
   onResize(event: any) {
     this.logWindowSize();
   }
 
   // Method to log the window size
   logWindowSize() {
     if (isPlatformBrowser(this.platformId)) {
       const width = window.innerWidth;
       const height = window.innerHeight;
 
       // Set mobileDisplay based on width
       this.mobileDisplay = width < 1030;
     }
   }

  ngOnInit(): void {
    // Get user data
    this.githubService.getUserData('dennis027').subscribe(
      (res) => {
        this.userData = res;
      },
      (err) => {
      }
    );

    // Get repository data
    this.githubService.getRepositories('dennis027', '100').subscribe(
      (res) => {
        this.reposData = res;
        this.totalRepos = this.reposData.length;
        this.paginateData(); // Initial data slice
        
      },
      (err) => {
      }
    );

    

    this.githubService.getFollowers('dennis027').subscribe(
      (res)=>{
        this.followers = res
      },
      (err)=>{

      }
    )

    this.githubService.getFollowing('dennis027').subscribe(
      (res)=>{
        this.following = res
      },
      (err)=>{

      }
    )


    this.getFollowersData() 
    this.getFollowingData()
 
  }



  getFollowersData() {
    // Step 1: Get followers of 'dennis027'
    this.allFollowersData = []
    this.githubService.getFollowers(this.searchUsername ? this.searchUsername :'dennis027').subscribe(
      (res) => {
        this.followers = res; 
  
        // Step 2: Loop through each follower and fetch their data
        this.followers.forEach((follower: { login: string; }) => {
          this.githubService.getUserData(follower.login).subscribe(
            (userData) => {
              if (userData) { // Check if userData is not undefined
               
                this.allFollowersData.push(userData); // Push user data into the array
              } else {
              }
            },
            (err) => {
          
            }
          );
        });
      },
      (err) => {
      }
    );
  }



  getFollowingData() {
    // Step 1: Get followers of 'dennis027'
    this.allFollowingData = []
    this.githubService.getFollowers(this.searchUsername ? this.searchUsername :'dennis027', ).subscribe(
      (res) => {
        this.following = res; // Store followers
  
        // Step 2: Loop through each follower and fetch their data
        this.following.forEach((follower: { login: string; }) => {
          this.githubService.getUserData(follower.login).subscribe(
            (userData) => {
              if (userData) { // Check if userData is not undefined
          
                this.allFollowingData.push(userData); // Push user data into the array
              } else {
      
              }
            },
            (err) => {
       
            }
          );
        });
      },
      (err) => {
      }
    );
  }


  // Property that filters the repositories based on the search term
  get filteredRepos() {
    return this.reposData.filter((repo: { name: string; full_name: string; description: string; language: string; }) => 
      repo.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      repo.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (repo.language && repo.language.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  // Recalculate the totalRepos and paginate when the search term changes
  onSearchTermChange() {
    this.currentPage = 0;  // Reset to the first page on new search
    this.totalRepos = this.filteredRepos.length;  // Update the total to reflect filtered results
    this.paginateData();  // Paginate based on filtered data
  }

  // Slicing the filtered data according to the current page and page size
  paginateData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRepos = this.filteredRepos.slice(startIndex, endIndex);  // Slice the filtered data
  }

  // Triggered when the user changes the page (for pagination)
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateData();  // Slice the data again for the new page
  }

  // Open repository in a new tab
  viewRepo(i: number) {
    window.open(this.paginatedRepos[i]?.html_url, '_blank');
  }

  

  // Search GitHub user
  searchGitUser(){
    this.loadSearch = true

    this.githubService.getUserData(this.searchUsername ? this.searchUsername :'dennis027').subscribe(
      (res) => {
        this.userData = res;
        this.loadSearch = false
      },
      (err) => {
        this.loadSearch = false
      }
    );

    // Get repository data
    this.githubService.getRepositories(this.searchUsername ? this.searchUsername :'dennis027', '1000').subscribe(
      (res) => {
        this.reposData = res;
        this.totalRepos = this.reposData.length;
        this.paginateData(); // Initial data slice
        
      },
      (err) => {
      }
    );

    

    this.githubService.getFollowers(this.searchUsername ? this.searchUsername :'dennis027').subscribe(
      (res)=>{
        this.followers = res
      },
      (err)=>{

      }
    )

    this.githubService.getFollowing(this.searchUsername ? this.searchUsername :'dennis027').subscribe(
      (res)=>{
        this.following = res
      },
      (err)=>{

      }
    )

    this.getFollowersData() 
    this.getFollowingData()


  }

  // View user's portfolio
  viewPortfolio(){
    window.open(this.userData.blog, '_blank');
  }
  viewLangauges(){
    this.githubService.getLanguages('dennis027','Akan-naming').subscribe(
      (res)=>{
      }
    )
  }


openFollowerDial() {
    let dialogRef = this.dialog.open(this.followersDialog,{
      maxWidth:'60%',
      maxHeight:'70vh'
    });
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
    
            } else if (result === 'no') {
           
            }
        }
    })
}

openFollowingDial() {
  let dialogRef = this.dialog.open(this.followingDialog,{
      maxWidth:'60%',
      maxHeight:'70vh'
  });
  dialogRef.afterClosed().subscribe(result => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
          if (result === 'yes') {
           
          } else if (result === 'no') {
      
          }
      }
  })
}


}