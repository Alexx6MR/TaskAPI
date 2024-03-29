# :neutral_face: RESTful API

An example RESTful API built on top of nodejs.

## Features

- RESTful routing
- Models with proper relationships
- Controllers/Models etc with proper separation of concerns
- JWT Authentication
- RESTful errors

## Routes List:

### Task

| Method     | URI                               | Action                                                  |
|------------|-----------------------------------|---------------------------------------------------------|
| `GET`      | `task`                            | `Controllers\task.controller@getAuhtorTask`             |
| `GET`      | `task/{id}`                       | `Controllers\task.controller@getOneTask`                |
| `POST`     | `task/create`                     | `Controllers\task.controller@createTask`                |
| `DELETE`   | `task/{id}`                       | `Controllers\task.controller@deletetask`                |
| `PATCH`    | `task/{id}`                       | `Controllers\task.controller@updatetask`                |


### Users

| Method     | URI                               | Action                                                  |
|------------|-----------------------------------|---------------------------------------------------------|
| `GET`      | `users`                           | `Controllers\user.controller@getAll`                    |
| `GET`      | `users/{id}`                      | `Controllers\user.controller@getAll`                    |
| `PATCH`    | `users/update/{id}`               | `Controllers\user.controller@updateUser`                |
| `DELETE`   | `users/delete/{id}`               | `Controllers\user.controller@deleteUser`                |

### Auth

| Method     | URI                               | Action                                                  |
|------------|-----------------------------------|---------------------------------------------------------|
| `POST`     | `auth/register`                   | `Controllers\auth.controller@register`                  |
| `POST`     | `auth/login`                      | `Controllers\auth.controller@login`                     |
