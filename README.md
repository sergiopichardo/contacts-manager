# Contacts Manager App 

This contacts manager application implements basic CRUD (Cread, Read, Update, and Delete) functionalities. A contact is an *entity* with a `name`, `email`, `phone`, and `tags`. The application allows you to *list* contacts based on their tag name, *add* new contacts, *delete* a contact, *update* a contact and *search* a contact based on a substring in the contact's `name` property. 


![Contacts Manager Diagram](./contacts-manager-diagram.png)

## Application Architecture Reasoning
I wanted to build this application in such a way that would allow me to reuse components, and make the maintainability of this app effortless. 

I did some quick research and learn that most web applications have the the following components: 
- Domain Logic
- Application Logic
- Presentation Layer
- State Management 
- HTTP Library 
- Other (Databases, ORM, Data Access, etc)

#### Domain Logic 
The domain logic (aka business logic) is the part of the program that actually solves the problem. It deals with how data can be *created*, *updated*, *stored* and more. For example, *sending an email*, *calculating a salary*, *creating a new user*. 
> The domain logic is concerned with the data itself. 


#### Application Logic 
The application logic is concerned with how the application works. For example: When the `add contact` button is clicked the application should present a modal window with a form. When an error occurs, the application should present an error message. 
> The application logic defines the applications's architecture and how it works.

#### Presentation Layer 
The presentation layer is concerned with the application's UI, and binding events, and delegating that behavior to the domain logic.
> The presentation layer responds to events triggered by user, browser, or 3rd party programs.

#### State Management 
State Management helps in updating the UI in related places when there is a change in the application data due to action performed in the application like click, hover, etc. It also helps in making sure that state changes have been incorporated at corresponding places. 
> The 'state' allows UI components to stay in sync and should be considered the 'single source of truth' for component data and state component changes. 
###### Sources 
- [How Redux helps managing state in JavaScript applications](https://www.innominds.com/blog/why-redux-and-how-it-helps-in-managing-state-in-javascript-application#:~:text=State%20Management%20helps%20in%20updating,been%20incorporated%20at%20corresponding%20places.)
- [What does the single source of truth mean](https://stackoverflow.com/questions/47182888/what-does-the-single-source-of-truth-mean)

#### HTTP Library
Some options include, the good ol' [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object, The [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and [axios](https://axios-http.com/docs/intro). 
> Allows you to make make and receive HTTP requests

---


### So...
After falling down the rabbit hole of application architectures, I found 2 main common architectures: 
1. Model-View-Controller (MVC)
2. The Flux Pattern 

I did play around with the Flux pattern a bit using Redux, but it quickly got out of control. So, I thought MVC was the way to go. It is a lot simpler than the Flux pattern and makes separation of concerns much easier. I highly recommend this [MVC article](https://www.taniarascia.com/javascript-mvc-todo-app) by Tania Rascia. 


---

## User Stories 
- [x] As a *user*. I want to *search for contacts*, So that *I can filter contacts by a substring in their name*.
- [x] As a *user*. I want to *add a contact*, So that *I can save a contact I want.*
- [x] As a *user*. I want to *update a contact*, So that *I can edit a contact with new info or fix incorrect info*.
- [x] As a *user*. I want to *list a contact*, So that *I can view the contact in its own page*.
- [x] As a *user*. I want to *delete a contact*, So that *I can remove unwanted or irrelevant contacts*.
- [x] As a *user*. I want to *tag a contact*, So that *I can filter contacts based on that tag*.
- [ ] As a *user*. I want to *remove a tag*, So that *I delete a tag an unwanted tag from a contact*.
- [ ] As a *user*. I want to *favorite a contact*, So that *I can find my favorite contacts at a glance*.
- [ ] As a *user*. I want to *paginate contacts*, So that *I don't see all contacts at once*.
- [ ] As a *developer*, I want to *seed contact data*, so that *I can show paginated results.*
    - Create your own library to seed information using `faker`.

---
## Features  
### Add a Contact
> **User Story**: As a *user*. I want to *add a contact*, So that *I can save a contact I want.*
- When the user clicks on a `Add Contact` buttom
  - Show a modal window with a form with the following fields: 
    - `Full Name` (input field)
    - `Email` (input field)
    - `Phone Number` (input field)
    - `Tags` (Multi-select options field)
    - `Custom Tag` (input field)
    - `Submit` button 
    - `Cancel` button 
  - If the user clicks the `Submit` button, then: 
    - Add the contact information to the database. 
  - If the user clicks the `Cancel` button, then: 
    - Reset the form, and dismiss the modal. 


---
### Edit a contact 
> **User Story**: As a *user*. I want to *update a contact*, So that *I can edit a contact with new info or fix incorrect info*.
- When the user clicks on the `Edit` button
  - Show a modal window with a form with the following fields: 
    - `Full Name` with full name value 
    - `Email` with email value 
    - `Phone Number` with phone number value 
    - `Tags` as multi-select options selected
    - `Custom Tag` with empty input field value
    - `Submit` button 
    - `Cancel` button 
  - If the user clicks `Submit` button, then:
    - Save the updated user to the database 
  - If the user clicks `Cancel` button, then: 
    - Simply dismiss modal window, and do NOT persist changes. 

### Delete a Contact
> **User Story**: As a *user*. I want to *delete a contact*, So that *I can remove unwanted or irrelevant contacts*.
- When the user clicks on a `Delete` button
  - Show a modal window with: 
    - Message: `Do you want to delete 'user name' from your contacts?`
    - `Cancel` button
    - `OK` button 
  - If user clicks on `Cancel` button, then do nothing, and simply dismiss the modal window 
  - If the user clicks on `OK` button, then: 
    - **delete** the user from the database 
    - **update** the view with new updated contacts list


## List Single Contact (Not Yet Implemented)
> **User Story**: As a *user*. I want to *list a contact*, So that *I can view the contact in its own page*.
- When the user clicks on contact's first name link
  - Display a page about that contact 
  - Otherwise, display the list of contacts 

### Tag a Contact
> **User Story**: As a *user*. I want to *tag a contact*, So that *I can filter contacts based on that tag*.
- When creating or updating a contact 
- Be able to select an existing tag OR create a new tag
---

## Workflow
1. Write user stories 
2. Write feature description 
3. Implement HTTP wrapper `/javascripts/modules/helpers/Http.js`
4. Implement Model `/javascripts/modules/Model.js`
   > Here I tried to decouple the `state` and tried to mimick the way an application is structured in the wild
5. Implement all views and instantiate them in `/javascripts/modules/View.js`
6. Export and Initialize Controller in `main.js`
---

### Future Features and Fixes
- [ ] Allow user to delete and edit tags. 
- [ ] Allow user to create multiple tags at once. 
- [ ] Show user the tags associated with them when contact form is loaded. (e.g. show checked checkboxes)
- [ ] Allow user to favorite contacts and render favorited contacts in dropdown in navbar. 
- [ ] Store favorites in Local Storage.
- [ ] Add pagination 
- [ ] Seed contacts function (add large amount of contacts)
- [ ] List a single user 