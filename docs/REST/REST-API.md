# Lurch RESTful API documentation

The API uses basic http authentication.
The username will be `lurch` and your private password token can be found in the app settings.
Host is your local ip and it's running on port `1994`.

## GET

#### Get current project
**URL**  
`/project/current`
**Response**
`json`

#### Get project
**URL**  
`/project/get/:id`
**Response**
`json`

#### Get all projects
**URL**  
`/projects/get`
**Response**
`json`

#### Get plugin
**URL**  
`/plugin/get/:id`
**Response**
`json`

#### Get all plugins
**URL**  
`/plugins/get`
**Response**
`json`

## POST

#### Change current project
**URL**  
`/project/change/:id`
**Response**
`json`

#### Run plugin
**URL**  
`/plugin/run/:id`
**Response**
`json`
