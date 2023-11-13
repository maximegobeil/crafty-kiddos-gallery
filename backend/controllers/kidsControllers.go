package controllers

import (
	"example/backend/initializers"
	"example/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func KidCreate(c *gin.Context) {
	// Get data off request body
	var body struct {
		Name string
		Age uint
		UserID uint
	}

	c.Bind(&body)
	user := c.MustGet("user").(models.User)

	// Create a kid
	kid := models.Kid{Name: body.Name, Age: uint(body.Age), UserID: user.ID}
	result := initializers.DB.Create(&kid)

	if result.Error != nil {
		c.Status(400)
		return
	}
	// return it

	c.JSON(200, gin.H{
		"kid": kid,
	})
}

func KidReadAll(c *gin.Context) {
	// Get the kid
	var kids []models.Kid
	userID := c.MustGet("user").(models.User).ID
	initializers.DB.Where("user_id = ?", userID).Find(&kids)
	// Respond
	c.JSON(200, gin.H{
		"kids": kids,
	})
}

func KidReadOne(c *gin.Context) {
	//Get kid ID off url
	id := c.Param("id")
	// Get one kid
	var kid models.Kid
	userID := c.MustGet("user").(models.User).ID
	initializers.DB.Where("user_id = ?", userID).First(&kid, id)
	if kid.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Kid not found",
		})
		return
	}
	// Respond
	c.JSON(200, gin.H{
		"kid": kid,
	})
}

func KidUpdate(c *gin.Context) {
	// Get Id off url
	id := c.Param("id")
	// Get data off request body
	var body struct {
		Name string
		Age uint
	}
	c.Bind(&body)
	userID := c.MustGet("user").(models.User).ID

	// Find the kid we want to update
	var kid models.Kid
	initializers.DB.Where("user_id = ?", userID).First(&kid, id)

	if kid.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Kid not found",
		})
		return
	}
	// Update it
	initializers.DB.Model(&kid).Updates(models.Kid{
		Name: body.Name,
		Age: body.Age,
	})
	// Respond with it
	c.JSON(200, gin.H{
		"kid": kid,
	})
}

func KidDelete(c *gin.Context) {
	// Get id off url
	id := c.Param("id")
	userID := c.MustGet("user").(models.User).ID
	// Delete Kid
	var kid models.Kid
	initializers.DB.Where("user_id = ?", userID).First(&kid, id)
	if kid.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Kid not found",
		})
		return
	}else {
		initializers.DB.Where("user_id = ?", userID).Delete(&models.Kid{}, id)
	}
	
	//Respond
	c.Status(200)
}