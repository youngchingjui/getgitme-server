# Overview

This is the server that will service all of Get Git Me's API needs

Routes:
GET
/auth

Retrieves the access_token from Github OAuth using the `client_id` and `client_secret_id`

## Deployment

Setup server on EC2 (Osaka) instance on AWS.

We use `pm2` to ensure the node server process continues running.

Current address of this server is:

ec2-13-208-208-16.ap-northeast-3.compute.amazonaws.com

Later, we will update the DNS so that it points to https://api.getgitme.com

The server is running on port 8000.

We have not implemented this on a Docker container yet, but we probably will have to in the future.
