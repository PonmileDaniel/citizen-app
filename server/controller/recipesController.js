require("../models/database");
const Category = require("../models/Category");
const Recipes = require("../models/Recipes");
const mongoose = require("mongoose")





exports.homepage = async(req, res) => {

   try {
      const limitNumber = 5;
      const categories = await Category.find({}).limit(limitNumber);
      const latest = await Recipes.find({}).sort({_id: -1}).limit(limitNumber);
      const thai = await Recipes.find({ "category": "Thai"}).limit(limitNumber);
      const american = await Recipes.find({ "category": "American"}).limit(limitNumber);
      const nigeria = await Recipes.find({ "category": "Nigeria"}).limit(limitNumber);
      const chinese = await Recipes.find({ "category": "Chinese"}).limit(limitNumber);

      const food = {latest, chinese, nigeria, american, thai };
      res.render("index", { title: "Cooking Blog - Home", categories, food } );
   } catch (error) {
      res.status(500).send({message: error.message || "Error Ocurred"});
 
   }

};









exports.exploreCategories = async(req, res) => {

   try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render("categories", { title: "Cooking Blog - Categories", categories } );
   } catch (error) {
      res.status(500).send({message: error.message || "Error Ocurred"});
    
   
   }

};







exports.exploreCategoriesById= async(req, res) => {

   try {
      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Recipes.find({"category": categoryId }).limit(limitNumber);
      res.render("categories", { title: "Cooking Blog - Categories", categoryById } );
   } catch (error) {
      res.status(500).send({message: error.message || "Error Ocurred"});
    
   }

};






exports.exploreRecipes = async(req, res) => {

   try {
      let recipesId = req.params.id;
      const recipe = await Recipes.findById(recipesId );

      res.render("recipes", { title: "Cooking Blog - Recipes", recipe } );
   } catch (error) {
      res.status(500).send({message: error.message || "Error Ocurred"});
      
   
   }

};




//SearchTerm
exports.searchRecipes = async(req, res) => {
   try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipes.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render("search", {title: "Cooking Blog - Search", recipe} );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
    
  }
  


  exports.exploreLatest = async(req, res) => {

   try {
      const limitNumber = 20;
      const recipe = await Recipes.find({}).sort({ _id: -1 }).limit(limitNumber);

      res.render("explorelatest", { title: "Cooking Blog - Recipes", recipe } );
   } catch (error) {
      res.status(500).send({message: error.message || "Error Ocurred"});
      
   
   }

};


exports.exploreRandom = async(req, res) => {

   try {
   
      let count = await Recipes.find().countDocuments();
      let random = Math.floor(Math.random() * count );
      let recipes = await Recipes.findOne().skip(random).exec();
      
     

      res.render("exploreRandom", { title: "Cooking Blog - Recipes", recipes } );
   } catch (error) {
      res.status(500).send({message: error.message || "Error Ocurred"});
      
   
   }

};


exports.submitRecipe = async(req, res) => {

      const InfoErrorsObj = req.flash("infoErrors");
      const Infosubmit = req.flash("infoSuccess");
      res.render("submit", { title: "Cooking Blog - Submit",InfoErrorsObj, Infosubmit } );
      
 
}





exports.submitRecipeOnPost = async(req, res) => {
   try{

         let imageUploadFile;
         let uploadPath;
         let newImageName;
     
         if(!req.files || Object.keys(req.files).length === 0){
           console.log('No Files where uploaded.');
         } else {
     
           imageUploadFile = req.files.image;
           newImageName = Date.now() + imageUploadFile.name;
     
           uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
     
           imageUploadFile.mv(uploadPath, function(err){
             if(err) return res.satus(500).send(err);
           })
     
         }




      const newRecipe = new Recipes({
         name: req.body.name,
         description: req.body.description,
         email: req.body.email,
         ingredient: req.body.ingredient,
         category: req.body. category,
         image: newImageName
      });

      await newRecipe.save();

      req.flash("infoSuccess","Recipe has been Submitted")
      res.redirect("/submit-recipe" );
   } catch(error){
      // res.json(error);
      req.flash("infoErrors",error)
      res.redirect("/submit-recipe" );
   }

  
   

}



exports.deleteOne = async (req, res) => {
   try{
      const deleteIt = await Recipes.findById(req.params.id);
      await deleteIt.remove();
      res.send({ data: true });
      
   } catch{
      res.redirect("/submit" );
   }
}


// Delete Recipe
// async function deleteRecipe(){
//   try {
//     await Recipe.deleteOne({ id : req.params.id});
//    console.log(error)
//   } catch (error) {
//     console.log(error);
//   }
// }



// const id = req.params.id;
  
// Recipes.findByIdAndDelete(id)
// .then(result => {
//   res.json({ redirect: '/categories'})
// })
// .catch(err => {
//   console.log(err)
// })













































// let BlogItems = mongoose.Schema({
//     name: {
//         type: String,
//         required: "This field is Required",
//        },
    
//        image: {
//         type: String,
//         required: "This field is Required",
//        },
// })

// let Blog = mongoose.model("Blog ", BlogItems, "categories")

