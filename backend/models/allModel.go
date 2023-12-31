package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name string `gorm:"not null"`
	Email string `gorm:"unique"`
	Password string `gorm:"not null"`
	Kids []Kid `gorm:"foreignKey:UserID"`
	Likes []Like
  }

  type Kid struct {
	gorm.Model
	Name string `gorm:"not null"`
	Age uint `gorm:"not null"`
	UserID uint
	Crafts []Craft
  }

  type Craft struct {
	gorm.Model
	KidName string `gorm:"not null"`
	AtAge uint `gorm:"not null"`
	Description string
	IsPrivate *bool `gorm:"default:false"`
	KidID uint
	Pictures []Picture
	Likes []Like
  }

  type Picture struct { 
	ID uint 
	ImageUrl string
	CraftID uint
  }

  type Like struct {
	ID uint
	UserID uint
	CraftID uint
  }