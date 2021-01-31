# Express blog app
---
This is a simple blog app created with Express and MongoDB. It comes with all the functionality necessary to start a blog without using a CMS. This blog uses server rendered templates and a simple UI built with Semantic UI. It can be used "as is" or customized to fit your needs. You can use a different UI library or any popular front-end framework (though it will require some additional coding).

Information on installation and the main features is outlined in the sections below.

<br/>

---

<br/>

## Features
 - [user roles](#user-roles)
 - [pagination](#pagination)
 - [authentication](#authentication)
 - [rich text editor](#rich-text-editor)
 - [post categories](#post-category)
 - [post summary](#post-summary)
 - [image lazy loading](#image-lazy-loading)

## How to use it
- [download the repository](#download-the-repository)
- [set up the project](#set-up-the-project)
- [run the app](#run-the-app)
- [manage the database](#manage-the-database)
- [helpful resources](#helpful-resources)
<br/>
<br/>

---

<br/>

### **User roles**    

This blog comes with the following user roles:
- Admin - can create, update and delete any blogpost
- Editor - can create posts, delete their own posts, and edit all posts
- Writer - can create posts, edit and delete their own posts
- User - is only permitted to view content

These roles can be further adjusted to your individual needs. For example, the *user* role can be used when you need to separate public and private content (paid content, etc.).

---
**NOTE**

By default, all users are registered with the *"user"* role. In order to change the role to *"admin"* or any other role, edit the respective user in the database. Refer to the [Manage the database](#manage-the-database) section for more information

---

[back to features](#features)   
[how to use](#how-to-use-it)

### **Pagination**    

The blog comes with a pagination middleware, which allows you to break down your posts into several pages. This is achieved by appending a query string to your blog route:
```
/blog?page=1&limit=5
```
This is the default throughout this app, and it displays 5 posts per page. 
![](/readme_screenshots/pagination.png)
You can change the query string to suit your needs.     
If you navigate to 
```
/blog
```
You will see all the posts existing in your database.   
[back to features](#features)   
[how to use](#how-to-use-it)

### **Authentication**
The blog supports user authentication provided by PassportJS. All the create, update, and delete routes are protected.  The app comes with basic validated *register* and *login* forms. You can improve it by adding a captcha and creating a *reset password* route. Look into the **Nodemailer** for more information on sending e-mails with Node.    
[back to features](#features)   
[how to use](#how-to-use-it)

### **Rich text editor**
You can format your blog posts with a built-in rich text editor. 
![](/readme_screenshots/text_editor.png)
In addition to formatting, you can also embed code snippets. 
![](/readme_screenshots/insert_code.png)
The editor supports syntax highlighting for many different programming languages.
![](/readme_screenshots/code_snippet.png)

[back to features](#features)   
[how to use](#how-to-use-it)

### **Post categories**
When a new post is created, you will be offered to choose a category. This will allow users to filter your posts by categories. 
![](/readme_screenshots/filter.png)
Note that by default, there are no categories, so you have to create ones yourself.    
[back to features](#features)   
[how to use](#how-to-use-it)

### **Post summary**
You have an option to write a post summary that will be displayed on the main blog page. If this field is left empty, then the first 250 characters of your post will be used as a summary.   
[back to features](#features)   
[how to use](#how-to-use-it)

### **Image lazy loading**
All the blog post images are lazy-loaded as you scroll down the list. 
![](/readme_screenshots/lazy_loading.png)
In case if the image is missing, it will be replaced with a placeholder.  
[back to features](#features)   
[how to use](#how-to-use-it)
<br/>
<br/>

---

<br/>
<br/>

### **Download the repository**
You can clone this repository running *git clone* command or download it to your machine

### **Set up the project**
If you chose to download the repository, unpack it. Or head to the directory you cloned it into.

---

**Note**

I assume you have NodeJS, NPM, Git, and MongoDB installed on your machine. If not, installing these will be your first step. There are plenty of tutorials online so I won't focus on this.

---

First of all, run
```git
npm install
```
this will install all the dependencies.

All the sensitive information is stored in *.env* file. However, for security reasons, this file is never included in the git repository.

So you will have to create this file in the root directory.

Once created, open it and add the following information:

```
DB_STRING=YourDevelopmentDBString
DB_STRING_PROD=YourProductionDBString
```
DB_STRING is the database you use for develpoment and DB_STRING_PROD is the production database respectively. For example, I only used development database installed on my computer and my string looks something like this:
```
DB_STRING=mongodb://localhost:27017/express_blog_app
```

Lastly, run

```
node generateSecret.js
```

This will randomly generate a number and add it to the *.env* file under SESSION_SECRET string. Make sure to run the command only once or delete the existing SESSION_SECRET string before running it again.

### Run the app
Use 
```
npm run dev
```
to run the app in developent mode.

Or 

```
npm run production
```

to run it in production mode.

### **Manage the database**
You can either manage your database through mongo shell or download [MongoDB Compass](https://www.mongodb.com/products/compass).

### **Helpful resources**
[How to set up a NodeJS app for production](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)   
[Password reset with Nodemailer](https://morioh.com/p/12aff44d8d22)