package controllers

import (
	"example/backend/initializers"
	"example/backend/models"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	// Get info off request body
	var body struct {
		Name string
		Email string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	
	// Hash received password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}
	
	// Create new user
	user := models.User{Name: body.Name, Email: body.Email, Password: string(hash)}

	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		return
	}
	
	// respond
	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "http://localhost:5000")  // Replace with the actual origin of your frontend
	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
	
	
	// Get email & send request body
	var body struct {
		Email string
		Password string
	}
	
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	// Look up resquested user
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Login failed invalid email",
		})
		return
	}

	// Compare password with hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid password",
		})
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(), // good for 24 hours
	})
	// Sign and get the complete encoded token as a string using the secret
	tokenString, tokenErr := token.SignedString([]byte(os.Getenv("SECRET")))

	if tokenErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}
	// Store to cookie
	//c.SetSameSite(http.SameSiteNoneMode)//http.SameSiteLaxMode
	//c.SetCookie("Authorization", tokenString, 3600 * 24, "/", "localhost", true, true)

	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}

func Logout(c *gin.Context) {
	c.SetCookie("Authorization", "", -3600, "", "", true, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "loged out",
	})
}

func Validate(c *gin.Context) {
	user, exist := c.Get("user")

	if !exist || user == nil{
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "User not found in context",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "user found",
	})
}

func SetCookieTest(c *gin.Context) {
    cookie := fmt.Sprintf("Authorization=%s; Path=/; Max-Age=%d; HttpOnly; Secure; SameSite=None", "tokenString", 3600*24)
	c.Header("Cookie", cookie)
    c.JSON(http.StatusOK, gin.H{"message": "Cookie set successfully"})
}