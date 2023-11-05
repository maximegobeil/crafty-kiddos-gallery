package controllers

import "github.com/gin-gonic/gin"

func Signup(c *gin.Context) {
	// Get info off request body

	var body struct {
		Name string
		Email string
		Password string
	}
	// Hash password

	// Create the user

	// respond
}

func UsersCreate(c *gin.Context) {
	


	c.JSON(200, gin.H{
		"message": "Create a user",
	})
}