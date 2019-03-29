#!/bin/bash

# Setup the Environment variables for the REST Server

#1. Set up the card to be used
export COMPOSER_CARD=admin@bronco-cloud

#2. Set up the namespace usage    always |  never
export COMPOSER_NAMESPACES=never

#3. Set up the REST server Authhentcation    true | false
export COMPOSER_AUTHENTICATION=true

#4. Set up the Passport strategy provider
export COMPOSER_PROVIDERS='{
  "google": {
    "provider": "google",
    "module": "passport-google-oauth2",
    "clientID": "922273537297-ssoi2dr4vg6q6i6tclikim960dcqbmb7.apps.googleusercontent.com",
    "clientSecret": "ESrkIMKqbPHeXNeTDozAjmk3",
    "authPath": "/auth/google",
    "callbackURL": "/auth/google/callback",
    "scope": "https://www.googleapis.com/auth/plus.login",
    "successRedirect": "/",
    "failureRedirect": "/"
  }
}'

#5. Execute the REST server
composer-rest-server