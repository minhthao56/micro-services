package router

import (
	"github.com/gin-gonic/gin"
	"github.com/minhthao56/monorepo-taxi/libs/go/auth"
	"github.com/minhthao56/monorepo-taxi/services/authmgmt/controller"
)

func NewRouterUser(router *gin.RouterGroup, client auth.UserManager) {
	userController := controller.NewUserController(client)
	router.POST("/firebase-user/create", userController.CreateUser)
}