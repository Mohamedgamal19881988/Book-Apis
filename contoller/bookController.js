const jwt = require('jsonwebtoken')
const bookModel = require ('../schemas/bookSchemas')



exports. allBooks = async function (req,res) {
    try {
        const Books = await bookModel.find()
        return res.json({ message: "Done", data: Books })

        
    } catch (error) {
        return res.status (400).send ({message:error})
        
    }
    
}

exports.Book = async function (req,res) {
    try {
        const Book = await bookModel.find({ _id: req.params.id })
        if (Book.length === 0) {
            return res.json({ "message": "Book not found", data: Book })

        } else {
            return res.json({ "message": "Done", data: Book })

        }


        
    } catch (error) {
        return res.status (400).send ({message:error})
        
    }
    
}

exports.createBook = async function (req,res) {
    try {
         const Role = req.user.role
         if ( Role === "admin"  || "Admin"){
            const CreatedBook = await bookModel.create(req.body)
            return res.json({ "message": "Book created Successfully", data: CreatedBook })
         
           

          }else{
            return res.status (403).send("Access Denied, Only Admin can add new book")


          }
              
           
       

               
    } catch (error) {
        return res.status (400).send ({message:error})
        
    }
    
}

exports.updateBook = async function (req,res) {
    const Role = req.user.role
    if  (Role === "Admin"  || "admin"){

       await bookModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        return res.json({ "message": "Book Updated Successfully", data: [] })
    }
    else {
        return res.status (403).send("Access Denied, Only Admin can edit book info")

    }
    
}

exports.deleteBook = async function (req,res) {
try {
    const Role = req.user.role  
  
    if(Role === "Admin"  || "admin"){
        bookModel.findByIdAndDelete({_id: req.params.id})
        return res.json ({"message":"Book deleted successfuly"})
    }else{
        return res.json ({"message":"Access denied, Only Admin can delete book"})

    }
    
} catch (error) {
    
}



}