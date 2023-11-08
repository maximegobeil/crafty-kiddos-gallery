package controllers

import (
	"example/backend/initializers"
	"example/backend/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func LikeCraft(c *gin.Context) {
	idUser := c.MustGet("user").(models.User).ID
	idCraft, _ := strconv.Atoi(c.Param("craftID"))
	
	var existingLike models.Like
	initializers.DB.Where("user_id = ? AND craft_id = ?", idUser, idCraft).First(&existingLike)

	if existingLike.ID == 0 {
		// Create a new like record.
		like := models.Like{
			UserID:  idUser,
			CraftID: uint(idCraft),
		}
		initializers.DB.Create((&like))
	}else {
		// Remove like from craft
		initializers.DB.Delete(&models.Like{}, existingLike.ID)
	}
}

func LikeNumber(c *gin.Context) {
	idCraft, _ := strconv.Atoi(c.Param("craftID"))

	var count int64
	initializers.DB.Model(&models.Like{}).Where("craft_id = ?", idCraft).Count(&count)

	c.JSON(200, gin.H{
		"like count": count,
	})
}