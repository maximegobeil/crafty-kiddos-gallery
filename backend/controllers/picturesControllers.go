package controllers

import (
	"example/backend/initializers"
	"example/backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func PictureCreate(c *gin.Context) {
	var body struct {
		ImageUrl string
	}
	c.Bind(&body)
	idCraft, _ := strconv.Atoi(c.Param("craftID"))

	picture := models.Picture{ImageUrl: body.ImageUrl, CraftID: uint(idCraft)}

	result := initializers.DB.Create(&picture)

	if result.Error != nil {
		c.Status(400)
		return
	}
	c.JSON(200, gin.H{
		"picture": picture,
	})

}

func PictureRead(c *gin.Context) {
	// Get the kid
	var pictures []models.Picture
	idCraft, _ := strconv.Atoi(c.Param("craftID"))

	initializers.DB.Where("craft_id = ?", idCraft).Find(&pictures)
	// Respond
	c.JSON(200, gin.H{
		"pictures": pictures,
	})
}

func PictureDelete(c *gin.Context) {

	idPicture := c.Param("pictureID")
	
	// Delete Kid
	var picture models.Picture
	initializers.DB.First(&picture, idPicture)
	if picture.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Picture not found",
		})
		return
	}else {
		initializers.DB.Delete(&models.Picture{}, idPicture)
	}
	
	//Respond
	
	c.Status(200)
}
