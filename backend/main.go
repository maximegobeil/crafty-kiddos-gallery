package main

import (
	"example/backend/controllers"
	"example/backend/initializers"
	"example/backend/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main(){
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"PUT", "PATCH", "POST", "DELETE", "GET"},
		AllowHeaders: []string{"Content-Type"},
		AllowCredentials: true,
	}))

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.POST("/kids", middleware.RequireAuth, controllers.KidCreate)
	r.GET("/kids", middleware.RequireAuth, controllers.KidReadAll)
	r.GET("/kids/:id", middleware.RequireAuth, controllers.KidReadOne)
	r.PUT("/kids/:id", middleware.RequireAuth, controllers.KidUpdate)
	r.DELETE("/kids/:id", middleware.RequireAuth, controllers.KidDelete)

	r.Run()
}