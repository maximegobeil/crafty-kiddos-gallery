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
		AllowOrigins: []string{"https://ckg.maxgobeil.dev"},
		AllowMethods: []string{"PUT", "PATCH", "POST", "DELETE", "GET", "OPTIONS"},
		AllowHeaders: []string{"Content-Type, Authorization"},
		AllowCredentials: true,
	}))
	// Handling User
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.GET("/test", controllers.SetCookieTest)

	// Handling Kids
	r.POST("/kids", middleware.RequireAuth, controllers.KidCreate)
	r.GET("/kids", middleware.RequireAuth, controllers.KidReadAll)
	r.GET("/kids/:id", middleware.RequireAuth, middleware.KidOwnershipChech, controllers.KidReadOne)
	r.PUT("/kids/:id", middleware.RequireAuth, middleware.KidOwnershipChech, controllers.KidUpdate)
	r.DELETE("/kids/:id", middleware.RequireAuth, middleware.KidOwnershipChech, controllers.KidDelete)

	// Handling Crafts
	r.POST("/kids/:id/crafts", middleware.RequireAuth, middleware.KidOwnershipChech, controllers.CraftCreate)
	r.GET("/kids/:id/crafts", middleware.RequireAuth, middleware.KidOwnershipChech, controllers.CraftReadALl)
	r.GET("/randomcrafts",controllers.CraftReadRandom)
	r.GET("/kids/:id/crafts/:craftID", middleware.RequireAuth, middleware.KidOwnershipChech, middleware.CraftOwnershipCheck, controllers.CraftReadOne)
	r.PUT("/kids/:id/crafts/:craftID", middleware.RequireAuth, middleware.KidOwnershipChech, middleware.CraftOwnershipCheck, controllers.CraftUpdate)
	r.DELETE("/kids/:id/crafts/:craftID", middleware.RequireAuth, middleware.KidOwnershipChech, middleware.CraftOwnershipCheck, controllers.CraftDelete)

	// Handling Pictures
	r.POST("/kids/:id/crafts/:craftID/pictures", middleware.RequireAuth, middleware.KidOwnershipChech, middleware.CraftOwnershipCheck, controllers.PictureCreate)
	r.GET("/kids/:id/crafts/:craftID/pictures", middleware.RequireAuth, middleware.KidOwnershipChech, middleware.CraftOwnershipCheck, controllers.PictureRead)
	r.DELETE("/kids/:id/crafts/:craftID/pictures/:pictureID", middleware.RequireAuth, middleware.KidOwnershipChech, middleware.CraftOwnershipCheck, middleware.PicutreOwnershipCheck,controllers.PictureDelete)

	// Handling Likes
	r.POST("/:craftID/like", middleware.RequireAuth, controllers.LikeCraft)
	r.GET("/:craftID/like", middleware.RequireAuth, controllers.LikeNumber)
	
	r.Run()
}