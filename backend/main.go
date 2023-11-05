package main

import (
	"example/backend/controllers"
	"example/backend/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main(){
	r := gin.Default()
	r.GET("/", controllers.UsersCreate)
	r.Run()
}