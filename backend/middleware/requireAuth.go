package middleware

import (
	"example/backend/initializers"
	"example/backend/models"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {
	// Set CORS headers

	// Get the cookie off request
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}


	fmt.Println("Token String:", tokenString)
	// Validate it
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})
	if err != nil || !token.Valid{
		fmt.Println("Error parsing token:", err)
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Check the exp
		/*
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		*/
		if exp, ok := claims["exp"].(float64); ok && float64(time.Now().Unix()) > exp {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// Find the user with token sub
		var user models.User
		initializers.DB.First(&user, claims["sub"])

		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// Attach to req
		c.Set("user", user)
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}