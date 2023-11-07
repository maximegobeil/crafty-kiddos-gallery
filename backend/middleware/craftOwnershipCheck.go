package middleware

import (
	"example/backend/initializers"
	"example/backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CraftOwnershipCheck(c *gin.Context) {
	idKid, _ := strconv.Atoi(c.Param("id"))
	idCraft, _ := strconv.Atoi(c.Param("craftID"))

	var kid models.Kid
	// Query to check if the craft is owned by the kid
	initializers.DB.Preload("Crafts").First(&kid, idKid)
	match := false
	for _, craft := range kid.Crafts {
		if craft.ID == uint(idCraft) {
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