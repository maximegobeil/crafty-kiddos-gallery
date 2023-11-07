package middleware

import (
	"example/backend/initializers"
	"example/backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func KidOwnershipChech(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	idKid, _ := strconv.Atoi(c.Param("id"))

	// Check all the user_id to see if it fit with the idKid
	initializers.DB.Preload("Kids").First(&user, user.ID)
	match := false
	for _, kid := range user.Kids {
		if kid.ID == uint(idKid) {
			match = true
		}
	}

	if !match {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You don't have permission to perform this action",
		})
		c.Abort()
		return
	} 
	
	c.Next()
}