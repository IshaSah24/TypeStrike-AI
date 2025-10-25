




# authentications - flags
Path=/ ==> cookie is available for the whole site (not just one route).

HttpOnly → browser JS (like document.cookie) cannot access it → protects against XSS attacks.

Expires=Tue, 09 Sep 2025 20:15:27 GMT → cookie will expire at that exact date/time.

Secure (missing here) → usually set if you only want cookies sent over HTTPS.


better/important   --->  CSRF (Cross-Site Request Forgery) =  true 
--------------------------------------------------------
