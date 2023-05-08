package routes

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

/*
The c *gin.Context is used to get id from params and also skips the need for (http.ResponseWriter, r *http.Request)
*/

var entryCollection *mongo.Collection = openCollection(Client, "calories")

func AddEntry(c *gin.Context) {

}

func GetEntries(c *gin.Context) {

}

func GetEntryById(c *gin.Context) {

}

func GetEntriesByIngredients(c *gin.Context) {

}

func UpdateEntry(c *gin.Context) {

}

func UpdateIngredient(c *gin.Context) {

}

func DeleteEntry(c *gin.Context) {
	entryId := c.Params.ByName("id")
	docId, _ := primitive.ObjectIDFromHex(entryId)
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	result, err := entryCollection.DeleteOne(ctx, bson.M{"_id": docId})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}
	defer cancel()
	c.JSON(http.StatusOK, result.DeletedCount)

}
