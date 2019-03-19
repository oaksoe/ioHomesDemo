# db structure
# ------------

# collections
var user = {
    "id": "36648d5e-1502-437d-bd8c-f884604410a9",
    "name": "Oak Soe",
    "email": "oak@gmail.com",
    "phone": "123123123",
} 

var home = {
    "id": "",
	"userID": "36648d5e-1502-437d-bd8c-f884604410a9",
	"name": "Pearl Condo",
	"type": "Condo",
	"landmarks": "People's Park, Junction Mall",
	"location": "x,y",
    "address": "No. 12 (b)",
    "street": "Ma Kyi Kyi",
    "ward": "Galone",
    "township": "Alone",
    "city": "Yangon",
    "state": "Yangon",
    "country": "Myanmar"
}

# api server apis
# ---------------
 
# to get user_home
db.user.aggregate([{$lookup:{from:"home",localField:"id",foreignField:"userID",as:"user_home"}}])