<h1>Blog API</h1>

<h2>A blog API built with Node js</h2>
<p>Server is listening on port 5000</p>
<h3>Features</h3>
<ul>
<li>Authentication</li>
<li>Sign Up</li>
<li>Confirm Email Address</li>
<li>Login</li>
<li>Stateful Jwt Authentication</li>
</ul>
<h1>Basic CRUD<h1>
<ul>
<li>Create Posts</li>
<li>Get Posts</li>
<li>Update Posts</li>
<li>Delete Posts</li>
<li>Testing</li>
</ul>
create posts
<span><strong>POST  </strong><br></span>https://newblog-m4im.onrender.com/api/posts/create<br>
get all posts
<span><strong>GET</strong></span><br>https://newblog-m4im.onrender.com/api/posts<br><br><span>
delete a posts by using blogid
<strong>DELETE</strong></span>https://newblog-m4im.onrender.com/api/posts/blogId<br><br>
update a posts by using blogid<br>
<span><strong>PUT </strong></span><br><span>https://newblog-m4im.onrender.com/api/posts/blogId<br><br>
get one blog by using blog<br>
<span> <strong>GET  </strong></span><br>https://newblog-m4im.onrender.com/api/posts/blogId<br><br>
add a comment to a posts by using blog<br>
<span><strong>POST</strong></span><br>https://newblog-m4im.onrender.com/api/comment/blogs/blogID/comments<br><br>
user registration for<br>
<span> <strong>POST  </strong></span><br>https://newblog-m4im.onrender.com/api/auth/register</span><br>
user login for<br>
<span><strong>POST </strong></span><br>hhttps://newblog-m4im.onrender.com/api/auth/login<br><br>

<h2>All endpoints are tested<h2>
<h3>Major Dependencies</h3>
<ul>
<li>Mongoose - Interfacing with mongodb</li>
<li>Express js - The core of the API</li>
<li>bcrypt - Password hashing</li>
<li>jwt - generating and verifying tokens in order to verify if user has an account in order to make a post</li>

<li>jest - Testing</li>
</ul>
See package.json for full list of Dependencies
