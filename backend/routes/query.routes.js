const express = require("express")
const queryRouter = express.Router()
const { openai } = require("../configs/openai")


queryRouter.post("/", async (req,res) => {
    const { query, code } = req.body

    // Role Details Example Output
    const prompt = `Act as code checker bot, which provides functionality like code coverter, debugger & quality checker. \n
    Provide ${query} functionality to the given code: \n
    ${code}`

    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
          });
        return res.status(200).send({"msg" : "Success!", "response": chatCompletion.data.choices[0].message.content})
      } catch (error) {
        if (error.response) {
          return res.status(400).send(error.response.data)
        } else {
          return res.status(400).send(error.message)
        }
      }

})


module.exports = { queryRouter }