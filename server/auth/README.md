# test auth server
# ----------------

# register user
api: http://localhost:8001/v1/ioh/auth/register
method: post
body: {
     "email": "oak@gmail.com",
     "password": "123"
}
response: {
    "status": "SUCCESS",
    "data": {
        "id": "5f72562c-76a5-4dad-8832-97d95c201451"
    }
}

# login user
api: http://localhost:8001/v1/ioh/auth/login
method: post
body: {
     "email": "oak@gmail.com",
     "password": "123"
}
response: {
    "status": "SUCCESS",
    "data": {
        "_id": "5c56ba5262c4c25ef42f246a",
        "email": "oak@gmail.com",
        "password": null,
        "id": "5f72562c-76a5-4dad-8832-97d95c201451",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoib2FrQGdtYWlsLmNvbSIsImlhdCI6MTU0OTE4NzcwOSwiZXhwIjoxNTQ5Mjc0MTA5fQ.GtV1J5AVLCxl8x99g6aPH5-odvpUAYGmhiq0s-q-yCc"
    }
}