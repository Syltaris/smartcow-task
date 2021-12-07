# Server

## Endpoints

| endpoint    | method | details                                  |
| :---------- | :----- | :--------------------------------------- |
| /project    | POST   | create new project with payload          |
| /project/id | GET    | get project (which contains image links) |

## Models

Project

- id : PK
- images : Image

Image

- id : PK
- url : link to local file directory
- annotations: Annotation[]

Annotation

- type
- startX
- startY
- endX
- endY

# Frontend

## How to Start

Navigate to `/app` folder, do a `yarn` install, and then `yarn start` to spin up the frontend.

## User Flows

1. User can create 'Project'
1. User can upload images to 'Project'
1. User can see images uploaded to 'Project'

1. User can do multiple annotations in seperate images in 'Project' (with 4 options)

1. User can download .csv file of image containing coordinations of bonding boxes of annotations (with added option?)

---

The task is to create a simple annotation framework.
example 1::https://github.com/annotorious/annotorious
example 2: https://youtu.be/ze0jXX4JEj4
The application should be server/client architecture
Python Flask or Django, ReactJs preferred
Step 1 :
Add a feature where the user can create a project (Creates a directory using user input)
upload 10 images related to traffic (Automobiles)
Annotate 10 images
On-screen a dropdown menu should be displayed with options car, bus, autorickshaw, bike
Users should able to annotate multiple objects in an image.
Save xy,xy,xy,xy coordinates of the individual image to a .csv file
The format should image name and coordinates
The manager should able view the annotated images with the bounding boxes
Page writeup on how to start the application.
Screenshots of the application for the corresponding task
Example for .CSV file
71029695.jpg,930,594,1014,659
71029697.jpg,215,394,319,454
71029697.jpg,926,591,1019,658
Housekeeping rules:
Do not share empty GitHub, GitLab or other code sharing platform links.
Code should be uploaded to code sharing repo, with proper documentation, screenshots
What do we look?
Documentation
Frontend knowledge
Client-server architecture knowledge

---
