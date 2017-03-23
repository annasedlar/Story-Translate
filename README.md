#Title of Project
New Story Group Video Translation Tool

##Description/Overview
This app allows groups to upload, view, and transcribe/translate videos in an organized way. quick background info on company.


[Live URL]()

##Table of contents

[Description/Overview](#description/overview)

[Technologies Used](#technologies)

[Challenges and Solutions](#challenges-and-solutions)

[GitHub Link](#github-link)

[Code Snippets and Screenshots](#code-snippets-and-screenshots)

[MVP](#mvp-minimal-viable-product)

[Stretch Goals](#stretch-goals)

[Team Members and Contributions](#team-members-and-contributions)

[Project Timeline](#project-timeline)



##Technologies
The following languages and frameworks were used:

  * HTML

  * CSS

  * SASS

  * Javascript

  * JQuery

  * Angular 1.5

  * Bootstrap

  * Materialize

  * Node.js

  * MySQL


##Challenges and Solutions
1. **Challenge: ** Learning and utilizing Angular to complete this project

   **Solution: ** logic to delete group and individual videos, logic to target start and end times in transcript (no overlapping times), linking transcript to the correct video and having it show up when the user returns to the session at a later time

2. **Challenge: ** Using the video element in HTML5

   **Solution: ** SCE in Angular, grabbing screenshots, displaying subs in video at the right time, logic to get "currentlyPlaying" only displaying on the video that is playing. when you click watch, video clicked will bring up corresponding transcript. entire transcript displays on the right while the corresponding line displays in the video at that time frame. html5 doesn't recognize video as "safe". we did a lot of searching and most of the answers were that there is no fix to the issue.

3. **Challenge: ** Multer

   **Solution: **




##GitHub Link
[Upd8ed](https://github.com/annasedlar/Story-Translate)

##Code Snippets and Screenshots


images/screenshots
![alt]()


This is the code behind our "Videos to Translate" page. We have logic dictating how each video will be displayed. The videos are grouped by family name, a field that can be edited on the translateVideo and finishedProduct routes. For a more pleasant user experience, the upload button is available on all routes with a default field of the family name. Each video is clearly marked as complete or incomplete and there are options on all videos to continue editing the transcript. You can only view the final product when the translation has been submitted as "complete." There is also an option to delete individual videos or an entire family of videos (for example when video translation and compilation is complete for that family.)
 
```javascript
$scope.videoData = videoData

var tempFamilyName = '';
$scope.videoData.data.map((video, index)=>{
    var myUrl = 'http://localhost:3000/videos/' + video.name
    video.name = $sce.trustAsResourceUrl(myUrl)
    if(!index){
        tempFamilyName = video.familyName
        // video.skipClass = 'hide-class'
    }else if(video.familyName.toUpperCase() == tempFamilyName.toUpperCase()){
        video.familyName = ''
        video.skipClass = 'hide-class'
    }else{
        tempFamilyName = video.familyName
        video.skipClass = 'nothing'
    }
    if(video.finished){
        video.finished = ''
        video.classStyle = 'video-complete'
        video.checkItOutClass = ''   
    }else{
        video.finished = 'Incomplete'
        video.classStyle = 'video-incomplete'
        video.checkItOutClass = 'displayNone'
    }

```

```javascript

```


##MVP (Minimal Viable Product)

**Ability to upload content

**Submit translations based on video time frames

**Form that saves to database

**Display a list of videos sorted by family and categorized by completion status




##Stretch Goals

**Token authentication system

**Displaying completed translations from transcipt as video plays

**Admin dashboard - user can see who translated which videos, when, how often, etc

**Displaying video immediately on list page after upload (without refresh)


##Team Members and Contributions
All team members are full stack web development students of the [DigitalCrafts](http://www.digitalcrafts.com/) November 2016 cohort. This project utilizes our frontend and backend skills that we have learned along with pair programming and SCRUM agile development methodology. 



* [Paul Kang](https://github.com/pdwkang) 

**Role:** MVP

**Contributions:** Styling. functionality. lead developer. Resolved coding challenges team members faced throughout the project.


* [Anna Sedlar](https://github.com/annasedlar) 

**Role:** SCRUM Master

**Contributions:** translation page, ideas for routes, styling, communicated with Morgan, Readme


* [Connie Dang](https://github.com/dangconnie) 

**Role:** Wordsmith

**Contributions:** Readme, upload video component, styling



##Project Timeline
Project start: 3/6/2017

Project completion: 3/24/2017