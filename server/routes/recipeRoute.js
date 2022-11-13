const express = require("express");
const router = express.Router();
const recipesController = require("../controller/recipesController");


router.get("/", recipesController.homepage);

router.get("/recipes/:id", recipesController.exploreRecipes);
router.get("/categories", recipesController.exploreCategories);
router.get("/categories/:id", recipesController.exploreCategoriesById);
router.post("/search", recipesController.searchRecipes);
router.get("/explore-latest", recipesController.exploreLatest);
router.get("/explore-Random", recipesController.exploreRandom);
router.get("/submit-Recipe", recipesController.submitRecipe);
router.post("/submit-Recipe", recipesController.submitRecipeOnPost);
router.delete("/recipes/:id", recipesController.deleteOne);
router.delete("/categories", recipesController.deleteOne);

module.exports= router;
