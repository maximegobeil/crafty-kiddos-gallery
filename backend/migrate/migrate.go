package main

import (
	"example/backend/initializers"
	"example/backend/models"
)

func init(){
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main(){
	initializers.DB.AutoMigrate(&models.User{})
	initializers.DB.AutoMigrate(&models.Kid{})
	initializers.DB.AutoMigrate(&models.Craft{})
	initializers.DB.AutoMigrate(&models.Picture{})
	initializers.DB.AutoMigrate(&models.Like{})
}