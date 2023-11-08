package controllers

import (
	"context"
	"example/backend/initializers"
	"example/backend/models"
	"log"
	"net/http"
	"strconv"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func PictureCreate(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Failed to receive the image file.",
		})
		return
	}
	// Setup S3 Uploader
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Printf("error: %v", err)
		return
	}
	client := s3.NewFromConfig(cfg)
	uploader := manager.NewUploader(client)
	// Save the file
	f, openErr := file.Open()

	if openErr != nil {
		c.JSON(400, gin.H{
			"error": "Failed to open the image file.",
		})
		return
	}
	result, uploadErr := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String("crafty-kiddos-gallery"),
		Key:    aws.String(file.Filename),
		Body:   f,
		ACL: "public-read",
	})
	if uploadErr != nil {
		c.JSON(400, gin.H{
			"error": "Failed to upload the image file.",
		})
		return
	}

	// Create new picture
	var body struct {
		ImageUrl string
	}
	c.Bind(&body)
	idCraft, _ := strconv.Atoi(c.Param("craftID"))
	picture := models.Picture{ImageUrl: result.Location, CraftID: uint(idCraft)}
	res := initializers.DB.Create(&picture)

	if res.Error != nil {
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
