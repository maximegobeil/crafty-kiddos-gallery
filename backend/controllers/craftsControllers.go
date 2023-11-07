package controllers

import (
	"example/backend/initializers"
	"example/backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CraftCreate(c *gin.Context) {
	// Get data off request body
	var body struct {
		KidName string
		AtAge uint
		Description string
		IsPrivate bool
		KidID uint
	}

	c.Bind(&body)
	id, _ := strconv.Atoi(c.Param("id"))
	user := c.MustGet("user").(models.User)

	if !IsMyKid(user, uint(id)) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You don't have permission to perform this action",
		})
        return
	}

	// Create a craft
	craft := models.Craft{
		KidName: body.KidName, 
		AtAge: body.AtAge, 
		Description: body.Description, 
		IsPrivate: &body.IsPrivate, 
		KidID: uint(id)}

	result := initializers.DB.Create(&craft)

	if result.Error != nil {
		c.Status(400)
		return
	}
	//return it
	c.JSON(200, gin.H{
		"craft": craft,
	})
}

func CraftReadALl(c *gin.Context) {
	// Get the kid
	var crafts []models.Craft
	id, _ := strconv.Atoi(c.Param("id"))
	user := c.MustGet("user").(models.User)
	
	if !IsMyKid(user, uint(id)) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You don't have permission to perform this action",
		})
        return
	}
	initializers.DB.Where("kid_id = ?", id).Find(&crafts)
	// Respond
	c.JSON(200, gin.H{
		"crafts": crafts,
	})
}

func CraftReadOne(c *gin.Context) {
	//Get kid ID off url
	idKid, _ := strconv.Atoi(c.Param("id"))
	idCraft := c.Param("craftID")
	user := c.MustGet("user").(models.User)
	
	if !IsMyKid(user, uint(idKid)) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You don't have permission to perform this action",
		})
        return
	}
	// Get one craft
	var craft models.Craft
	initializers.DB.Where("kid_id = ?", idKid).First(&craft, idCraft)

	if craft.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Craft not found",
		})
		return
	}
	// Respond
	c.JSON(200, gin.H{
		"craft": craft,
	})
}

func CraftUpdate(c *gin.Context) {
	// Get Id off url
	idKid, _ := strconv.Atoi(c.Param("id"))
	idCraft := c.Param("craftID")
	user := c.MustGet("user").(models.User)
	if !IsMyKid(user, uint(idKid)) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You don't have permission to perform this action",
		})
        return
	}
	// Get data off request body
	var body struct {
		KidName string
		AtAge uint
		Description string
		IsPrivate bool
	}
	c.Bind(&body)

	// Find the kid we want to update
	var craft models.Craft
	initializers.DB.Where("kid_id = ?", idKid).First(&craft, idCraft)

	if craft.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Craft not found",
		})
		return
	}
	// Update it
	initializers.DB.Model(&craft).Updates(models.Craft{
		KidName: body.KidName,
		AtAge: body.AtAge,
		Description: body.Description,
		IsPrivate: &body.IsPrivate,
	})
	// Respond with it
	c.JSON(200, gin.H{
		"craft": craft,
	})
}

func CraftDelete(c *gin.Context) {
	// Get id off url
	idKid, _ := strconv.Atoi(c.Param("id"))
	idCraft := c.Param("craftID")
	user := c.MustGet("user").(models.User)
	if !IsMyKid(user, uint(idKid)) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You don't have permission to perform this action",
		})
        return
	}
	// Delete Kid
	var craft models.Craft
	initializers.DB.First(&craft, idCraft)
	if craft.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Kid not found",
		})
		return
	}else {
		initializers.DB.Delete(&models.Craft{}, idCraft)
	}
	
	//Respond
	
	c.Status(200)
}

// Check if logged user access only is own kids
func IsMyKid(u models.User, id uint) bool{
	var user models.User
	initializers.DB.Preload("Kids").First(&user, u.ID)
	for _, kid := range user.Kids {
		if kid.ID == id {
			return true
		}
	}
	return false
	
}