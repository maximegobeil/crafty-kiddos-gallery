package middleware

import (
	"example/backend/initializers"
	"example/backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func PicutreOwnershipCheck(c *gin.Context) {
	idCraft, _ := strconv.Atoi(c.Param("craftID"))
	idPicture, _ := strconv.Atoi(c.Param("pictureID"))

	var craft models.Craft
	initializers.DB.Preload("Pictures").First(&craft, idCraft)
	match := false
	for _, picture := range craft.Pictures {
		if picture.ID == uint(idPicture) {
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