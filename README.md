Beer Critic
===========

This app is the perfect way to keep track of your favorite beers, so that you can always remember if you've tried one when talking to your friends.

Deployed Version
----------------

The Client can be reached at https://beer-critic-client.vercel.app/login

The api can be reached at https://limitless-coast-38251.herokuapp.com/api

![alt text](/public/beer_critic_screenshot.png "Beer Critic Screenshot")

Tech Stack
----------

Front end
* React
* Vercel

Back end
* Express
* knex
* postgresql
* heroku

Component description
---------------------

The different components live in the 'components' folder, while anything that is the main section that is rendered lives in the 'routes' folder.  For example, when on the main page after login, you're viewing the 'ItemListPage' component located in the 'routes' folder, this component renders a series of 'ItemListItem' components located in the 'component' folder.

Legend
------

> Header =  /src/components/Header
>
> Login Page = /src/routes/LoginPage
>
> Registration Page = /src/routes/RegistrationPage
>
> Main Page = /src/routes/ItemListPage
>
> Item Page = /src/routes/ItemPage
>
> New Item Page = /src/routes/NewItemPage