// //Documents
// let books = [
//     {
//         "name": "Thai",
//         "image": "thai-food.jpg"
//      },
//      {
//         "name": "American",
//         "image": "american-food.jpg"
//      }, 
//       {
//         "name": "Chinese",
//         "image": "chinese-food.jpg"
//       }, 
//       {
//                 "name": "Mexican",
//                 "image": "mexican-food.jpg"
//               }, 
//               {
//                 "name": "Indian",
//                 "image": "indian-food.jpg"
//               },
//               {
//                 "name": "Spanish",
//                 "image": "spanish-food.jpg"
//               }
      
    
// ];

// Blog.collection.insertMany(books, function(err,docs){
//    if(err){
//      return console.error(err)
//    }
// else{
//     console.log("Multiple file")
// }
// })



// insertDymmyCategoryData();


// async function insertDymmyRecipeData(){
//   try {
//     await Recipes.insertMany([
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Chinese", 
//         "image": "veggie-pad-thai.jpg"
//       },
//{ 
   //         "name": "Recipe Name Goes Here",
   //         "description": `Recipe Description Goes Here`,
   //         "email": "recipeemail@raddy.co.uk",
   //         "ingredients": [
   //           "1 level teaspoon baking powder",
   //           "1 level teaspoon cayenne pepper",
   //           "1 level teaspoon hot smoked paprika",
   //         ],
   //         "category": "American", 
   //         "image": "southern-friend-chicken.jpg"
   //       },
   //{ 
      //         "name": "Recipe Name Goes Here",
      //         "description": `Recipe Description Goes Here`,
      //         "email": "recipeemail@raddy.co.uk",
      //         "ingredients": [
      //           "1 level teaspoon baking powder",
      //           "1 level teaspoon cayenne pepper",
      //           "1 level teaspoon hot smoked paprika",
      //         ],
      //         "category": "American", 
      //         "image": "southern-friend-chicken.jpg"
      //       },

//     ]);









// let RecipesItems = mongoose.Schema({
//    name: {
//        type: String,
//        required: "This field is Required."
//       },
//       description: {
//        type: String,
//        required: "This field is Required."
//       },
//       email: {
//        type: String,
//        required: "This field is Required."
//       },
//       ingredient: {
//        type: Array,
//        required: "This field is Required."
//       },
//       category: {
//        type: String,
//        enum: ['Thai', 'Chinese' , 'Ameican', 'Nigeria', 'Indian'],
//        required: "This field is Required."
//       },
//       image: {
//        type: String,
//        required: "This field is Required."
//       },
// })

// let Recipess = mongoose.model("Recipess ", RecipesItems, "recipes")

// let books = 
//    [
//        { 
//          "name": "Recipe Name Goes Here",
//          "description": `Recipe Description Goes Here`,
//          "email": "recipeemail@raddy.co.uk",
//          "ingredients": [
//            "1 level teaspoon baking powder",
//            "1 level teaspoon cayenne pepper",
//            "1 level teaspoon hot smoked paprika",
//          ],
//          "category": "American", 
//          "image": "southern-friend-chicken.jpg"
//        },
//        { 
//          "name": "Recipe Name Goes Here",
//          "description": `Recipe Description Goes Here`,
//          "email": "recipeemail@raddy.co.uk",
//          "ingredients": [
//            "1 level teaspoon baking powder",
//            "1 level teaspoon cayenne pepper",
//            "1 level teaspoon hot smoked paprika",
//          ],
//          "category": "Chinese", 
//          "image": "veggie-pad-thai.jpg"
//        },
// { 
//            "name": "Recipe Name Goes Here",
//            "description": `Recipe Description Goes Here`,
//            "email": "recipeemail@raddy.co.uk",
//            "ingredients": [
//              "1 level teaspoon baking powder",
//              "1 level teaspoon cayenne pepper",
//              "1 level teaspoon hot smoked paprika",
//            ],
//            "category": "Thai", 
//            "image": "thai-green-curry.jpg"
//          },
//    { 
//               "name": "Recipe Name Goes Here",
//               "description": `Recipe Description Goes Here`,
//               "email": "recipeemail@raddy.co.uk",
//               "ingredients": [
//                 "1 level teaspoon baking powder",
//                 "1 level teaspoon cayenne pepper",
//                 "1 level teaspoon hot smoked paprika",
//               ],
//               "category": "Indian", 
//               "image": "tom-daley.jpg"
//             },
//       { 
//                  "name": "Recipe Name Goes Here",
//                  "description": `Recipe Description Goes Here`,
//                  "email": "recipeemail@raddy.co.uk",
//                  "ingredients": [
//                    "1 level teaspoon baking powder",
//                    "1 level teaspoon cayenne pepper",
//                    "1 level teaspoon hot smoked paprika",
//                  ],
//                  "category": "Nigeria", 
//                  "image": "crab-cakes.jpg"
//                },
//      ];
     
// Recipess.collection.insertMany(books, function(err,docs){
//   if(err){
//     return console.error(err)
//   }
// else{
//    console.log("Multiple file")
// }
// })














